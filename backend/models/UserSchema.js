// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   name: { type: String, required: true },
//   phone: { type: Number },
//   photo: { type: String },
//   role: {
//     type: String,
//     enum: ["patient", "admin"],
//     default: "patient",
//   },
//   gender: { type: String, enum: ["male", "female", "other"] },
//   age: { type: Number },
//   maritalstatus: { type: String, enum: ["single", "married"] },
//   appointments: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],

//   whofillform: {
//     type: String,
//     enum: ["self", "parent", "other"],
//     required: true,
//   },
//   workstatus: {
//     type: String,
//     enum: [
//       "student",
//       "jobSeeker",
//       "stayatHome",
//       "salaried",
//       "selfEmployed",
//       "retired",
//       "other",
//     ],
//   },
//   howdidyouknowaboutus: {
//     type: String,
//     enum: [
//       "referral",
//       "googleSearch",
//       "socialMedia",
//       "privateCommunity",
//       "publicCommunity",
//     ],
//   },
//   sessionlokingfor: {
//     type: String,
//     enum: [
//       "mentalWellnessCounselling",
//       "mentalWellnessTherapy",
//       "physicalWellnessTherapy",
//       "emergencyInjuryTrauma",
//       "beauty",
//       "diet",
//       "fitness",
//       "careerAndGrowthPlanning",
//       "other",
//     ],
//   },
//   explainsituationandcondition: { type: String },
//   address: { type: String },
// });

// export default mongoose.model("User", UserSchema);
// User model for Patients
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String },
  gender: { type: String,required:true },
  role: { type: String, required: true },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  whofillform: {
    type: String,
    required: function () {
      return this.role === "patient";
    },
  },
  workstatus: {
    type: String,
    required: function () {
      return this.role === "patient";
    },
  },
  howdoyouknowabout: {
    type: String,
    required: function () {
      return this.role === "patient";
    },
  },
  sessionlookingfor: {
    type: String,
    required: function () {
      return this.role === "patient";
    },
  },
  explainsituationandcondition: {
    type: String,
    required: function () {
      return this.role === "patient";
    },
  },
});

export default mongoose.model("User", UserSchema);
