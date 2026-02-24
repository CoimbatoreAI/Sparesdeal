const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const SubCategory = require('./models/SubCategory');
const Product = require('./models/Product');

dotenv.config();

const clearDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for cleanup...');

        await Product.deleteMany({});
        console.log('All products deleted');

        await SubCategory.deleteMany({});
        console.log('All subcategories deleted');

        await Category.deleteMany({});
        console.log('All categories deleted');

        console.log('Database cleared of mock data successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error clearing database:', error);
        process.exit(1);
    }
};

clearDB();
