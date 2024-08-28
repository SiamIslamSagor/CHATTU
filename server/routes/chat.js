import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  getMyChat,
  getMyGroups,
  newGroupChat,
  removeMember,
} from "../controllers/chat.js";

const app = express.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new", newGroupChat);

app.get("/my", getMyChat);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMembers);

app.put("/removemember", removeMember);

// app.delete('/leave/:id', )

// send attachments

// get messages

// get chat details, rename, delete

export default app;
