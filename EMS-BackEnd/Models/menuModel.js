import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required field..!"],
  },
  path: {
    type: String,
    required: [true, "Path is required field..!"],
  },
  componentName: {
    type: String,
    required: [true, "Component Name is required field..!"],
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
  },
  parentMenu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    default: null,
  },
  sequence: {
    type: Number,
    unique: true,
  }, // Auto-generated sequence number
});

const Menu = mongoose.model("Menu", MenuSchema);

const RoleMenuSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, "Role is required field..!"],
  },
  menus: [
    {
      menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
      access: {
        type: String,
        enum: ["noAccess", "fullAccess"],
        default: "noAccess",
      },
    },
  ],
});

const RoleMenu = mongoose.model("RoleMenu", RoleMenuSchema);

export { Menu, RoleMenu };
