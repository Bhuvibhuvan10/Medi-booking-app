import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

// get all review
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res
      .status(200)
      .json({ success: true, message: "Successful", data: reviews });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

// create review
export const createReview = async (req, res) => {
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.user) req.body.user = req.params.userId;

  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();
    await Doctor.findByIdAndUpdate(req.body.doctor),
      {
        $push: { reviews: savedReview._id },
      };
    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// import Review from "../models/ReviewSchema.js";
// import Doctor from "../models/DoctorSchema.js";

// // get all reviews
// export const getAllReviews = async (req, res) => {
//   try {
//     const reviews = await Review.find({});
//     res
//       .status(200)
//       .json({ success: true, message: "Successful", data: reviews });
//   } catch (error) {
//     res.status(404).json({ success: false, message: "Not Found" });
//   }
// };

// // create review
// export const createReview = async (req, res) => {
//   const { doctorId } = req.params;
//   let { doctors, users, ...reviewData } = req.body;

//   // If user or doctor is not provided in the body, use the parameters
//   doctors = doctors || doctorId;
//   users = users || req.user?._id; // Assuming req.user is set by authentication middleware

//   // Check if user ID exists
//   if (!users) {
//     return res
//       .status(400)
//       .json({ success: false, message: "User ID is required" });
//   }

//   const reviewDetails = {
//     ...reviewData,
//     doctors,
//     users,
//   };
//   console.log("reviewDetails", reviewDetails);
//   const newReview = new Review(reviewDetails);

//   try {
//     const savedReview = await newReview.save();
//     await Doctor.findByIdAndUpdate(
//       doctors,
//       { $push: { reviews: savedReview._id } },
//       { new: true, useFindAndModify: false }
//     );
//     res
//       .status(200)
//       .json({ success: true, message: "Review submitted", data: savedReview });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
