import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["admin"],
    default: "admin",
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  permissions: {
    manageUsers: { type: Boolean, default: false },
    manageDoctors: { type: Boolean, default: false },
    manageAppointments: { type: Boolean, default: false },
    viewReports: { type: Boolean, default: false },
  },
});

AdminSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Admin", AdminSchema);
