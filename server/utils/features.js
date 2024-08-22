//

import mongoose from "mongoose";

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

export { connectDB };
