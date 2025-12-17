// backend/controllers/userController.js
import User from '../models/User.js';

// CREATE User (Admin only - we'll protect later)
export const createUser = async (req, res) => {
  try {
    const { code, name, password } = req.body;

    if (!code || !name || !password) {
      return res.status(400).json({ success: false, message: 'Code, Name and Password are required' });
    }

    const existing = await User.findOne({ code });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User code already exists' });
    }

    const user = await User.create({
      code,
      name,
      password,
      role: 'Admin' // Force Admin
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        code: user.code,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      },
      message: 'User created successfully as Admin'
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET ALL Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE User
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { name, isActive },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      data: user,
      message: 'User updated successfully'
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};