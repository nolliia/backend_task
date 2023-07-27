import { Request, Response } from "express";
import propertiesData from "../../properties.json";
import Property from "../models/Property";

export const createProperty = (req: Request, res: Response) => {
  const newProperty: Property = req.body;
  propertiesData.push(newProperty);
  return res.status(201).json(newProperty);
};

export const getPropertyById = (req: Request, res: Response) => {
  const { propertyId } = req.params;
  const property = propertiesData.find(
    (property: Property) => property.id === propertyId
  );

  if (!property) {
    return res.status(404).json({
      message: "Failed to retrieve property",
      error: {
        message: `Property with ID ${propertyId} not found`,
      },
    });
  }

  return res.json(property);
};

export const updateProperty = (req: Request, res: Response) => {
  const { propertyId } = req.params;
  const updatedProperty: Property = req.body;

  const index = propertiesData.findIndex(
    (property: Property) => property.id === propertyId
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Failed to update property",
      error: {
        message: `Property with ID ${propertyId} not found`,
      },
    });
  }

  propertiesData[index] = updatedProperty;

  return res.json(updatedProperty);
};

export const deleteProperty = (req: Request, res: Response) => {
  const { propertyId } = req.params;

  const index = propertiesData.findIndex(
    (property: Property) => property.id === propertyId
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Failed to delete property",
      error: {
        message: `Property with ID ${propertyId} not found`,
      },
    });
  }

  const deletedProperty = propertiesData.splice(index, 1)[0];

  return res.json({
    message: "Property deleted successfully",
    deletedProperty,
  });
};
