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

const typeSchema = new mongoose.Schema({
    entityValue: {
        type: String,
        required: [true, 'Type is required field'],
    },
    typeLabel: {
        type: String,
        required: [true, 'Type Name is required field'],
        unique: true
    },
    typeValue: {
        type: Number,
        required: [true, 'Type Value is required field'],
        // unique: true
    },
    description: {
        type: String,
        required: [true, 'Description is required field']
    },
    createAt: {
        type: Date, default: Date.now
    },
    updateAt: {
        type: Date, default: Date.now
    }
})

const Type = mongoose.model("Type", typeSchema)

const statusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Status is required field'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Status Description is required field']
    }
}, 
{
    timestamps: true
})

const Status = mongoose.model("Status", statusSchema)


export  { User, Type, Status };