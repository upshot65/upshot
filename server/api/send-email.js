import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  try {
    // Parse the request body
    const body = await readBody(event);
    const { name, email, phone, enquiryFor, message } = body;

    const config = useRuntimeConfig();

    // Validate input
    if (!name || !email || !message || !enquiryFor) {
      throw new Error("Missing required fields.");
    }

    // Nodemailer Transporter Configuration
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use other services like Yahoo, Outlook, etc.
      auth: {
        user: config.user, // Email is now taken from environment variables
        pass: config.pass, // Password is now taken from environment variables
      },
    });

    // Email content
    const mailOptions = {
      from: `"${name}" <${email}>`, // Sender's name and email
      to: "contact@upshotbrandmedia.com", // Your email address
      subject: `New Contact Request: ${enquiryFor}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #1a73e8;">New Contact Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Enquiry For:</strong> ${enquiryFor}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr />
          <p style="font-size: 0.9em; color: #666;">This email was sent from your website's contact form.</p>
        </div>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Email sent successfully.",
      info,
    };
  } catch (error) {
    console.error("Error sending email:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
});
