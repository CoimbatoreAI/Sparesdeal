const Enquiry = require('../models/Enquiry');
const nodemailer = require('nodemailer');

exports.createEnquiry = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        const attachments = req.files ? req.files.map(file => `/uploads/enquiries/${file.filename}`) : [];

        const enquiry = new Enquiry({
            name,
            email,
            phone,
            message,
            attachments
        });

        await enquiry.save();

        const { sendContactEmail } = require('../utils/emailUtils');
        const emailAttachments = req.files ? req.files.map(file => ({
            filename: file.originalname,
            path: file.path
        })) : [];
        await sendContactEmail({ name, email, phone, message, attachments: emailAttachments });

        res.status(201).json({ message: 'Enquiry sent successfully', enquiry });
    } catch (error) {
        console.error('Enquiry Error:', error);
        res.status(500).json({ message: 'Error sending enquiry', error: error.message });
    }
};

exports.getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching enquiries', error: error.message });
    }
};
