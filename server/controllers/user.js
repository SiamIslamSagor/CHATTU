import { User } from "../models/user.js";

// Create a new user and save it to the database and save in cookie
const newUser = async (req, res) => {
  const avatar = {
    public_id: "j2h3j2djhf",
    url: "wor232knmnsmnsm",
  };

  await User.create({
    name: "Chaman",
    username: "chaman",
    password: "chaman",
    avatar,
  });

  res.status(201).json({ message: "User created successfully" });
};

const login = (req, res) => {
  res.send("Hello Form Login");
};

export { newUser, login };
