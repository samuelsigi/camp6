// controllers/authController.js
const Member = require('../models/Member');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a secure key

// Admin hardcoded credentials
const adminCredentials = {
  email: 'admin@gmail.com',
  password: 'admin123'
};

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await Member.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    // Create new user
    const newUser = new Member({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is for an admin
    if (email === adminCredentials.email && password === adminCredentials.password) {
      const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, message: 'Admin login successful' });
    }

    // Find user by email
    const user = await Member.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Generate token
    const token = jwt.sign({ userId: user._id, email: user.email, role: 'member' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
