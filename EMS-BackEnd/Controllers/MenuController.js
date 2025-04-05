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

    // Check if menus is missing or not an array
    if (!menus || !Array.isArray(menus)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid request: 'menus' must be an array.",
      });
    }

    // Ensure all menu IDs exist in the Menu collection
    const validMenus = await Menu.find({ _id: { $in: menus.map(m => m.menuId) } });

    if (validMenus.length !== menus.length) {
      return res.status(400).json({
        status: "fail",
        message: "Some menu IDs do not exist in the database.",
      });
    }

    const updateRoleMenu = await RoleMenu.findOneAndUpdate(
      { role },
      { $set: { menus } },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      status: "success",
      message: "Role menus updated successfully",
      data: updateRoleMenu,
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
