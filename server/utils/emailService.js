const mailjet = require("node-mailjet").apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);
import { neon } from "@netlify/neon";

// Initialize the database client
const sql = neon();

// Example function to get a post by ID
async function getPostById(postId) {
  try {
    const [post] = await sql`SELECT * FROM posts WHERE id = ${postId}`;
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

// Example function to get all posts
async function getAllPosts() {
  try {
    const posts = await sql`SELECT * FROM posts ORDER BY created_at DESC`;
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

// Send email using Mailjet
exports.sendEmail = async ({ email, subject, message }) => {
  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.EMAIL_FROM,
            Name: process.env.EMAIL_FROM_NAME,
          },
          To: [
            {
              Email: email,
            },
          ],
          Subject: subject,
          TextPart: message,
          HTMLPart: message.replace(/\n/g, "<br>"),
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
