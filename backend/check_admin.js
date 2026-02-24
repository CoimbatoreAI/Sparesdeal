const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');
dotenv.config();

const check = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const admin = await Admin.findOne({ email: 'admin@sparesdeal.com' });
    if (admin) {
        console.log('Admin found:', admin.email);
        const bcrypt = require('bcryptjs');
        const match = await bcrypt.compare('spares@793', admin.password);
        console.log('Password "spares@793" match:', match);
    } else {
        console.log('Admin NOT found');
    }
    process.exit();
};

check();
