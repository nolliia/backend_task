import express from "express";
import * as PropertyController from "../controllers/PropertyController";

const router = express.Router();

router.post("/", PropertyController.createProperty);
router.get("/:propertyId", PropertyController.getPropertyById);
router.put("/:propertyId", PropertyController.updateProperty);
router.delete("/:propertyId", PropertyController.deleteProperty);

export default router;
