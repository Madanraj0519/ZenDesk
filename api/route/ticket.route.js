const express = require('express');
const { createTicket, getTickets, deleteTicket, assignEmployee, unAssignEmployee } = require('../controller/ticket.controller');
const { verifyToken } = require('../utils/verifyToken');
const ticketRoute = express.Router();

ticketRoute.get('/', verifyToken,getTickets);
ticketRoute.post('/create/:adminId', createTicket);
ticketRoute.post('/assign/:ticketId/employee/:employeeId', assignEmployee);
ticketRoute.post('/unassign/:ticketId', unAssignEmployee);
ticketRoute.delete('/delete/:id', deleteTicket);


module.exports = { ticketRoute }