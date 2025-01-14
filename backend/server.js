/* import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const port = 5000;

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(cors()); // Allow cross-origin requests (optional)

// Set up the email transporter using your email service
const transporter = nodemailer.createTransport({
    service: "gmail", // Or use any service you prefer (e.g., SendGrid)
    auth: {
        user: "qalifirman03@gmail.com", // Replace with your email
        pass: "Apple1976", // Replace with your email password or app-specific password
    },
});

// POST route to handle appointment booking
app.post("/book-appointment", (req, res) => {
    const { name, email, date, time, service } = req.body;

    // Compose the email content
    const mailOptions = {
        from: "qalifirman@gmail.com", // Replace with your email
        to: email, // Send email to the user
        subject: "Appointment Confirmation",
        text: `Hello ${name},\n\nYour appointment has been successfully booked for ${service} on ${date} at ${time}.\n\nThank you for choosing our service!`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);  // Log error details
            return res.status(500).send("Error sending email: " + error);
        } else {
            return res.status(200).send("Appointment booked successfully and confirmation email sent!");
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
