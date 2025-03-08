import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required field']
    },
    email: {
        type: String,
        required: [true, 'Email is required field'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required field']
    },
    role: {
        type: String,
        enum: ["admin", "employee"],
        required: [true, 'Role is requied field']
    },
    profileImage: {
        type: String
    },
    createAt: {
        type: Date, default: Date.now
    },
    updateAt: {
        type: Date, default: Date.now
    }
})

const User = mongoose.model("User", userSchema);

export default User;