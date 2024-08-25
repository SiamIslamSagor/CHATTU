import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";

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

const login = (req, res) => {
  res.send("Hello Form Login");
};

export { newUser, login };
