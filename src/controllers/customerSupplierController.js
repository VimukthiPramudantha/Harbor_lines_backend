// backend/controllers/customerSupplierController.js
import CustomerSupplier from '../models/CustomerSupplier.js';

// CREATE
export const createCustomerSupplier = async (req, res) => {
  try {
    const data = req.body;
    const newEntry = new CustomerSupplier(data);
    await newEntry.save();
    res.status(201).json({ success: true, data: newEntry });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET ALL + SEARCH
export const getAllCustomerSuppliers = async (req, res) => {
  try {
    const { search, type } = req.query;
    let query = {};

    if (type) query.type = type;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } }
      ];
    }

    const entries = await CustomerSupplier.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: entries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
export const updateCustomerSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await CustomerSupplier.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE
export const deleteCustomerSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CustomerSupplier.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};