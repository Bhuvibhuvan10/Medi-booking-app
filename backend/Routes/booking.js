import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { getCheckoutSession } from "../Controllers/bookingController.js";
const app = express();
const router = express.Router();
app.use(express.json());

router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);
app.use("/api", router);

export default router;
