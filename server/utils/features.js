//

import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectDB = uri => {
  mongoose
    .connect(uri, {
      dbName: "Chattu",
    })
    .then(data => {
      console.log(`DB connected successfully ${data.connection.host}`);
    })
    .catch(err => {
      console.log("Failed to connect DB");
      console.log("Something is wrong, when connecting with DB:", err);
      throw err;
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("chattu-token", token, cookieOptions).json({
    success: true,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
  console.log("Emitting event", event);
};

export { connectDB, sendToken, cookieOptions, emitEvent };
