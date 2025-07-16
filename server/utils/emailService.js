// Mailjet setup
const mailjet = require("node-mailjet").apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

// Send a generic email
exports.sendEmail = async ({ to, subject, text, html }) => {
  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.EMAIL_FROM,
            Name: process.env.EMAIL_FROM_NAME || "Webory Team",
          },
          To: [
            {
              Email: to,
            },
          ],
          Subject: subject,
          TextPart: text,
          HTMLPart: html || text.replace(/\n/g, "<br>"),
        },
      ],
    });
    console.log("Email sent:", request.body.Messages[0].Status);
    return request.body;
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Error sending email");
  }
};

/**
 * Send a confirmation email to the user after form submission/registration.
 * @param {Object} opts
 * @param {string} opts.to - Recipient email
 * @param {string} opts.name - Recipient name (optional)
 * @param {string} opts.formType - Type of form (e.g., Registration, Contact, Support, etc.)
 */
exports.sendConfirmationEmail = async ({
  to,
  name = "User",
  formType = "Form",
}) => {
  const subject = `Thank you for your ${formType} submission!`;
  const text = `Dear ${name},\n\nThank you for submitting your details for ${formType} on Webory. We have received your information and will get back to you soon.\n\nBest regards,\nWebory Team`;
  await exports.sendEmail({ to, subject, text });
};

// --- SETUP INSTRUCTIONS ---
// Add the following to your .env file after Mailjet verification:
// MJ_APIKEY_PUBLIC=your_mailjet_public_key
// MJ_APIKEY_PRIVATE=your_mailjet_private_key
// EMAIL_FROM=your_verified_sender_email
// EMAIL_FROM_NAME=Webory Team
