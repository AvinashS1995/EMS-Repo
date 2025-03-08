import ConnectToDatabase from "../db/db.js";
import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";

const CreateUser = async () => {
    ConnectToDatabase();
  try {
    const hashPassword = await bcrypt.hash("Admin", 10);
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });

    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};



CreateUser();
