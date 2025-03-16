import ConnectToDatabase from "../db/db.js";
import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";

const CreateUser = async (req, res) => {
    ConnectToDatabase();
    
  try {
    const hashPassword = await bcrypt.hash("Admin", 10);
    const newUser = await new User({
      name: "Admin",
      email: "abhiyavm@gmail.com",
      password: hashPassword,
      role: "admin",
    });

    await newUser.save();
    
  } catch (error) {
    console.log(error);
  }
};

export default CreateUser;

// CreateUser();
