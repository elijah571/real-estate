import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'Pending' }, 
}, { timestamps: true } );

export const Order = mongoose.model("Order", orderSchema);
