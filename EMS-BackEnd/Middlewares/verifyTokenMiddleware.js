import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("auth-token").split(" ")[1];

    if (!token) {
      res.status(401).json({
        status: "fail",
        message: "Access Denied",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      res.status(404).json({
        status: "fail",
        message: "Invalid Token",
      });
    }

    const user = User.findById(decoded._id).select("-password");

    if (!user) {
      res.status(404).json({
        status: "fail",
        message: "User Not Found",
      });
    }

    res.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};


export default verifyToken;
