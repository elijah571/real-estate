import express from "express";
import { createProperty, deleteProperty, getProperties, getProperty, updateProperty } from "../controllers/property_controller.js";
import { upload } from "../middleware/upload.js";
import { auth, authAdmin } from "./../middleware/authentification.js";

export const propertyRoute = express.Router();

// Property routes
propertyRoute.post('/create', auth, authAdmin,  upload.array('images'), createProperty); // Create a new property
propertyRoute.put('/update/:id', auth, authAdmin, upload.array('images'), updateProperty); // Update a specific property by ID
propertyRoute.delete('/delete/:id', auth, authAdmin, deleteProperty); // Delete a specific property by ID
propertyRoute.get("/:id", auth, getProperty); // Get a single property by ID
propertyRoute.get("/", auth, getProperties); // Get all properties
