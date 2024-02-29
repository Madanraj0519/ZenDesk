const express = require('express');
const { createTicket, getTickets, deleteTicket } = require('../controller/ticket.controller');
const ticketRoute = express.Router();

ticketRoute.get('/', getTickets);
ticketRoute.post('/create', createTicket);
ticketRoute.delete('/delete/:id', deleteTicket);


module.exports = { ticketRoute }