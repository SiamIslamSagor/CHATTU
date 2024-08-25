import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";

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

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password"); // .select('+password') means select and give the password filed also, we need to select the password field manually because in User model we write password: { select: false };

  if (!user) return next(new Error("Invalid Username"));

  const isPasswordMatched = await compare(password, user.password);

  if (!isPasswordMatched) return next(new Error("Invalid Password"));

  sendToken(res, user, 200, `Welcome Back, ${user.name}!`);
});

const getMyProfile = async (req, res) => {
  // return await User.findById("")
};

export { newUser, login, getMyProfile };
