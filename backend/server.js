const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');

const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Setup uploads
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath);
}
app.use('/uploads', express.static(uploadsPath));

// Connect Database
connectDB().then(async () => {
    // Initial Admin Seed/Fix
    const adminEmail = 'admin@sparesdeal.com'.toLowerCase();
    const adminPassword = 'spares@793';

    try {
        const adminExists = await Admin.findOne({ email: adminEmail });
        if (!adminExists) {
            const newAdmin = new Admin({ email: adminEmail, password: adminPassword });
            await newAdmin.save();
            console.log('Admin user seeded');
        } else {
            // Force update password to ensure it's not double-hashed from previous attempts
            adminExists.password = adminPassword;
            await adminExists.save();
            console.log('Admin user credentials sync successful');
        }
    } catch (err) {
        console.error('Seeding error:', err.message);
    }
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/subcategories', require('./routes/subcategories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/enquiries', require('./routes/enquiries'));
app.use('/api/catalogues', require('./routes/catalogues'));
app.use('/api/payments', require('./routes/payments'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
