import { Menu, RoleMenu } from "../Models/menuModel.js";


// const CreateMenu = async (req, res) => {
//   try {
//     // const menu = new Menu(req.body); // Ensure this is the correct model

//     // Find the last menu in the sequence
//     const lastMenu = await Menu.findOne().sort({ sequence: -1 });

//     // Generate the next sequence number
//     const newSequence = lastMenu ? lastMenu.sequence + 1 : 1;

//     const menu = new Menu({
//       ...req.body,
//       sequence: newSequence // Assigning the auto-incremented sequence
//     });

//     await menu.save();

//     return res.status(201).json({
//       status: "success", // Fixed spelling
//       message: "Menu created successfully",
//       CreatedMenu: menu, // No need to wrap it in an extra object
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail", // Fixed spelling
//       message: error.message,
//     });
//   }
// };

const CreateMenu = async (req, res) => {
  try {
    const { parentId, ...menuData } = req.body;

    if (!parentId) {
      // 🌐 Parent Menu → Global Sequence
      const lastMenu = await Menu.findOne().sort({ sequence: -1 });
      const newSequence = lastMenu ? lastMenu.sequence + 1 : 1;

      const newMenu = new Menu({
        ...menuData,
        parentMenu: null,
        sequence: newSequence,
        childMenu: []
      });

      await newMenu.save();

      return res.status(201).json({
        status: "success",
        message: "Parent menu created successfully",
        CreatedMenu: newMenu,
      });

    } else {
      // 📦 Child Menu → Local sequence inside parent
      const parentMenu = await Menu.findById(parentId);
      if (!parentMenu) {
        return res.status(404).json({ status: "fail", message: "Parent menu not found" });
      }

      // Get max sequence among existing child menus
      const lastChild = parentMenu.childMenu.reduce((prev, curr) =>
        curr.sequence > prev.sequence ? curr : prev,
        { sequence: 0 }
      );
      const childSequence = lastChild.sequence + 1;

      parentMenu.childMenu.push({
        ...menuData,
        sequence: childSequence,
        childMenu: []
      });

      await parentMenu.save();

      return res.status(201).json({
        status: "success",
        message: "Child menu created successfully",
        CreatedMenu: parentMenu,
      });
    }

  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};




// const GetMenu = async (req, res) => {
//   try {
//     const menus = await Menu.find(); // Ensure this is the correct model

//     res.status(200).json({
//       status: "success",
//       message: "Record(s) Fetched Successfully..!",
//       data: menus, // Simplified response structure
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: error.message, // Unified key name
//     });
//   }
// };

const GetMenu = async (req, res) => {
  try {
    // Get all parent menus
    const parentMenus = await Menu.find({ parentMenu: null }).lean();

    // Sort parent and child menus by their sequence
    parentMenus.sort((a, b) => a.sequence - b.sequence);

    parentMenus.forEach(parent => {
      if (Array.isArray(parent.childMenu)) {
        parent.childMenu.sort((a, b) => a.sequence - b.sequence);
      }
    });

    return res.status(200).json({
      status: "success",
      message: "Menus fetched successfully",
      data: parentMenus,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
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

      const existingMenuIds = existingRoleMenu.menus.map(m => m.menuId.toString());
      const newMenusToAdd = menus.filter(m => !existingMenuIds.includes(m.menuId));

      if (newMenusToAdd.length === 0) {
        return res.status(200).json({
          status: "success",
          message: "No new menus to add. Menus already assigned.",
        });
      }

      existingRoleMenu.menus.push(...newMenusToAdd);
      await existingRoleMenu.save();

      return res.status(200).json({
        status: "success",
        message: "New menus assigned to role successfully.",
        data: existingRoleMenu,
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
