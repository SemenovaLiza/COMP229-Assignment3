import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import app from "./server/express.js";

dotenv.config();

const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/Skeleton';
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  });

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${MONGO_URI}`);
});
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", PORT);
});
