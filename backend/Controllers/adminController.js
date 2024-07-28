import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Admin from "../models/AdminSchema.js";
export const updateAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedAdmin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to updated",
    });
  }
  console.log(id);
};
export const deleteAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    await Admin.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};
export const getSingleAdmin = async (req, res) => {
  const id = req.params.id;
  console.log("Admin", req.params.id);
  try {
    const user1 = await Admin.findById(id);
    res.status(200).json({
      success: true,
      message: "User Found",
      data: user1,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "No user",
    });
  }
};
// export const getAllUser = async (req, res) => {
//   try {
//     const users = await User.find({}).select("-password");

//     if (users.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No users found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Users found",
//       data: users,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve users",
//       error: error.message,
//     });
//   }
// };

export const getAdminProfile = async (req, res) => {
  const adminId = req.user.id; // Ensure this is set by your authentication middleware

  try {
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Exclude the password field
    const { password, ...rest } = admin._doc;

    res.status(200).json({
      success: true,
      message: "Profile info retrieved successfully",
      data: { ...rest },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Something went wrong, cannot get profile",
    });
  }
  console.log(adminId);
};

export const getAllAppointments = async (req, res) => {
  try {
    // Step 1: Retrieve appointments from bookings for the specific user
    const bookings = await Booking.find({ user: req.userId });

    // Step 2: Extract doctor IDs from appointment bookings
    const doctorIds = bookings.map((el) => el.doctor._id);

    // Step 3: Retrieve doctors using doctor IDs
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Appointments retrieved successfully",
      data: doctors,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving appointments",
    });
  }
};

// export const getMyAppointments = async (req, res) => {
//   try {
//     // step 1: retrieve appointments from booking for specific user

//     const bookings = await Booking.find({ user: req.userId });

//     // step 2: extract doctor ids from appointment bookings

//     const doctorIds = bookings.map((el) => el.doctor.id);

//     // step 3: retrieve  doctors using  doctor ids

//     const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
//       -password
//     );

//     res
//       .status(200)
//       .json({
//         success: true,
//         message: "Appointments are getting",
//         data: doctors,
//       });
//   } catch (error) {
//     res
//     .status(500)
//     .json({ success: false, message: "Something went wrong,cannot get" });

//   }
// };
// // import User from "../models/UserSchema.js";

// // Update a user by ID
// export const updateUser = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { $set: req.body },
//       { new: true }
//     ).select("-password");

//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Successfully updated",
//       data: updatedUser,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update",
//       error: error.message,
//     });
//   }
// };

// // Delete a user by ID
// export const deleteUser = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const deletedUser = await User.findByIdAndDelete(id);

//     if (!deletedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Successfully deleted",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete",
//       error: error.message,
//     });
//   }
// };

// // Get a single user by ID
// export const getSingleUser = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const user = await User.findById(id).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "User found",
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve user",
//       error: error.message,
//     });
//   }
// };

// // Get all users
// export const getAllUser = async (req, res) => {
//   try {
//     const users = await User.find({}).select("-password");

//     if (users.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No users found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Users found",
//       data: users,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve users",
//       error: error.message,
//     });
//   }
// };
