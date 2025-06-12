import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  empNo: {
    type: String,
    required: [true, "Employee No is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  leaveType: {
    type: String,
    required: [true, "Leave Type is required"],
  },
  leaveDuration: {
    type: String,
    required: [true, "Leave Duration is required"], // Full Day / Half Day
  },
  fromDate: {
    type: Date,
    required: [true, "Start Date is required"],
  },
  toDate: {
    type: Date,
    required: [true, "End Date is required"],
  },
  reasonType: {
    type: String,
    required: [true, "Reason Type is required"],
  },
  reasonComment: {
    type: String,
    required: [true, "Reason Comment is required"],
  },
  status: {
    type: String,
  },
  appliedBy: {
    type: String,
  },
  approverComment: {
    type: String,
  },
  updatedBy: {
    type: String, // e.g. EMP002 - Priya Manager
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Leave = mongoose.model("Leave", leaveSchema);

const employeeApproverMappingSchema = new mongoose.Schema({
  empNo: { 
    type: String, 
    required: true, 
    unique: true 
  },
  tlApprover: { 
    type: String, 
    required: true 
  },       // e.g., "TL002 - Priya Sharma"
  managerApprover: { 
    type: String, 
    required: true 
  },  // e.g., "MGR001 - Ankit Mehta"
  hrApprover: { 
    type: String, 
    required: true 
  }        // e.g., "HR001 - Meena Iyer"
});

const EmployeeApprover = mongoose.model('EmployeeApprover', employeeApproverMappingSchema);


export { Leave, EmployeeApprover };
