import {
  updateAdmin,
  deleteAdmin,
  getSingleAdmin,
  // getAllUser,
  getAdminProfile,
  getAllAppointments,
} from "../Controllers/adminController.js";
import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Admin endpoint");
});
router.get("/:id", authenticate, restrict(["admin"]), getSingleAdmin);

// router.get("/", authenticate, restrict(["admin"]), getAllUser);
router.put("/:id", authenticate, restrict(["admin"]), updateAdmin);
router.delete("/:id", authenticate, restrict(["admin"]), deleteAdmin);
router.get("/profile/me", authenticate, restrict(["admin"]), getAdminProfile);
router.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["patient"]),
  getAllAppointments
);

export default router;
