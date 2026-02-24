const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOrderConfimationEmail = async (order) => {
    const { customer, items, totalAmount, orderId } = order;

    const itemsHtml = items.map(item => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">Rs. ${item.price.toLocaleString()}</td>
        </tr>
    `).join('');

    const customerMailOptions = {
        from: `"Sparesdeal" <${process.env.EMAIL_USER}>`,
        to: customer.email,
        subject: `Order Confirmation - ${orderId}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
                <h2 style="color: #333; text-align: center;">Order Confirmed!</h2>
                <p>Dear ${customer.name},</p>
                <p>Thank you for your order. We've received your payment and are processing it.</p>
                <h3>Order Summary:</h3>
                <p><strong>Order ID:</strong> ${orderId}</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #f8f8f8;">
                            <th style="padding: 10px; text-align: left;">Item</th>
                            <th style="padding: 10px; text-align: center;">Qty</th>
                            <th style="padding: 10px; text-align: right;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2" style="padding: 10px; font-weight: bold; text-align: right;">Total:</td>
                            <td style="padding: 10px; font-weight: bold; text-align: right;">Rs. ${totalAmount.toLocaleString()}</td>
                        </tr>
                    </tfoot>
                </table>
                <p>Your order will be shipped to:</p>
                <p>${customer.address}<br>${customer.city}, ${customer.state} - ${customer.pincode}</p>
                <p>If you have any questions, please contact us at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a> or WhatsApp us.</p>
                <p>Best regards,<br>Team Sparesdeal</p>
            </div>
        `
    };

    const adminMailOptions = {
        from: `"Sparesdeal Website" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Order Received - ${orderId}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
                <h2 style="color: #333;">New Order Notification</h2>
                <p>You have received a new order on Sparesdeal.</p>
                <h3>Customer Details:</h3>
                <p><strong>Name:</strong> ${customer.name}<br>
                <strong>Email:</strong> ${customer.email}<br>
                <strong>Phone:</strong> ${customer.phone}<br>
                <strong>Address:</strong> ${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}</p>
                
                <h3>Order Details:</h3>
                <p><strong>Order ID:</strong> ${orderId}</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #f8f8f8;">
                            <th style="padding: 10px; text-align: left;">Item</th>
                            <th style="padding: 10px; text-align: center;">Qty</th>
                            <th style="padding: 10px; text-align: right;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2" style="padding: 10px; font-weight: bold; text-align: right;">Total Amount Paid:</td>
                            <td style="padding: 10px; font-weight: bold; text-align: right;">Rs. ${totalAmount.toLocaleString()}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `
    };

    try {
        await transporter.sendMail(customerMailOptions);
        await transporter.sendMail(adminMailOptions);
        console.log('Emails sent successfully');
    } catch (error) {
        console.error('Error sending emails:', error);
    }
};

const sendContactEmail = async (contactData) => {
    const { name, email, phone, message, attachments } = contactData;

    const mailOptions = {
        from: `"Contact Form" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Inquiry from ${name}`,
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Message:
            ${message}
        `,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px;">
                <h2>New Contact Inquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
            </div>
        `,
        attachments: attachments || []
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Contact email sent to admin');
    } catch (error) {
        console.error('Error sending contact email:', error);
    }
};

const sendCatalogueRequestEmail = async (requestData) => {
    const { name, email, phone, companyName, companyAddress, catalogueTitle } = requestData;

    const mailOptions = {
        from: `"Catalogue Request" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `Catalogue Download Request: ${catalogueTitle}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee;">
                <h2 style="color: #2563eb;">Catalogue Download Request</h2>
                <p>Someone just requested to download a catalogue.</p>
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                    <p><strong>Catalogue:</strong> ${catalogueTitle || 'Not specified'}</p>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Company:</strong> ${companyName}</p>
                    <p><strong>Address:</strong> ${companyAddress}</p>
                </div>
                <p style="font-size: 12px; color: #64748b; margin-top: 20px;">Requested at: ${new Date().toLocaleString()}</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending catalogue request email:', error);
    }
};

module.exports = {
    sendOrderConfimationEmail,
    sendContactEmail,
    sendCatalogueRequestEmail
};
