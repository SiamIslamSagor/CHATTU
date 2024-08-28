import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

// Create a new user and save it to the database and save in cookie
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  console.log("Hello:", req.body);

  const avatar = {
    public_id: "j2h3j2djhf",
    url: "wor232knmnsmnsm",
  };

  const user = await User.create({
    name,
    username,
    password,
    avatar,
    bio,
  });

  sendToken(res, user, 201, "User Created!");
};

// Login user and save token in cookie
const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password"); // .select('+password') means select and give the password filed also, we need to select the password field manually because in User model we write password: { select: false };

  if (!user) return next(new ErrorHandler("Invalid Username or Password", 404));

  const isPasswordMatched = await compare(password, user.password);

  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalid Username or Password", 404));

  sendToken(res, user, 200, `Welcome Back, ${user.name}!`);
});

const getMyProfile = TryCatch(async (req, res) => {
  console.log("object");
  const user = await User.findById(req.user);

  res.status(200).json({
    success: true,
    user,
  });
});

const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("chattu-token", "", { ...cookieOptions, maxAge: 0 })
    .json({ success: true, message: "Logged out successfully" });
});

const searchUser = TryCatch(async (req, res) => {
  const { name } = req.query;

  return res.status(200).json({ success: true, message: name });
});

export { newUser, login, getMyProfile, logout, searchUser };
