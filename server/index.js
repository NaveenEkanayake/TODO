require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

//cookie parser
const cookieParser = require("cookie-parser");

//routes
const todorouter = require("../server/Routes/todolist.routes");
const userroutes = require("../server/Routes/Auth.routes.js");

// env files
const Mongo = process.env.Mongo_URL;
const PORT = process.env.PORT;
const client_port = process.env.CLIENT_PORT;
//middleware
app.use(
  cors({
    origin: client_port,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
//routes middleware - in order to use the routes
app.use("/api", todorouter);
app.use("/api", userroutes);

mongoose
  .connect(Mongo)
  .then(() => {
    console.log("Server is connected to the Database Successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
