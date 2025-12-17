// backend/controllers/userController.js
import User from '../models/User.js';

// CREATE USER (Admin only - use protect + restrict later)
export const createUser = async (req, res) => {
  try {
    const { code, username, password, confirmPassword } = req.body;

    if (!code || !username || !password) {
      return res.status(400).json({ success: false, message: 'Code, Name, and Password are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    const codeExists = await User.findOne({ code });
    if (codeExists) {
      return res.status(400).json({ success: false, message: 'User Code already exists' });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    const user = await User.create({
      code,
      username,
      password,
      role: 'Admin'  // ← Always Admin
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        code: user.code,
        username: user.username,
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

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE USER (Name & Active status only)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, isActive } = req.body;

    if (!username) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { username, isActive },
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