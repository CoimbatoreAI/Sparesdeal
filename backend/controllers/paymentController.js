const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const { sendOrderConfimationEmail } = require('../utils/emailUtils');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
    try {
        const { amount, customer, items } = req.body;

        const options = {
            amount: Math.round(amount * 100), // amount in shortest currency unit (paise for INR)
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const razorpayOrder = await razorpay.orders.create(options);

        // Create initial order in our DB
        const newOrder = new Order({
            orderId: razorpayOrder.receipt,
            razorpayOrderId: razorpayOrder.id,
            customer,
            items,
            totalAmount: amount,
            status: 'pending'
        });

        await newOrder.save();

        res.status(200).json({
            success: true,
            order: razorpayOrder,
            key_id: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error('Create Order Error:', error);
        res.status(500).json({ success: false, message: 'Could not create Razorpay order', error: error.message });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Update order status in DB
            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                {
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature,
                    status: 'paid',
                    paymentStatus: 'completed'
                },
                { new: true }
            );

            if (order) {
                // Send confirmation emails
                await sendOrderConfimationEmail(order);

                res.status(200).json({
                    success: true,
                    message: "Payment verified successfully",
                    orderId: order.orderId
                });
            } else {
                res.status(404).json({ success: false, message: "Order not found" });
            }
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid signature"
            });
        }
    } catch (error) {
        console.error('Verify Payment Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
exports.getUserOrders = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ message: 'Email is required' });

        const orders = await Order.find({ 'customer.email': email }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};
