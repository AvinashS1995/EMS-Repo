import mongoose from "mongoose";

const sidenavSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Title is required field']
    },
    icon: {
        type: String,
        required: [true, 'Icon is required field'],
        unique: true
    },
    route: {
        type: String,
        required: [true, 'Route is required field']
    },
    sequence: {
        type: Number,
        required: [true, 'Sequence is required field']
    },
    role: {
        type: String,
        required: [true, 'Role is requied field']
    },
    

})

const Sidenav = mongoose.model("Sidenav", sidenavSchema);

export default Sidenav;