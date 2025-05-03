import { ConnectToDatabase } from "../db/db.js";
import { Type, User } from "../Models/UserModel.js";
import bcrypt from "bcrypt";

const CreateUser = async (req, res) => {
  ConnectToDatabase();

  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "User already exists",
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
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

const CreateTypeList = async (req, res) => {
  try {
    const { entityValue, typeLabel, description } = req.body;

    const labelExists = await Type.findOne({ typeLabel });

    if (labelExists) {
      return res.status(400).json({
        status: "fail",
        message: "Type label already exists",
      });
    }

    // Find max typeValue for this entityValue
    const lastType = await Type.findOne({ entityValue }).sort({
      typeValue: -1,
    });
    const newTypeValue = lastType ? lastType.typeValue + 1 : 1;

    const type = new Type({
      entityValue,
      typeLabel,
      typeValue: newTypeValue, // Store as number
      description,
    });

    await type.save();

    // Send only the required response fields
    res.status(201).json({
      status: "success",
      message: "Successfully Created!",
      data: {
        entityValue: type.entityValue,
        typeLabel: type.typeLabel,
        typeValue: type.typeValue,
        description: type.description,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const GetTypeList = async (req, res) => {
  try {
    const { entityValue , typeLabel} = req.body;

    // const query = entityValue ? { entityValue } : {};
    
    const query = {};

    if (entityValue) {
      query.entityValue = entityValue;
    }

    if (typeLabel) {
      query.typeLabel = typeLabel;
    }

    
      const types = await Type.find(query);

    res.status(200).json({
      status: "success",
      message: "Record(s) Fetched Successfully..!",
      data: {
        types,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      error: err.message,
    });
  }
};

const UpdateTypeList = async (req, res) => {
  try {
    const { id, entityValue, typeLabel, description } = req.body;

    const existingType = await Type.findById(id);

    if (!existingType) {
      return res.status(404).json({
        status: "fail",
        message: "Type not found",
      });
    }

    existingType.entityValue = entityValue;
    existingType.typeLabel = typeLabel;
    existingType.description = description;
    existingType.updateAt = new Date();

    await existingType.save();

    res.status(204).json({
      status: "success",
      message: "Record(s) Updated Successfully!",
      data: {
        entityValue: existingType.entityValue,
        typeLabel: existingType.typeLabel,
        typeValue: existingType.typeValue,
        description: existingType.description,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const DeleteTypeList = async (req, res) => {
  try {
    const { id } = req.body;

    const deleted = await Type.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        status: "fail",
        message: "Type not found!",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Record(s) Deleted Successfully..!",
      data: {
        entityValue: deleted.entityValue,
        typeLabel: deleted.typeLabel,
        typeValue: deleted.typeValue,
        description: deleted.description,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      error: err.message,
    });
  }
};

export { CreateUser, CreateTypeList, GetTypeList, UpdateTypeList, DeleteTypeList };
