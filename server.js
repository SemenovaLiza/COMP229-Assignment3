import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./server/express.js";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

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
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

app.listen(PORT, () => {
  console.log(`Server is successfully running on port ${PORT}.`);
});