import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["chattu-token"];

  console.log("HI");

  if (!token) {
    console.log("HI2");
    return next(new ErrorHandler("Please login to access this route", 401));
  }
  console.log("HI3");
  console.log("HI3: ", token);

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  console.log("HI4");

  req.userId = decodedToken._id;
  console.log("HI5");

  next();
};

export { isAuthenticated };
