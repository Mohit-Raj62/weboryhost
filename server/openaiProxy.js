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
          Authorization: `Bearer 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`,
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
