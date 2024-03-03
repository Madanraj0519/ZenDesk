const ticketModel = require("../model/ticket.model");
const userModel = require("../model/user.model");
const employeeModel = require("../model/employee.model");
const errorHandler = require("../utils/errorHandler");



const getTickets = async(req, res, next) => {

    const loggedAdminId = req.user._id;

    try{
        const tickets = await ticketModel.find({'belongToAdmin._id' : loggedAdminId })
         .populate({path : "assignedTo", model : "Employee"});
        res.status(200).json({
            success: true,
            message : "Tickets data has been fetched successfully.",
            tickets,
        });
    }catch(err){
        next(err);
    };
};

const getTicketsAssignedWithEmployee = async(req, res, next) => {
    const loggedEmployee = req.user._id;

    try{
        const tickets = await ticketModel.find({ assignedTo : loggedEmployee })
        .populate({path : "assignedTo", model : "Employee"});

        res.status(200).json({
            success: true,
            message : "Tickets assigned with employees has been fetched successfully.",
            tickets,
        });

    }catch(err){
        next(err);
    }
};

const createTicket = async(req, res, next) => {
        const { customerName, customerEmail, customerPhone, 
              ticketTitle,ticketDescription  } = req.body;
        const { adminId } = req.params;

        try{
            const admin = await userModel.findById(adminId);

            if (!admin) {
                return next(errorHandler(404, "Admin not found"));
            }

            const belongToAdmin = {
                _id : admin._id,
                userName : admin.userName,
                userEmail : admin.userEmail,
            };

            const ticket = new ticketModel({
                customerName, customerEmail, customerPhone, 
                ticketTitle, ticketDescription, belongToAdmin,
            });

            await ticket.save();

            res.status(200).json({
                success: true,
                message : "Ticket created successfully",
                ticket,
            })

        }catch(err){
            next(err);
        }
};


const updateTicket = async(req, res, next) => {
  const { ticketStatus } = req.body;
  const { id } = req.params;
  try{
    const updateTicket = await ticketModel.findByIdAndUpdate(
        id,
        { ticketStatus : ticketStatus },
        { new : true }
    );
    if(!updateTicket){
        next(errorHandler(404, "Ticket not found"));
    };
    res.status(200).json({
        success : true,
        message : "Ticket updated successfully",
        updateTicket,
    });
  } catch(err){
    next(err);
  } 
};


const assignEmployee = async(req, res, next) => {
    const { ticketId, employeeId } = req.params;

    if(!ticketId){
        return  next(errorHandler(400, "ticket not found"));
     }

    if(!employeeId){
       return  next(errorHandler(400, "Assignee not found"));
    }

    const updatedTicket = await ticketModel.findByIdAndUpdate(
        ticketId,
        {
            assignedTo : employeeId,
            isAssigned : true,
        },
        { new : true}
    );

    if(!updatedTicket){
        return next(errorHandler(400, "Ticket already found"));
    }

    // Update the employee's document with the assigned ticket
    const updatedEmployee = await employeeModel.findByIdAndUpdate(
        employeeId,
        {
            $push : {
                ticketLists : updatedTicket._id,
            }
        },
        { new : true}
    );

    if (!updatedEmployee) {
        return next(errorHandler(404, "Employee not found"));
      }

    res.status(200).json({
        success : true,
        message : "Employee assigned successfully",
        updatedTicket,
    });
};


const unAssignEmployee = async(req, res, next) => {
    const {ticketId} = req.params;

    try{
        const ticket = await ticketModel.findById(ticketId);
        if (!ticket) {
            return next(errorHandler(404, "Ticket not found"));
        }

        //update the tickets assigned to null
        ticket.assignedTo = null;
        ticket.isAssigned = false;

        await ticket.save();

        // remove the tickets from the employees assignedTickets array
        const employee = await employeeModel.findByIdAndUpdate(
            ticket.assignedTo,
            {
                $pull : {
                    ticketLists : ticket._id,
                }
            },
            { new : true}
        );

        res.status(200).json({ success :true, message: 'Employee unassigned from ticket', ticket});
    }catch(err){
        next(err);
    }
};

const deleteTicket = async (req, res) => {
    try {
      await ticketModel.findByIdAndDelete(req.params.id);
      res.status(200).
      json({
          success : true,
          message : "Ticket has been deleted successfully",
      })
    } catch (err) {
      next(err);
    }
};

module.exports = {
    getTickets,
    createTicket,
    updateTicket,
    assignEmployee,
    unAssignEmployee,
    deleteTicket,
    getTicketsAssignedWithEmployee,
}