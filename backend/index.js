//imports

const express = require("express");
const app = express();
const colors = require("colors");
require("dotenv").config();
const cors = require("cors");

//functions

const NotFound = require("./middleware/handler/404");
const errorHandler = require("./middleware/handler/errorHandler");
const logHandler = require("./middleware/logs/log");
const connectDB = require("./config/db");
const sampleRoutes = require("./routes/sample");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const hotelRoutes = require("./routes/hotel");
const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.json());
app.use(logHandler);

//routes
app.use("/sample", sampleRoutes);
app.use("/auth", authRoutes);
app.use("/order", orderRoutes);
app.use("/hotel", hotelRoutes);
app.use("/user", userRoutes);

//error handling
app.use(errorHandler);
app.use(NotFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const con = await connectDB();
    console.log(`MongoDB connected: ${con.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`${error}`.red.bold);
    process.exit();
  }
};

start();

app.listen(port, () =>
  console.log(`Server is listening on port ${port}...`.green.bold)
);
