import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "../../config/config.js";

// SIGN IN
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "User not found" });

    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Email and password don't match." });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: "1d" });

    res.cookie("t", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" });
  }
};

// SIGN OUT
const signout = (req, res) => {
  res.clearCookie("t", {
    path: "/",
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res.json({ message: "Signed out successfully" });
};

// PROTECTED ROUTE
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
      return req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.t) {
      return req.cookies.t;
    }
    return null;
  },
});

// AUTHORIZATION
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id.toString() === req.auth._id;
  if (!authorized) return res.status(403).json({ error: "User is not authorized" });
  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
