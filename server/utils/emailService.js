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
 * @param {Object} opts.ticketDetails - Support ticket details (only for Support Ticket forms)
 * @param {string} opts.ticketDetails.ticketNumber - Unique ticket number
 * @param {string} opts.ticketDetails.subject - Ticket subject/title
 * @param {Date} opts.ticketDetails.createdAt - Ticket creation timestamp
 * @param {string} opts.ticketDetails.priority - Ticket priority (Low, Medium, High, Urgent)
 * @param {string} opts.ticketDetails.category - Ticket category
 * @param {string} opts.ticketDetails.description - Ticket description
 */
exports.sendConfirmationEmail = async ({
  to,
  name = "User",
  formType = "Form",
  ticketDetails,
}) => {
 // Enhanced email template for all forms (Registration, Contact, etc.)
let subject = `✨ Thank you for connecting with Webory - ${formType} received!`;

let text = `Dear ${name},

🎉 Welcome to Webory!

Thank you for your ${formType} submission. We're excited to have you as part of our community!

Your details have been safely received and our team will review them carefully. We'll get back to you within 24-48 hours with the next steps.

In the meantime, feel free to explore our website and discover what makes Webory special.

Best regards,
The Webory Team
CEO: Mohit Sinha

---
Need immediate assistance? Reply to this email or visit our support center.`;

let html = `
<div style='font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; margin: 0;'>
  <div style='max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);'>
    
    <!-- Header Section -->
    <div style='background: linear-gradient(135deg, #6C63FF 0%, #9C88FF 100%); padding: 32px 24px; text-align: center; position: relative;'>
      <div style='position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E"); opacity: 0.3;'></div>
      <img src='./public/outputB2.png' alt='Webory Logo' style='height: 56px; filter: brightness(0) invert(1); margin-bottom: 16px; position: relative; z-index: 1;'>
      <h1 style='color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; position: relative; z-index: 1;'>Welcome to Webory! 🎉</h1>
      <p style='color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px; position: relative; z-index: 1;'>Your ${formType} has been received</p>
    </div>
    
    <!-- Main Content -->
    <div style='padding: 40px 32px;'>
      <div style='text-align: center; margin-bottom: 32px;'>
        <div style='width: 80px; height: 80px; background: linear-gradient(135deg, #6C63FF, #9C88FF); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;'>
          <span style='font-size: 36px; color: white;'> ✓ </span>
        </div>
        <h2 style='color: #2D3748; margin: 0 0 8px 0; font-size: 24px; font-weight: 600;'>Thank You, ${name}!</h2>
        <p style='color: #718096; margin: 0; font-size: 16px;'>We're thrilled to have you join our community</p>
      </div>
      
      <!-- Information Card -->
      <div style='background: #F7FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin-bottom: 32px;'>
        <h3 style='color: #2D3748; margin: 0 0 16px 0; font-size: 18px; font-weight: 600; display: flex; align-items: center;'>
          <span style='width: 24px; height: 24px; background: #6C63FF; border-radius: 50%; color: white; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px;'> i </span>
          What happens next?
        </h3>
        <div style='color: #4A5568; line-height: 1.6;'>
          <p style='margin: 0 0 12px 0;'>📋 <strong>Review Process:</strong> Our team will carefully review your ${formType} submission</p>
          <p style='margin: 0 0 12px 0;'>⏰ <strong>Response Time:</strong> You'll hear back from us within 24-48 hours</p>
          <p style='margin: 0;'>🚀 <strong>Next Steps:</strong> We'll guide you through the process and answer any questions</p>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div style='text-align: center; margin-bottom: 32px;'>
        <a href='https://webory.netlify.app' style='display: inline-block; background: linear-gradient(135deg, #6C63FF, #9C88FF); color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin: 0 8px 8px 0; box-shadow: 0 4px 12px rgba(108,99,255,0.3);'>
          Explore Webory
        </a>
        <a href='https://webory.netlify.app/contact' style='display: inline-block; background: transparent; color: #6C63FF; text-decoration: none; padding: 14px 28px; border: 2px solid #6C63FF; border-radius: 8px; font-weight: 600; margin: 0 8px 8px 0;'>
          Contact Support
        </a>
      </div>
      
      <!-- Quote/Inspiration -->
      <div style='background: linear-gradient(135deg, #6C63FF10, #9C88FF10); border-left: 4px solid #6C63FF; padding: 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;'>
        <p style='color: #4A5568; font-style: italic; margin: 0; font-size: 16px; line-height: 1.5;'>
          "Innovation distinguishes between a leader and a follower. At Webory, we're building the future of web solutions together."
        </p>
      </div>
      
      <!-- Personal Touch -->
      <div style='color: #4A5568; line-height: 1.6;'>
        <p style='margin: 0 0 16px 0;'>We appreciate you choosing Webory for your web development needs. Our commitment is to deliver exceptional solutions that exceed your expectations.</p>
        <p style='margin: 0;'>If you have any immediate questions or concerns, don't hesitate to reach out to us.</p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style='background: #F7FAFC; padding: 24px 32px; border-top: 1px solid #E2E8F0;'>
      <div style='text-align: center;'>
        <p style='color: #2D3748; margin: 0 0 12px 0; font-weight: 600; font-size: 16px;'>Stay Connected</p>
        <div style='margin-bottom: 16px;'>
          <a href='https://webory.netlify.app' style='display: inline-block; margin: 0 8px; color: #6C63FF; text-decoration: none; font-size: 14px;'>Website</a>
          <span style='color: #CBD5E0;'>•</span>
          <a href='https://www.linkedin.com/in/webory-info-35a257372?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' style='display: inline-block; margin: 0 8px; color: #6C63FF; text-decoration: none; font-size: 14px;'>LinkedIn</a>
          <span style='color: #CBD5E0;'>•</span>
          <a href='https://x.com/Weboryinfo?t=-00bwPiELtq_XS_WvZZl2w&s=08' style='display: inline-block; margin: 0 8px; color: #6C63FF; text-decoration: none; font-size: 14px;'>Twitter</a>
        </div>
        <div style='color: #718096; font-size: 13px; line-height: 1.4;'>
          <strong style='color: #2D3748;'>Webory</strong> - Crafting Digital Excellence<br>
          CEO: Mohit Sinha | © 2025 All rights reserved<br>
          <span style='font-size: 12px;'>This email was sent because you submitted a ${formType} on our website.</span>
        </div>
      </div>
    </div>
    
  </div>
  
  <!-- Mobile Responsiveness -->
  <style>
    @media only screen and (max-width: 600px) {
      .email-container {
        margin: 10px !important;
      }
      .header-content h1 {
        font-size: 24px !important;
      }
      .content-padding {
        padding: 24px 20px !important;
      }
      .action-buttons a {
        display: block !important;
        margin: 8px 0 !important;
      }
    }
  </style>
</div>`;

// Alternative shorter version for quick communications
let simpleHTML = `
<div style='font-family: "Segoe UI", sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;'>
  <div style='background: linear-gradient(135deg, #6C63FF, #9C88FF); padding: 32px 24px; text-align: center; color: white;'>
    <img src='./public/outputB2.png' alt='Webory Logo' style='height: 48px; filter: brightness(0) invert(1); margin-bottom: 16px;'>
    <h1 style='margin: 0; font-size: 24px; font-weight: 700;'>Thank You! 🎉</h1>
  </div>
  
  <div style='padding: 32px 24px;'>
    <h2 style='color: #2D3748; margin: 0 0 16px 0;'>Hello ${name},</h2>
    <p style='color: #4A5568; line-height: 1.6; margin: 0 0 16px 0;'>
      Thank you for your <strong>${formType}</strong> submission! We've received your information and our team will review it carefully.
    </p>
    <p style='color: #4A5568; line-height: 1.6; margin: 0 0 24px 0;'>
      We'll get back to you within 24-48 hours. In the meantime, feel free to explore our services.
    </p>
    
    <div style='text-align: center; margin: 32px 0;'>
      <a href='#' style='background: #6C63FF; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; display: inline-block;'>
        Visit Webory
      </a>
    </div>
  </div>
  
  <div style='background: #F7FAFC; padding: 20px 24px; text-align: center; color: #718096; font-size: 14px;'>
    <strong>Webory</strong> | CEO: Mohit Sinha<br>
    © 2025 - Crafting Digital Excellence
  </div>
</div>`;

// Usage example:
// Use 'html' for detailed emails, 'simpleHTML' for quick confirmations
  // Enhanced Support Ticket Email Template (ONLY for Support Tickets)
  if (formType === "Support Ticket" && ticketDetails) {
    const currentDate = new Date();
    const createdDate = new Date(ticketDetails.createdAt || currentDate);
    const formattedDate = createdDate.toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
       timeZone: 'Asia/Kolkata'
    });

    // Generate ticket number if not provided
    const ticketNumber =
      ticketDetails.ticketNumber ||
      `WEB-${currentDate.getFullYear()}-${String(Date.now()).slice(-6)}`;

    // Priority color mapping
    const priorityColors = {
      Low: "#28a745",
      Medium: "#ffc107",
      High: "#fd7e14",
      Urgent: "#dc3545",
    };

    const priorityColor = priorityColors[ticketDetails.priority] || "#6C63FF";

    subject = `✅ Support Ticket Created - #${ticketNumber} | ${ticketDetails.subject}`;

    text = `Dear ${name},

Your support ticket has been successfully created on Webory!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎫 TICKET DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ticket Number: #${ticketNumber}
Subject: ${ticketDetails.subject}
Priority: ${ticketDetails.priority || "Medium"}
Category: ${ticketDetails.category || "General"}
Created: ${formattedDate}

Description:
${ticketDetails.description || "No description provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 WHAT'S NEXT?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Our support team will review your ticket within 24 hours
• You will receive updates via email as we work on your request
• Please reference ticket #${ticketNumber} in any follow-up communication
• Response time varies based on priority level

For urgent matters, you can also reach us at:
📧 weboryinfo@gmail.com
📱 +91-94734-71153

Thank you for choosing Webory!

Best regards,
Webory Support Team
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    html = `<div style='font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: auto; background: #f8fafc; padding: 20px;'>
      
      <!-- Header -->
      <div style='background: linear-gradient(135deg, #6C63FF 0%, #5a52d5 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0; margin-bottom: 0;'>
        <div style='margin-bottom: 15px;'>
          <img src='/outputB2.png' alt='Webory Logo' style='height: 40px; filter: brightness(0) invert(1);'>
        </div>
        <h1 style='margin: 0; font-size: 28px; font-weight: 600;'>✅ Ticket Created Successfully</h1>
        <p style='margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;'>Your request has been received and assigned a ticket number</p>
      </div>
      
      <!-- Main Content -->
      <div style='background: white; padding: 0; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);'>
        
        <!-- Greeting -->
        <div style='padding: 30px 30px 20px 30px;'>
          <p style='margin: 0 0 20px 0; font-size: 18px; color: #2d3748;'>नमस्ते ${name},</p>
          <p style='margin: 0 0 25px 0; color: #4a5568; font-size: 16px;'>Your support ticket has been successfully created on Webory. Our team has been notified and will begin working on your request.</p>
        </div>
        
        <!-- Ticket Number Highlight -->
        <div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0 30px; padding: 25px; border-radius: 10px; text-align: center; margin-bottom: 30px;'>
          <p style='margin: 0 0 8px 0; color: white; font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px;'>Your Ticket Number</p>
          <p style='margin: 0; color: white; font-size: 32px; font-weight: bold; letter-spacing: 3px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);'>#${ticketNumber}</p>
          <p style='margin: 8px 0 0 0; color: white; font-size: 12px; opacity: 0.8;'>Please save this number for future reference</p>
        </div>
        
        <!-- Ticket Details -->
        <div style='margin: 0 30px 30px 30px;'>
          <h3 style='color: #2d3748; font-size: 20px; margin: 0 0 20px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;'>📋 Ticket Details</h3>
          
          <div style='background: #f7fafc; border-radius: 8px; padding: 20px; border-left: 4px solid #6C63FF;'>
            <table style='width: 100%; border-collapse: collapse;'>
              <tr>
                <td style='padding: 8px 12px 8px 0; font-weight: 600; color: #4a5568; width: 120px; vertical-align: top;'>Subject:</td>
                <td style='padding: 8px 0; color: #2d3748;'>${
                  ticketDetails.subject
                }</td>
              </tr>
              <tr>
                <td style='padding: 8px 12px 8px 0; font-weight: 600; color: #4a5568; vertical-align: top;'>Priority:</td>
                <td style='padding: 8px 0;'>
                  <span style='background: ${priorityColor}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase;'>${
      ticketDetails.priority || "Medium"
    }</span>
                </td>
              </tr>
              ${
                ticketDetails.category
                  ? `
              <tr>
                <td style='padding: 8px 12px 8px 0; font-weight: 600; color: #4a5568; vertical-align: top;'>Category:</td>
                <td style='padding: 8px 0; color: #2d3748;'>${ticketDetails.category}</td>
              </tr>
              `
                  : ""
              }
              <tr>
                <td style='padding: 8px 12px 8px 0; font-weight: 600; color: #4a5568; vertical-align: top;'>Created:</td>
                <td style='padding: 8px 0; color: #2d3748;'>📅 ${formattedDate}</td>
              </tr>
            </table>
          </div>
          
          ${
            ticketDetails.description
              ? `
          <div style='margin-top: 20px;'>
            <h4 style='color: #4a5568; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;'>Your Message:</h4>
            <div style='background: #edf2f7; padding: 15px; border-radius: 6px; border-left: 3px solid #6C63FF; font-style: italic; color: #2d3748;'>
              "${ticketDetails.description}"
            </div>
          </div>
          `
              : ""
          }
        </div>
        
        <!-- What's Next Section -->
        <div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0 30px 30px 30px; padding: 25px; border-radius: 10px; color: white;'>
          <h3 style='margin: 0 0 15px 0; font-size: 18px; color: white;'>🚀 What happens next?</h3>
          <ul style='margin: 0; padding-left: 20px; line-height: 1.8;'>
            <li>Our support team will review your ticket within <strong>24 hours</strong></li>
            <li>You'll receive email updates as we work on your request</li>
            <li>Reference ticket <strong>#${ticketNumber}</strong> in any follow-up communication</li>
            <li>Response time varies based on priority level</li>
          </ul>
        </div>
        
        <!-- Contact Info -->
        <div style='background: #f7fafc; margin: 0 30px; padding: 20px; border-radius: 8px; text-align: center; border: 1px dashed #cbd5e0;'>
          <p style='margin: 0 0 10px 0; color: #4a5568; font-weight: 600;'>Need immediate assistance?</p>
          <p style='margin: 0; color: #6C63FF;'>
            📧 <a href='mailto:weboryinfo@gmail.com' style='color: #6C63FF; text-decoration: none;'>weboryinfo@gmail.com</a> | 
            📱 +91-94734-71153
          </p>
        </div>
        
        <!-- Footer -->
        <div style='text-align: center; padding: 25px 30px; color: #718096; font-size: 13px; border-top: 1px solid #e2e8f0; margin-top: 30px;'>
          <p style='margin: 0;'>
            <strong>Webory Team</strong> &copy; ${new Date().getFullYear()} | 
            <span style='color: #6C63FF;'>CEO: Mohit Sinha</span>
          </p>
          <p style='margin: 8px 0 0 0; font-size: 11px; opacity: 0.8;'>
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
        
      </div>
    </div>`;
  }

  console.log("[Brevo] sendConfirmationEmail called:", {
    to,
    subject,
    formType,
    ticketNumber: ticketDetails?.ticketNumber,
    brevoApiKeyExists: !!brevoApiKey,
    sender: process.env.EMAIL_FROM,
  });

  if (brevoApiKey) {
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
      html: `<div style='font-family:sans-serif;background:#f9f9f9;padding:24px;border-radius:12px;max-width:600px;margin:auto;'>
        <div style='text-align:center;margin-bottom:24px;'>
          <img src='/outputB2.png' alt='Webory Logo' style='height:48px;'>
        </div>
        <div style='background:#fff;padding:24px;border-radius:8px;'>
          <h2 style='color:#6C63FF;'>Email Verification</h2>
          <p style='color:#333;'>Hi ${name},</p>
          <p style='color:#333;'>Please click the link below to verify your email address:</p>
          <div style='text-align:center;margin:20px 0;'>
            <a href='${link}' style='background:#6C63FF;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;font-weight:600;'>Verify Email</a>
          </div>
        </div>
        <div style='text-align:center;color:#888;margin-top:24px;font-size:13px;'>Webory Team &copy; 2024 | CEO: Mohit Sinha</div>
      </div>`,
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
    htmlContent: `<div style='font-family:sans-serif;background:#f9f9f9;padding:24px;border-radius:12px;max-width:600px;margin:auto;'>
      <div style='text-align:center;margin-bottom:24px;'>
        <img src='/outputB2.png' alt='Webory Logo' style='height:48px;'>
      </div>
      <div style='background:#fff;padding:24px;border-radius:8px;'>
        <h2 style='color:#6C63FF;'>Email Verification</h2>
        <p style='color:#333;'>Hi ${name},</p>
        <p style='color:#333;'>Please click the link below to verify your email address:</p>
        <div style='text-align:center;margin:20px 0;'>
          <a href='${link}' style='background:#6C63FF;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;font-weight:600;'>Verify Email</a>
        </div>
      </div>
      <div style='text-align:center;color:#888;margin-top:24px;font-size:13px;'>Webory Team &copy; 2024 | CEO: Mohit Sinha</div>
    </div>`,
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

/**
 * Send support ticket status update email
 * @param {Object} opts
 * @param {string} opts.to - Recipient email
 * @param {string} opts.name - Recipient name
 * @param {Object} opts.ticketDetails - Ticket details
 * @param {string} opts.ticketDetails.ticketNumber - Ticket number
 * @param {string} opts.ticketDetails.subject - Ticket subject
 * @param {string} opts.status - New status (In Progress, Resolved, Closed)
 * @param {string} opts.message - Update message from support team
 */
exports.sendTicketUpdateEmail = async ({
  to,
  name = "User",
  ticketDetails,
  status,
  message,
}) => {
  const statusColors = {
    "In Progress": "#ffc107",
    Resolved: "#28a745",
    Closed: "#6c757d",
    Pending: "#fd7e14",
  };

  const statusColor = statusColors[status] || "#6C63FF";
  const statusEmoji = {
    "In Progress": "🔄",
    Resolved: "✅",
    Closed: "📁",
    Pending: "⏳",
  };

  const subject = `${statusEmoji[status] || "📝"} Ticket Update - #${
    ticketDetails.ticketNumber
  } | ${status}`;

  const html = `<div style='font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: auto; background: #f8fafc; padding: 20px;'>
    
    <!-- Header -->
    <div style='background: linear-gradient(135deg, ${statusColor} 0%, ${statusColor}dd 100%); color: white; padding: 25px 20px; text-align: center; border-radius: 12px 12px 0 0;'>
      <div style='margin-bottom: 15px;'>
        <img src='/outputB2.png' alt='Webory Logo' style='height: 40px; filter: brightness(0) invert(1);'>
      </div>
      <h1 style='margin: 0; font-size: 26px; font-weight: 600;'>${
        statusEmoji[status] || "📝"
      } Ticket Update</h1>
      <p style='margin: 8px 0 0 0; opacity: 0.9;'>Status: ${status}</p>
    </div>
    
    <!-- Content -->
    <div style='background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);'>
      <p style='margin: 0 0 20px 0; font-size: 16px;'>Dear ${name},</p>
      
      <!-- Ticket Info -->
      <div style='background: #f7fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid ${statusColor};'>
        <h3 style='margin: 0 0 15px 0; color: #2d3748;'>Ticket #${
          ticketDetails.ticketNumber
        }</h3>
        <p style='margin: 0 0 8px 0; color: #4a5568;'><strong>Subject:</strong> ${
          ticketDetails.subject
        }</p>
        <p style='margin: 0; color: #4a5568;'><strong>Status:</strong> 
          <span style='background: ${statusColor}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;'>${status}</span>
        </p>
      </div>
      
      <!-- Update Message -->
      ${
        message
          ? `
      <div style='background: #e6fffa; padding: 20px; border-radius: 8px; border-left: 4px solid #38b2ac; margin-bottom: 25px;'>
        <h4 style='margin: 0 0 10px 0; color: #2d3748;'>💬 Update from our team:</h4>
        <p style='margin: 0; color: #2d3748; font-style: italic;'>"${message}"</p>
      </div>
      `
          : ""
      }
      
      <p style='margin: 0 0 20px 0; color: #4a5568;'>For any questions regarding this ticket, please reference ticket number <strong>#${
        ticketDetails.ticketNumber
      }</strong> in your communication.</p>
      
      <!-- Contact -->
      <div style='text-align: center; padding: 20px; background: #f1f5f9; border-radius: 8px; margin-top: 25px;'>
        <p style='margin: 0 0 8px 0; color: #4a5568; font-weight: 600;'>Need further assistance?</p>
        <p style='margin: 0; color: #6C63FF;'>
          📧 <a href='mailto:weboryinfo@gmail.com' style='color: #6C63FF; text-decoration: none;'>weboryinfo@gmail.com</a>
        </p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style='text-align: center; padding: 20px; color: #718096; font-size: 13px;'>
      <p style='margin: 0;'>
        <strong>Webory Support Team</strong> &copy; ${new Date().getFullYear()} | 
        <span style='color: #6C63FF;'>CEO: Mohit Sinha</span>
      </p>
    </div>
    
  </div>`;

  if (brevoApiKey) {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = {
      to: [{ email: to, name }],
      sender: {
        email: process.env.EMAIL_FROM || "no-reply@webory.com",
        name: process.env.EMAIL_FROM_NAME || "Webory Support Team",
      },
      subject,
      htmlContent: html,
    };
    try {
      await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log("[Brevo] Ticket update email sent via Brevo API");
      return { success: true };
    } catch (error) {
      console.error("[Brevo] Error sending ticket update email:", error);
      throw error;
    }
  } else {
    console.warn("[Brevo] BREVO_API_KEY not set, using fallback sendEmail.");
    await exports.sendEmail({
      to,
      subject,
      text: `Ticket #${ticketDetails.ticketNumber} status updated to: ${status}. ${message}`,
      html,
    });
  }
};
