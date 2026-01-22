import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/dbConnection.js";
import furnitureRoutes from "./routes/furniture.js";
import userRoutes from "./routes/user.js";
// create an instance of express application
const app = express();

// middleware to parse json data
app.use(express.json());
// configure dotenv
dotenv.config();

// call server to listen to PORT
const PORT = process.env.PORT;

// create simple route/endpoint
app.get("/", (req, res) => {
  res.send("Welcome to Furniro Server");
});

//define routes
app.use("/api/furniture", furnitureRoutes);
app.use("/api/user", userRoutes);

const startSever = async () => {
  try {
    await connectDB();
    app.listen(PORT, async () => {
      console.log(`Server is listening to PORT ${PORT}`);
    });
  } catch (e) {
    console.log(`Sever could not connect due to database error: ${e.message}`);
  }
};

// call db connection function
startSever();
