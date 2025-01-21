import express from "express";
import { createOrder, getOrders, updateOrder } from "../controllers/order_controller.js";
import { auth, authAdmin } from "./../middleware/authentification.js";

export const orderRoute = express.Router();

// Order routes
orderRoute.post('/create', auth, createOrder); // Create a new order
orderRoute.put('/update/:orderId', auth, updateOrder); // Update an existing order by ID
orderRoute.get('/', auth, getOrders); // Get all orders
