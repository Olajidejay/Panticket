import Ticket from "../models/ticket.model";
import User from "../models/user.model";

export async function createTicket(req, res) {
  try {
    let { vendor, issuer, status, issuedDate, event, ticketType, user } =
      req.body;
    let newUser = await User.create(user);
    const newTicket = await Ticket.create({
      vendor,
      issuer,
      status,
      issuedDate,
      event,
      ticketType,
      user: newUser._id,
    });
    return res.status(201).json({
      message: "ticket  created successfully",
      ticket: newTicket,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Issues processing your request",
    });
  }
}

export async function getTicketById(req, res) {
  try {
    const ticket = await Ticket.findById(req.params.id).populate([
      "event",
      "ticketType",
      "user",
    ]);
    return res.status(200).json({
      message: "ticket fetched successfully",
      ticket,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Issues processing your request",
    });
  }
}

export async function updateTicketById(req, res) {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    return res.status(200).json({
      message: "ticket updated successfully",
      ticket,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Issues processing your request",
    });
  }
}
