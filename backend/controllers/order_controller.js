import { Order } from "../models/order_model.js";
import { Property } from "../models/products.js";
import { User } from "../models/userModel.js";

export const createOrder = async (req, res) => {
  const { propertyId } = req.params;  // Get propertyId from URL
  const { message } = req.body;       // Get message from request body

  try {
    // Check if the property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Get user ID from authenticated user (assuming auth middleware attaches user)
    const userId = req.user._id;

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

    // Populate the user and property details for the response
    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'name email')      // Select specific fields from user
      .populate('property');               // Include all property details

    res.status(201).json(populatedOrder);
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
  const { propertyId, userId, message, status } = req.body; // Destructure from request body

  try {
    // Check if the order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update property if provided
    if (propertyId) {
      const property = await Property.findById(propertyId);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      order.property = propertyId;
    }

    // Update user if provided
    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      order.user = userId;
    }

    // Update message if provided
    if (message) {
      order.message = message;
    }

    // Update status if provided
    if (status) {
      order.status = status;
    }

    // Save the updated order
    await order.save();

    // Populate the user and property details for the response
    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'name email')      // Select specific fields from user
      .populate('property');               // Include all property details

    res.status(200).json(populatedOrder); // Return the updated order
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error updating order' });
  }
};
//Get single Order
export const getSingleOrder = async (req, res) => {
  const { orderId } = req.params; // Get orderId from the URL

  try {
    // Find the order by ID and populate user and property details
    const order = await Order.findById(orderId)
      .populate('user', 'name email')    // Populate specific user fields
      .populate('property');             // Populate all property details

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Return the order details
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error fetching order' });
  }
};
