const OpenAI = require("openai");
const openai = new OpenAI.default({ apiKey: process.env.OPENAI_API_KEY });

console.log('DEBUG OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

const getBotResponse = async (message) => {
  const userMessage = message.toLowerCase();

  if (userMessage.includes("hello") || userMessage.includes("hi")) {
    return "Hello! How can I help you today? I can answer questions about our services, help you get in touch with support, or provide suggestions.";
  }
  if (userMessage.includes("services")) {
    return "We offer a wide range of services including Web Design, Web Development, App Development, SEO, and MLM solutions. Are you interested in a specific service?";
  }
  if (userMessage.includes("web design")) {
    return "Our Web Design services focus on creating beautiful, user-friendly websites. We can build anything from a simple portfolio to a complex e-commerce site. Would you like to see some of our work?";
  }
  if (userMessage.includes("web development")) {
    return "Our Web Development team builds robust and scalable web applications using the latest technologies. We can help you build custom features, integrate with APIs, and more.";
  }
  if (userMessage.includes("app development")) {
    return "We build native and cross-platform mobile apps for iOS and Android. Let us know your idea, and we can help you bring it to life.";
  }
  if (userMessage.includes("seo")) {
    return "Our SEO services will help you rank higher in search results, driving more organic traffic to your site. We offer keyword research, on-page optimization, and link building.";
  }
  if (userMessage.includes("mlm")) {
    return "We provide custom software solutions for Multi-Level Marketing businesses, including commission tracking, user management, and e-commerce integration.";
  }
  if (
    userMessage.includes("support") ||
    userMessage.includes("help") ||
    userMessage.includes("contact")
  ) {
    return "For support, you can visit our Support page or fill out the contact form on our Contact page. How can I assist you further?";
  }
  if (userMessage.includes("pricing") || userMessage.includes("cost")) {
    return "For pricing details, please get in touch with us through our Contact page, and we will provide you with a custom quote based on your requirements.";
  }
  if (userMessage.includes("thank you") || userMessage.includes("thanks")) {
    return "You're welcome! Is there anything else I can help you with?";
  }
  if (userMessage.includes("suggestion") || userMessage.includes("suggest")) {
    return "Aap apne business ke liye Web Design, SEO, ya App Development jaise services consider kar sakte hain. Agar aapko apne business ke liye personalized suggestion chahiye, toh humein apne business ke baare mein thoda bataiye!";
  }
  if (
    userMessage.includes("app better") ||
    userMessage.includes("website better") ||
    userMessage.includes("app vs website") ||
    (userMessage.includes("app") && userMessage.includes("website"))
  ) {
    return "Yeh aapke business aur target audience par depend karta hai!\n\nAgar aapko wide reach aur easy access chahiye toh website best hai, kyunki koi bhi browser me open kar sakta hai. Lekin agar aapko personalized experience, notifications, ya offline features chahiye toh app banana better hai.\n\nAgar aap chahein toh hum aapke business ke liye best option suggest kar sakte hain!";
  }

  // AI fallback using OpenAI
  if (process.env.OPENAI_API_KEY) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant for a business website. Answer user questions in a friendly and informative way.",
          },
          { role: "user", content: message },
        ],
        max_tokens: 200,
        temperature: 0.7,
      });
      return completion.choices[0].message.content.trim();
    } catch (err) {
      return "Sorry, AI service is temporarily unavailable. Please try again later.";
    }
  }

  // Improved fallback: repeat user's question and offer help
  return `Aapne pucha: '${message}'\nMain abhi is topic par trained nahi hoon, lekin main aapki madad karne ki koshish kar sakta hoon! Agar aapko turant jawab chahiye toh humare Contact page par message karein ya apna sawal thoda aur detail me likhein.`;
};

const initializeChat = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected to chat");

    socket.emit("receiveMessage", {
      text: "Hello! I am WeboryBot. How can I help you today?",
      sender: "bot",
    });

    socket.on("sendMessage", async (message) => {
      console.log("Message received:", message);

      // User message
      socket.emit("receiveMessage", {
        text: message.text,
        sender: "user",
      });

      // Bot response (now async)
      const botResponse = await getBotResponse(message.text);
      setTimeout(() => {
        socket.emit("receiveMessage", {
          text: botResponse,
          sender: "bot",
        });
      }, 1000);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected from chat");
    });
  });
};

module.exports = { initializeChat };
