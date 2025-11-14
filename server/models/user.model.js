import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  password: {
    type: String,
    required: "Password is required",
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to hash the password
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  this.salt = Math.round(new Date().valueOf() * Math.random()) + "";
  this.password = crypto
    .createHmac("sha1", this.salt)
    .update(this.password)
    .digest("hex");
  next();
});

// Methods
UserSchema.methods = {
  authenticate: function (plainText) {
    const hash = crypto
      .createHmac("sha1", this.salt)
      .update(plainText)
      .digest("hex");
    return this.password === hash;
  },
};

export default mongoose.model("User", UserSchema);
