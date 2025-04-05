import ConnectToDatabase from "../db/db.js";
import { User,  Role } from "../Models/UserModel.js";
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

const CreateRole = async (req, res) => {

  try {
    const { name, description } = req.body;

    // Check if role already exists
    const existingRole = await Role.findOne({ name });

    if (existingRole) {
      return res.status(400).json({
        status:"fail", 
        message: 'Role already exists' 
      });
    }

    const newRole = new Role({ name, description });

    await newRole.save();

    res.status(201).json({
      status: "success", 
      message: 'Role created successfully',
      data : {
        role: newRole 

      } 
    });
  } catch (err) {
    res.status(500).json({ 
      status: "fail", 
      message: err.message 
    });
  }
}

const GetAllRoles = async (req, res) => {

  try {
    const roles = await Role.find();

    res.status(200).json({
      status: "success",
      message: "Record(s) Fetched Successfully..!",
      data: {
        roles
      }
    });

  } catch (err) {
    res.status(500).json({ 
      status: "fail", 
      error: err.message 
    });
  }
}

export  { CreateUser, CreateRole, GetAllRoles};
