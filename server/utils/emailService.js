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
  const html = `<div style='font-family:sans-serif;background:#f9f9f9;padding:24px;border-radius:12px;max-width:600px;margin:auto;'>
    <div style='text-align:center;margin-bottom:24px;'>
      <img src='/outputB2.png' alt='Webory Logo' style='height:48px;'>
    </div>
    <div style='background:#fff;padding:24px;border-radius:8px;'>
      <h2 style='color:#6C63FF;'>Thank you for your ${formType} submission!</h2>
      <p style='color:#333;'>Dear ${name},</p>
      <p style='color:#333;'>Thank you for submitting your details for <b>${formType}</b> on Webory. We have received your information and will get back to you soon.</p>
    </div>
    <div style='text-align:center;color:#888;margin-top:24px;font-size:13px;'>Webory Team &copy; 2024 | CEO: Mohit Sinha</div>
  </div>`;
  console.log("[Brevo] sendConfirmationEmail called:", {
    to,
    subject,
    brevoApiKeyExists: !!brevoApiKey,
    sender: process.env.EMAIL_FROM,
  });
  if (brevoApiKey) {
    const SibApiV3Sdk = require("sib-api-v3-sdk");
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = {
      to: [{ email: to, name }],
      sender: {
        email: process.env.EMAIL_FROM || "no-reply@webory.com",
        name: process.env.EMAIL_FROM_NAME || "Webory Team",
      },
      subject,
      htmlContent: html,
    };
    try {
      console.log(
        "[Brevo] Attempting to send email via Brevo API:",
        sendSmtpEmail
      );
      await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log("[Brevo] Email sent via Brevo API");
      return { success: true };
    } catch (error) {
      console.error("[Brevo] Error sending confirmation email:", error);
      throw error;
    }
  } else {
    console.warn("[Brevo] BREVO_API_KEY not set, using fallback sendEmail.");
    await exports.sendEmail({ to, subject, text, html });
  }
};

// Brevo (Sendinblue) setup for transactional emails
const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

const brevoApiKey = process.env.BREVO_API_KEY;
if (brevoApiKey) {
  SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
    brevoApiKey;
}

console.log(
  "BREVO_API_KEY loaded:",
  process.env.BREVO_API_KEY ? "[SET]" : "[NOT SET]"
);
console.log("EMAIL_FROM loaded:", process.env.EMAIL_FROM);

/**
 * Send a verification email with a link
 * @param {Object} opts
 * @param {string} opts.to - Recipient email
 * @param {string} opts.link - Verification link
 * @param {string} [opts.name] - Recipient name (optional)
 */
exports.sendVerificationEmail = async ({ to, link, name = "User" }) => {
  console.log("[Brevo] sendVerificationEmail called:", {
    to,
    link,
    brevoApiKeyExists: !!brevoApiKey,
    sender: process.env.EMAIL_FROM,
  });
  if (!brevoApiKey) {
    console.warn("[Brevo] BREVO_API_KEY not set. Skipping real email send.");
    return exports.sendEmail({
      to,
      subject: "Verify your email address",
      text: `Hi ${name}, please verify your email: ${link}`,
      html: `<p>Hi ${name},</p><p>Please verify your email: <a href='${link}'>Verify Email</a><div style='text-align:center;color:#888;margin-top:24px;font-size:13px;'>Webory Team &copy; 2024 | CEO: Mohit Sinha</div>`,
    });
  }
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = {
    to: [{ email: to, name }],
    sender: {
      email: process.env.EMAIL_FROM || "no-reply@webory.com",
      name: process.env.EMAIL_FROM_NAME || "Webory Team",
    },
    subject: "Verify your email address",
    htmlContent: `<h1>Email Verification</h1><p>Hi ${name},</p><p>Click the link below to verify your email address:</p><a href="${link}">Verify Email</a><div style='text-align:center;color:#888;margin-top:24px;font-size:13px;'>Webory Team &copy; 2024 | CEO: Mohit Sinha</div>`,
  };
  try {
    console.log(
      "[Brevo] Attempting to send verification email via Brevo API:",
      sendSmtpEmail
    );
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("[Brevo] Verification email sent via Brevo API");
    return { success: true };
  } catch (error) {
    console.error("[Brevo] Error sending verification email:", error);
    throw error;
  }
};

// --- SETUP INSTRUCTIONS ---
// Add the following to your .env file after Mailjet verification:
// MJ_APIKEY_PUBLIC=your_mailjet_public_key
// MJ_APIKEY_PRIVATE=your_mailjet_private_key
// EMAIL_FROM=your_verified_sender_email
// EMAIL_FROM_NAME=Webory Team
