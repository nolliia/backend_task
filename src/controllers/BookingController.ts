import { Request, Response } from "express";
import bookingsData from "../../bookings.json";
import propertiesData from "../../properties.json";
import Booking from "../models/Booking";

export const createBooking = (req: Request, res: Response) => {
  const newBooking: Booking = req.body;
  bookingsData.push(newBooking);
  return res.status(201).json(newBooking);
};

export const getBookingById = (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const booking = bookingsData.find(
    (booking: Booking) => booking.id === bookingId
  );

  if (!booking) {
    return res.status(404).json({
      message: "Failed to retrieve booking",
      error: {
        message: `Booking with ID ${bookingId} not found`,
      },
    });
  }

  const property = propertiesData.find(
    (property: { id: string }) => property.id === booking.property_id
  );

  const result = {
    id: booking.id,
    property: property ? { id: property.id, name: property.name } : null,
    from: booking.from,
    to: booking.to,
    tenant_name: booking.tenant_name,
  };

  return res.json(result);
};

export const updateBooking = (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const updatedBooking: Booking = req.body;

  const index = bookingsData.findIndex(
    (booking: Booking) => booking.id === bookingId
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Failed to update booking",
      error: {
        message: `Booking with ID ${bookingId} not found`,
      },
    });
  }

  bookingsData[index] = updatedBooking;

  return res.json(updatedBooking);
};

export const deleteBooking = (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const index = bookingsData.findIndex(
    (booking: Booking) => booking.id === bookingId
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Failed to delete booking",
      error: {
        message: `Booking with ID ${bookingId} not found`,
      },
    });
  }

  const deletedBooking = bookingsData.splice(index, 1)[0];

  return res.json({
    message: "Booking deleted successfully",
    deletedBooking,
  });
};
