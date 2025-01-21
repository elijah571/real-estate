import { Property } from "../models/products.js";

export const createProperty = async (req, res) => {
  try {
    const property = new Property({
      ...req.body

    });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating property' });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error updating property' });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }


    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error deleting property' });
  }
};

export const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error fetching property' });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find(); // You can add filters here for search
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error fetching properties' });
  }
};
