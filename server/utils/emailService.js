// Mailjet setup
// const mailjet = require("node-mailjet").apiConnect(
//   process.env.MJ_APIKEY_PUBLIC,
//   process.env.MJ_APIKEY_PRIVATE
// );

// Fallback: Dummy sendEmail function for development
exports.sendEmail = async function (options) {
  console.log(
    "[DEV] Email sending is disabled. Email would be sent to:",
    options.To || options.to
  );
  console.log("Subject:", options.Subject || options.subject);
  console.log("Text:", options.TextPart || options.text);
  console.log("HTML:", options.HtmlPart || options.html);
  return { success: true, dev: true };
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
