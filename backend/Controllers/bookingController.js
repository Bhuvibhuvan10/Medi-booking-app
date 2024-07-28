import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Stripe from "stripe";

export const getCheckoutSession = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("User ID from req:", req.userId);
    // Get the currently booked doctor and user
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);

    // Ensure appointmentDate is provided in the request body
    const { appointmentDate } = req.body;
    if (!appointmentDate) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment date is required" });
    }
    const { appointmentTime } = req.body;
    if (!appointmentTime) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment Time is required" });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: "bdt",
            unit_amount: doctor.ticketPrice * 100,
            product_data: {
              name: doctor.name,
              description: doctor.bio,
              images: [doctor.photo],
            },
          },
          quantity: 1,
        },
      ],
    });

    // Create a new booking
    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      session: session.id,
      appointmentDate: new Date(appointmentDate), // Ensure this is a valid date
      appointmentTime: appointmentTime,
    });
    await booking.save();

    res
      .status(200)
      .json({ success: true, message: "Successfully Paid", session });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session" });
  }
};
