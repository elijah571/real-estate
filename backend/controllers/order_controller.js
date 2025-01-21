import { Order } from "../models/order_model.js";
import { Property } from "../models/products.js";
import { User } from "../models/userModel.js";

export const createOrder = async (req, res) => {
  const { userId, propertyId, message } = req.body;

  try {
    // Check if the property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new order
    const order = new Order({
      user: userId,
      property: propertyId,
      message,
    });

    // Save the order to the database
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating order' });
  }
};

export const getOrders = async (req, res) => {
  try {
    // Fetch all orders, optionally you can filter by user or status
    const orders = await Order.find().populate('user property');  // populate to get user and property details
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error fetching orders' });
  }
};

export const updateOrder = async (req, res) => {
  const { orderId } = req.params; // Order ID from the URL
  const { propertyId, message } = req.body; // Destructure from request body
  
  try {
    // Check if the order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if propertyId is provided and update property
    if (propertyId) {
      const property = await Property.findById(propertyId);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      order.property = propertyId; // Update property if provided
    }

    // Check if message is provided and update message
    if (message) {
      order.message = message; // Update message if provided
    }

    // Save the updated order
    await order.save();

    res.status(200).json(order); // Return the updated order
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error updating order' });
  }
};
