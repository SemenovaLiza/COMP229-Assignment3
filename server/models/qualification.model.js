import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema({
  title: String,
  firstname: {
    type: String,
    trim: true,
    required: "First name is required",
  },
  lastname: {
    type: String,
    trim: true,
    required: "Last name is required",
  },
  email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  completion: { type: Date },
  description: { type: String },
});


export default mongoose.model("Qualification", qualificationSchema);