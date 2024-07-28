import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },
    appointmentDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v && v > Date.now();
        },
        message: (props) =>
          `Appointment date (${props.value}) must be in the future!`,
      },
    },
    appointmentTime: {
      type: String, // You can adjust the type if necessary (e.g., Date if using a Date object)
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Automatically populate user and doctor fields
BookingSchema.pre(/^find/, function (next) {
  this.populate("user", "name photo gender") // Adjust fields as needed
    .populate("doctor", "name photo gender bio"); // Adjust fields as needed
  next();
});

export default mongoose.model("Booking", BookingSchema);

// import mongoose from "mongoose";

// const BookingSchema = new mongoose.Schema(
//   {
//     doctor: {
//       type: mongoose.Types.ObjectId,
//       ref: "Doctor",
//       required: true,
//     },
//     user: {
//       type: mongoose.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     ticketPrice: { type: String, required: true },
//     appointmentDate: {
//       type: Date,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["pending", "approved", "cancelled"],
//       default: "pending",
//     },
//     isPaid: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );
// BookingSchema.pre(/^find/, function (next) {
//   this.populate("user").populate({
//     path: "doctor",
//     select: "name",
//   });
//   next();
// });
// export default mongoose.model("Booking", BookingSchema);
