const Admin = require('../models/Admin');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Admin Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const trimmedEmail = email.trim().toLowerCase();

        const admin = await Admin.findOne({ email: trimmedEmail });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id, role: 'admin' }, config.jwtSecret, { expiresIn: config.jwtExpiration });
        res.json({ token, user: { email: admin.email, id: admin._id, role: 'admin' } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// User Registration
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, password, phone });
        await user.save();

        const token = jwt.sign({ id: user._id, role: 'user' }, config.jwtSecret, { expiresIn: config.jwtExpiration });
        res.status(201).json({ token, user: { name: user.name, email: user.email, id: user._id, role: 'user' } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// User Login
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const trimmedEmail = email.trim().toLowerCase();

        const user = await User.findOne({ email: trimmedEmail });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: 'user' }, config.jwtSecret, { expiresIn: config.jwtExpiration });
        res.json({ token, user: { name: user.name, email: user.email, id: user._id, role: 'user' } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
