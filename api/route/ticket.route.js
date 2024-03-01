const express = require('express');
const { createTicket, getTickets, deleteTicket, assignEmployee, 
       unAssignEmployee, getTicketsAssignedWithEmployee, updateTicket } = require('../controller/ticket.controller');
const { verifyToken } = require('../utils/verifyToken');
const ticketRoute = express.Router();

ticketRoute.get('/', verifyToken , getTickets);
ticketRoute.get('/getTickets/employee', verifyToken, getTicketsAssignedWithEmployee);
ticketRoute.post('/create/:adminId', createTicket);
ticketRoute.post('/update/:id', updateTicket);
ticketRoute.post('/assign/:ticketId/employee/:employeeId', assignEmployee);
ticketRoute.post('/unassign/:ticketId', unAssignEmployee);
ticketRoute.delete('/delete/:id', deleteTicket);


module.exports = { ticketRoute }