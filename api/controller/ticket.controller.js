const ticketModel = require("../model/ticket.model");
const employeeModel = require("../model/employee.model");



const getTickets = async(req, res, next) => {
    try{
        const tickets = await ticketModel.find();
        res.status(200).json({
            success: true,
            message : "Tickets fetched successfully.",
            tickets,
        });
    }catch(err){
        next(err);
    };
};

const createTicket = async(req, res, next) => {
    const { customerName, customerEmail, customerPhone, 
        ticketTitle,ticketDescription  } = req.body;

        try{
            const ticket = new ticketModel({
                customerName, customerEmail, customerPhone, ticketTitle, ticketDescription
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


const deleteTicket = async (req, res) => {
    try {
      await ticketModel.findByIdAndDelete(req.params.id);
      res.status(200).
      json({
          success : true,
          message : "Your tickets has been deleted successfully",
      })
    } catch (err) {
      next(err);
    }
};

module.exports = {
    getTickets,
    createTicket,
    deleteTicket,
}