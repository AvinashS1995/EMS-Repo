import { Menu, RoleMenu } from "../Models/menuModel.js";


const CreateMenu = async (req, res) => {
  try {
    // const menu = new Menu(req.body); // Ensure this is the correct model

    // Find the last menu in the sequence
    const lastMenu = await Menu.findOne().sort({ sequence: -1 });

    // Generate the next sequence number
    const newSequence = lastMenu ? lastMenu.sequence + 1 : 1;

    const menu = new Menu({
      ...req.body,
      sequence: newSequence // Assigning the auto-incremented sequence
    });

    await menu.save();

    return res.status(201).json({
      status: "success", // Fixed spelling
      message: "Menu created successfully",
      CreatedMenu: menu, // No need to wrap it in an extra object
    });
  } catch (error) {
    res.status(500).json({
      status: "fail", // Fixed spelling
      message: error.message,
    });
  }
};

const GetMenu = async (req, res) => {
  try {
    const menus = await Menu.find(); // Ensure this is the correct model

    res.status(200).json({
      status: "success",
      message: "Record(s) Fetched Successfully..!",
      data: menus, // Simplified response structure
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message, // Unified key name
    });
  }
};

// Assign menus to a role
const AssignRoleMenus = async (req, res) => {
  try {
    const { role, menus } = req.body;

    // Validate request
    if (!menus || !Array.isArray(menus)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid request: 'menus' must be an array.",
      });
    }

    // Check if role already exists
    const existingRoleMenu = await RoleMenu.findOne({ role });

    if (existingRoleMenu) {
      return res.status(400).json({
        status: "fail",
        message: "Menus already assigned to this role.",
      });
    }

    // Check all menu IDs exist
    const validMenus = await Menu.find({ _id: { $in: menus.map(m => m.menuId) } });

    if (validMenus.length !== menus.length) {
      return res.status(400).json({
        status: "fail",
        message: "Some menu IDs do not exist in the database.",
      });
    }

    // Assign new role menus
    const newRoleMenu = await RoleMenu.create({ role, menus });

    return res.status(201).json({
      status: "success",
      message: "Menus assigned to role successfully.",
      data: newRoleMenu,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};


// Get menus assigned to a role
const GetRoleMenus = async (req, res) => {
  try {

    const { role } = req.body;
    const roleMenu = await RoleMenu.findOne({ role }).populate("menus.menuId");

    res.status(200).json({ 
      status: "success",
      records: roleMenu.length, 
      roleMenus: roleMenu || { role, menus: [] } 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Correct export syntax
export { CreateMenu, GetMenu, AssignRoleMenus, GetRoleMenus };
