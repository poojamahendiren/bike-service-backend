// config/nodemailer.js
const nodemailer = require('nodemailer');

// Step 1: Create a transporter with your email service settings
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail', 'Outlook', etc.
  auth: {
    user: 'your_email_address', // Your email address for sending notifications
    pass: 'your_email_password', // Your email password or an app-specific password
  },
});

// Step 2: Set up email options for sending notifications
const sendMail = async (toEmail, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: 'your_email_address', // Should be the same as the user in the transporter
      to: toEmail, // Recipient's email address
      subject, // Subject of the email
      html: htmlContent, // Email content in HTML format
    };

    // Step 3: Send the email using the transporter and mail options
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendMail;
