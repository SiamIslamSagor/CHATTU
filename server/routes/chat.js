import express from "express";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMyChat,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const app = express.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new", newGroupChat);

app.get("/my", getMyChat);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMembers);

app.put("/removemember", removeMember);

app.delete("/leave/:chatId", leaveGroup);

// send attachments
app.post("/message", attachmentsMulter, sendAttachments);

// get messages

// get chat details, rename, delete
app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat); // EXP: this is the way to handle multiple types request in a same endpoint path. we can separate this route into 3 routes, which is get, put, and delete. but .route() method is the smart way to do that.

export default app;
