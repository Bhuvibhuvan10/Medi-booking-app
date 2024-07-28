import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js"; // Import the Booking model

// Update a Doctor by ID
export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    if (!updatedDoctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
      error: error.message,
    });
  }
};

// Delete a Doctor by ID
export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
      error: error.message,
    });
  }
};

// Get a single Doctor by ID
export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor found",
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Doctor",
      error: error.message,
    });
  }
};

// Get all Doctors
export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    if (doctors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Doctors found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctors found",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Doctors",
      error: error.message,
    });
  }
};

// Get Doctor Profile
export const getDoctorProfile = async (req, res) => {
  // they used only userId not Doctor Id
  console.log("User Id", req.user.id);
  const doctorId = req.user.id;
  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const { password, role, ...rest } = doctor._doc;
    console.log(doctor._doc);
    console.log("doctor Detail");
    console.log(doctorId);
    const appointments = await Booking.find({ doctor: doctorId });
    res.status(200).json({
      success: true,
      message: "Profile info retrieved",
      data: { ...rest, appointments },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve profile info",
      error: error.message,
    });
  }
};
// Get the total number of doctors
export const getDoctorCount = async (req, res) => {
  try {
    const count = await Doctor.countDocuments({ isApproved: "approved" });
    console.log(count);
    res.status(200).json({
      success: true,
      message: "Total number of doctors retrieved",
      count: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctor count",
      error: error.message,
    });
  }
};
