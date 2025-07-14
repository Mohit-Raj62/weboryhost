// server/openaiProxy.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
        max_tokens: 200,
      },
      {
        headers: {
          Authorization: `Bearer sk-proj-fSeLWNW`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "OpenAI API error", details: error.message });
  }
});

module.exports = router;
