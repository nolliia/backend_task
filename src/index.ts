// Import required modules and data
import express from "express";
import bookingsData from "../bookings.json";
import propertiesData from "../properties.json";

// Create an instance of Express
const app = express();
const port = 3000;

// Endpoint to retrieve the whole list of Properties
app.get("/properties", (req, res) => {
  res.json(propertiesData);
});

// Endpoint to retrieve the whole list of Bookings with Property names and IDs
app.get("/bookings", (req, res) => {
  const bookingsWithProperties = bookingsData.map((booking) => {
    const property = propertiesData.find(
      (property) => property.id === booking.property_id
    );
    return {
      ...booking,
      property_name: property ? property.name : "Unknown",
    };
  });
  res.json(bookingsWithProperties);
});

// Endpoint to retrieve the list of AVAILABLE Properties within a given period
app.get("/properties/available", (req, res) => {
  const { startDate, endDate } = req.query;
  const startTimestamp = parseInt(startDate as string, 10);
  const endTimestamp = parseInt(endDate as string, 10);

  const availableProperties = propertiesData.filter((property) => {
    const overlappingBooking = bookingsData.some((booking) => {
      return (
        booking.property_id === property.id &&
        booking.from <= endTimestamp &&
        booking.to >= startTimestamp
      );
    });
    return !overlappingBooking;
  });

  res.json(availableProperties);
});

// Endpoint to retrieve the list of OCCUPIED Properties within a given period
app.get("/properties/occupied", (req, res) => {
  const { startDate, endDate } = req.query;
  const startTimestamp = parseInt(startDate as string, 10);
  const endTimestamp = parseInt(endDate as string, 10);

  const occupiedProperties = propertiesData.filter((property) => {
    const overlappingBooking = bookingsData.some((booking) => {
      return (
        booking.property_id === property.id &&
        booking.from <= endTimestamp &&
        booking.to >= startTimestamp
      );
    });
    return overlappingBooking;
  });

  res.json(occupiedProperties);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
