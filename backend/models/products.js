import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  furnished: { type: Boolean, required: true },
  parking: { type: Boolean, required: true },
  type: { type: String, required: true },
  offer: { type: Boolean, required: true },
  image: { type: [String], required: true },
}, { timestamps: true });

export const Property = mongoose.model("Property", propertySchema)