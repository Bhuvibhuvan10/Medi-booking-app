import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to updated",
    });
  }
  console.log(id);
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
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
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user1 = await User.findById(id);
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
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      error: error.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.user.id; // Ensure this is set by your authentication middleware

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Exclude the password field
    const { password, ...rest } = user._doc;

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
  console.log(userId);
};
export const getMyAppointments = async (req, res) => {
  try {
    const userId = req.userId;
    const currentDate = new Date();

    // Step 1: Retrieve current and future appointments for the specific user
    const bookings = await Booking.find({
      user: userId,
      appointmentDate: { $gte: currentDate },
    }).populate("doctor", "-password"); // Populate doctor details and exclude password

    // If no bookings found, return appropriate message
    if (!bookings.length) {
      return res.status(200).json({
        success: true,
        message: "You do not have any current appointments",
        data: [],
      });
    }

    // Step 2: Format the response to include booking details and doctor details
    const formattedBookings = bookings.map((booking) => ({
      _id: booking._id,
      doctor: {
        _id: booking.doctor._id,
        name: booking.doctor.name,
        photo: booking.doctor.photo,
        gender: booking.doctor.gender,
        bio: booking.doctor.bio,
      },
      ticketPrice: booking.ticketPrice,
      appointmentDate: booking.appointmentDate,
      status: booking.status,
      isPaid: booking.isPaid,
    }));

    res.status(200).json({
      success: true,
      message: "Appointments retrieved successfully",
      data: formattedBookings,
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
//     // Step 1: Retrieve appointments from bookings for the specific user
//     const bookings = await Booking.find({ user: req.userId });

//     // Step 2: Extract doctor IDs from appointment bookings
//     const doctorIds = bookings.map((el) => el.doctor._id);

//     // Step 3: Retrieve doctors using doctor IDs
//     const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
//       "-password"
//     );

//     res.status(200).json({
//       success: true,
//       message: "Appointments retrieved successfully",
//       data: doctors,
//     });
//   } catch (error) {
//     console.error("Error fetching appointments:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while retrieving appointments",
//     });
//   }
// };

// Get the total number of doctors
export const getPatientCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ isApproved: "approved" });
    console.log(count);
    res.status(200).json({
      success: true,
      message: "Total number of Patients retrieved",
      count: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve patient count",
      error: error.message,
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
