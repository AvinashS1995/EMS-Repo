import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  checkInTime: {
    type: Date,
    required: true,
  },
  checkOutTime: {
    type: Date, // Can be updated later (e.g., automatic checkout)
    default: null,
  },
  deviceInfo: {
    type: String, // Can be expanded to an object with more info if needed
    required: true,
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
}, {
  timestamps: true,
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
