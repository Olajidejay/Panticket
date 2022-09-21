import express from "express";
import { homeController } from "./controllers/home.controller";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import { v4 as uuid } from "uuid";
import {
  createEvent,
  fetchEvents,
  deleteEvent,
  updateEvent,
  fetchEventById,
} from "./controllers/event.controller";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  fetchCategoryById,
  updateCategory,
} from "./controllers/category.controller";
import { validateEventData } from "./controllers/middleware/event.validator";
import {
  validateOrganizerData,
  validateOrganizerUpdateData,
} from "./controllers/middleware/organizer.validator";
import {
  createOrganizer,
  deleteOrganizer,
  fetchOrganizerById,
  fetchOrganizers,
  updateOrganizer,
} from "./controllers/organizer.controller";
import {
  validateCategoryData,
  validateCategoryUpdateData,
} from "./controllers/middleware/category.validator";
import {
  validateTicketTypeData,
  validateTicketTypeUpdateData,
} from "./controllers/middleware/tickettype.validator";
import {
  createTicketType,
  deleteTicketType,
  fetchTicketType,
  fetchTicketTypeById,
  updateTicketType,
} from "./controllers/tickettype.controller";
import { validateTicketData } from "./controllers/middleware/ticket.validator";
import {
  createTicket,
  getTicketById,
  updateTicketById,
} from "./controllers/ticket.controller";
dotenv.config();

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    return callback(null, uuid() + "-" + file.originalname);
  },
});

const connectToDB = () => mongoose.connect(process.env.DEV_DB);

connectToDB()
  .then(() => console.log("connected"))
  .catch((err) => console.log(err.message));

const server = express();
//Add code to make our server be able to read json form and url encoded form
server.use(express.json());
server.use(
  express.urlencoded({
    extended: true,
  })
);

server.options("*", cors());
server.use(cors());

const upload = multer({ storage: storage });

let port = 4002;

if (process.env.NODE_ENV !== "development") {
  port = process.env.PORT;
}

server.get("/", homeController);

// events routes
server.get("/event", fetchEvents);
server.post("/event", upload.single("image"), validateEventData, createEvent);
server.get("/event/:id", fetchEventById);
server.put("/event/:id", updateEvent);
server.delete("/event/:id", deleteEvent);

//category routes
server.get("/category", fetchCategories);
server.post("/category", validateCategoryData, createCategory);
server.get("/category/:id", fetchCategoryById);
server.put("/category/:id", validateCategoryUpdateData, updateCategory);
server.delete("/category/:id", deleteCategory);

//tickettypes routes
server.get("/tickettype", fetchTicketType);
server.post("/tickettype", validateTicketTypeData, createTicketType);
server.get("/tickettype/:id", fetchTicketTypeById);
server.put("/tickettype/:id", validateTicketTypeUpdateData, updateTicketType);
server.delete("/tickettype/:id", deleteTicketType);

//organizer routes
server.get("/organizer", fetchOrganizers);
server.post("/organizer", validateOrganizerData, createOrganizer);
server.get("/organizer/:id", fetchOrganizerById);
server.put("/organizer/:id", validateOrganizerUpdateData, updateOrganizer);
server.delete("/organizer/:id", deleteOrganizer);

//ticket routes
server.post("/ticket", validateTicketData, createTicket);
server.get("/ticket/:id", getTicketById);
server.patch("/ticket/:id", updateTicketById);

server.listen(port, () => {
  console.log("server started and running on port " + port);
});
