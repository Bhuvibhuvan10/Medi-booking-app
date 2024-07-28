import mongoose from "mongoose";
import Doctor from "../models/DoctorSchema.js";
const ReviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

ReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo reviewText",
  });
  next();
});
ReviewSchema.statics.calcAverageRatings = async function (doctorId) {
  const stats = await this.aggregate([
    {
      $match: { doctor: doctorId },
    },
    {
      $group: {
        _id: "$doctor",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  await Doctor.findByIdAndUpdate(doctorId, {
    totalRating: stats[0].numOfRating,
    averageRating: stats[0].avgRating,
  });
  if (stats.length > 0) {
    await this.model("Doctor").findByIdAndUpdate(doctorId, {
      ratingsQuantity: stats[0].numOfRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    // Set default values if no reviews
    await this.model("Doctor").findByIdAndUpdate(doctorId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5, // or any default value you prefer
    });
  }
};

ReviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.doctor);
});
export default mongoose.model("Review", ReviewSchema);
