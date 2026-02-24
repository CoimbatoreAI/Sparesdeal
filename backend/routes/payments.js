const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getUserOrders } = require('../controllers/paymentController');

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.get('/user-orders', getUserOrders);

module.exports = router;
