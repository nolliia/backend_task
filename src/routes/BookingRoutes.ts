import express from "express";
import * as BookingController from "../controllers/BookingController";

const router = express.Router();

router.post("/", BookingController.createBooking);
router.get("/:bookingId", BookingController.getBookingById);
router.put("/:bookingId", BookingController.updateBooking);
router.delete("/:bookingId", BookingController.deleteBooking);

export default router;
