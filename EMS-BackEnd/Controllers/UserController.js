import ConnectToDatabase from "../db/db.js";
import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";

const CreateUser = async (req, res) => {
    ConnectToDatabase();
    
    try {
      const { name, email, password, role } = req.body;
      
      if (!name || !email || !password || !role) {
          return res.status(400).json({
            status: "fail", 
            message: "All fields are required" 
          });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({
            status: "fail", 
            message: "User already exists" 
          });
      }
      
      const hashPassword = await bcrypt.hash(password, 10);
      
      const newUser = new User({
          name,
          email,
          password: hashPassword,
          role,
      });

      await newUser.save();
      res.status(201).json({
        status: "success", 
        message: "User created successfully" 
      });
      
  } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "fail", 
        message: error.message 
      });
  }
};

export default CreateUser;
