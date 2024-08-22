import express from "express";
import userRoute from "./routes/user.js";
const app = express();
const port = 3000;

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World: HOME");
});

app.listen(port, () => {
  console.log(`Chattu Server is running on ${port}`);
});
