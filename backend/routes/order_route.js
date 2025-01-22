import express from "express";
import { createOrder, getOrders, getSingleOrder, updateOrder } from "../controllers/order_controller.js";
import { auth, authAdmin } from "./../middleware/authentification.js";

export const orderRoute = express.Router();

// Order routes
orderRoute.post('/create/:propertyId', auth, createOrder); // Create a new order with propertyId in URL
orderRoute.put('/update/:orderId', auth, authAdmin, updateOrder); // Update an existing order by ID
orderRoute.get('/:orderId', auth,  getSingleOrder); // Get an existing order by ID
orderRoute.get('/', auth,  getOrders); // Get all orders
