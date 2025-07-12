// Advanced Webory Chatbot with AI-like features and integrations

const axios = require("axios");
const moment = require("moment");

// Advanced response patterns with AI-like intelligence
class WeboryBot {
  constructor() {
    this.userSessions = new Map();
    this.conversationHistory = new Map();
    this.leadData = new Map();
    this.businessHours = { start: 9, end: 18 }; // 9 AM to 6 PM
    this.supportTickets = new Map();
    this.analytics = {
      totalMessages: 0,
      popularQueries: new Map(),
      conversionRate: 0,
      userSatisfaction: [],
    };
  }

  // Advanced pattern matching with context awareness
  async getBotResponse(message, userId, userContext = {}) {
    const userMessage = message.toLowerCase().trim();
    this.analytics.totalMessages++;

    // Update conversation history
    this.updateConversationHistory(userId, message, "user");

    // Track popular queries
    this.trackPopularQuery(userMessage);

    // Check for business hours
    const businessHoursResponse = this.checkBusinessHours();

    // Sentiment analysis
    const sentiment = this.analyzeSentiment(userMessage);

    // Intent detection
    const intent = this.detectIntent(userMessage);

    // Get contextual response
    const response = await this.getContextualResponse(
      userMessage,
      intent,
      sentiment,
      userContext
    );

    // Update conversation history
    this.updateConversationHistory(userId, response, "bot");

    return {
      text: response,
      intent: intent,
      sentiment: sentiment,
      suggestions: this.getSuggestions(intent),
      businessHours: businessHoursResponse,
      timestamp: new Date().toISOString(),
    };
  }

  // Advanced intent detection
  detectIntent(message) {
    const intents = {
      greeting: [
        "hello",
        "hi",
        "hey",
        "namaste",
        "good morning",
        "good afternoon",
      ],
      services: ["services", "what do you offer", "service list", "offerings"],
      pricing: ["price", "cost", "budget", "quote", "how much", "pricing"],
      webDesign: ["web design", "website design", "ui design", "frontend"],
      webDevelopment: [
        "web development",
        "backend",
        "full stack",
        "programming",
      ],
      appDevelopment: ["app development", "mobile app", "android", "ios"],
      seo: ["seo", "search engine", "google ranking", "optimization"],
      mlm: ["mlm", "network marketing", "multi level"],
      support: ["support", "help", "contact", "issue", "problem"],
      complaint: ["complaint", "issue", "problem", "not working", "bug"],
      consultation: ["consultation", "discuss", "meeting", "call"],
      portfolio: ["portfolio", "work", "examples", "showcase"],
      lead: ["interested", "want to hire", "project", "requirement"],
      goodbye: ["bye", "goodbye", "see you", "exit", "quit"],
      satisfaction: ["satisfied", "happy", "good", "excellent", "poor", "bad"],
    };

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some((keyword) => message.includes(keyword))) {
        return intent;
      }
    }
    return "unknown";
  }

  // Sentiment analysis
  analyzeSentiment(message) {
    const positiveWords = [
      "good",
      "great",
      "excellent",
      "amazing",
      "wonderful",
      "perfect",
      "love",
      "like",
      "happy",
      "satisfied",
    ];
    const negativeWords = [
      "bad",
      "terrible",
      "awful",
      "hate",
      "dislike",
      "angry",
      "frustrated",
      "disappointed",
      "poor",
      "worst",
    ];

    const positiveScore = positiveWords.filter((word) =>
      message.includes(word)
    ).length;
    const negativeScore = negativeWords.filter((word) =>
      message.includes(word)
    ).length;

    if (positiveScore > negativeScore) return "positive";
    if (negativeScore > positiveScore) return "negative";
    return "neutral";
  }

  // Get contextual response based on intent and sentiment
  async getContextualResponse(message, intent, sentiment, userContext) {
    const responses = {
      greeting: this.getGreetingResponse(sentiment),
      services: this.getServicesResponse(),
      pricing: this.getPricingResponse(),
      webDesign: this.getWebDesignResponse(),
      webDevelopment: this.getWebDevelopmentResponse(),
      appDevelopment: this.getAppDevelopmentResponse(),
      seo: this.getSEOResponse(),
      mlm: this.getMLMResponse(),
      support: this.getSupportResponse(),
      complaint: this.getComplaintResponse(),
      consultation: this.getConsultationResponse(),
      portfolio: this.getPortfolioResponse(),
      lead: this.getLeadResponse(),
      goodbye: this.getGoodbyeResponse(),
      satisfaction: this.getSatisfactionResponse(sentiment),
    };

    if (responses[intent]) {
      return responses[intent];
    }

    // Advanced fallback with AI-like suggestions
    return this.getAdvancedFallback(message, userContext);
  }

  // Business hours checker
  checkBusinessHours() {
    const now = new Date();
    const currentHour = now.getHours();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;

    if (isWeekend) {
      return {
        isOpen: false,
        message: "🏢 We're closed on weekends. We'll be back Monday at 9 AM!",
      };
    }

    if (
      currentHour < this.businessHours.start ||
      currentHour >= this.businessHours.end
    ) {
      return {
        isOpen: false,
        message: `🕐 We're currently closed. Business hours: ${this.businessHours.start} AM - ${this.businessHours.end} PM`,
      };
    }

    return { isOpen: true, message: "🟢 We're online now!" };
  }

  // Advanced response methods
  getGreetingResponse(sentiment) {
    const responses = [
      "Hey there! 👋 I'm Sara from Webory! Ready to build something amazing together?",
      "Hello! 🌟 Welcome to Webory! I'm your AI assistant ready to help with your digital needs.",
      "Hi! 🚀 I'm Sara, your smart assistant at Webory. How can I transform your digital presence today?",
    ];

    if (sentiment === "positive") {
      return (
        responses[Math.floor(Math.random() * responses.length)] +
        "\n\n😊 I can sense you're in a great mood! That's perfect for starting a new project!"
      );
    }

    return responses[Math.floor(Math.random() * responses.length)];
  }

  getServicesResponse() {
    return `🚀 **Webory's Complete Digital Solutions:**

🎨 **Web Design & Development**
   • Custom responsive websites
   • E-commerce solutions
   • WordPress & CMS development
   • UI/UX design

📱 **Mobile App Development**
   • iOS & Android native apps
   • Cross-platform solutions
   • Progressive Web Apps (PWA)
   • App store optimization

🔍 **Digital Marketing**
   • Search Engine Optimization (SEO)
   • Pay-Per-Click (PPC) advertising
   • Social media marketing
   • Content marketing

💼 **Business Solutions**
   • MLM software development
   • CRM systems
   • Inventory management
   • Custom business applications

🛠️ **Additional Services**
   • API development & integration
   • Cloud hosting solutions
   • Website maintenance
   • Technical support

**💡 Free Consultation Available!** Which service interests you most?`;
  }

  getPricingResponse() {
    return `💰 **Transparent Pricing Packages:**

🌟 **Starter Package** (₹15,000 - ₹25,000)
   • Basic website (5 pages)
   • Mobile responsive
   • Basic SEO setup
   • 1-year support

🚀 **Professional Package** (₹25,000 - ₹50,000)
   • Advanced website (10+ pages)
   • E-commerce functionality
   • Advanced SEO
   • Content management
   • Analytics integration

💼 **Enterprise Package** (₹50,000+)
   • Custom web application
   • Mobile app development
   • Complete digital marketing
   • Dedicated project manager

📱 **Mobile Apps** (₹50,000 - ₹2,00,000)
   • Depends on complexity
   • iOS & Android
   • Backend development
   • App store submission

🔍 **SEO Services** (₹8,000 - ₹25,000/month)
   • Keyword research
   • On-page optimization
   • Link building
   • Monthly reports

**🎯 Custom quotes available! What's your budget and requirements?**`;
  }

  getWebDesignResponse() {
    return `🎨 **Web Design Excellence:**

✨ **Our Design Philosophy:**
   • User-first approach
   • Mobile-first design
   • Conversion-focused layouts
   • Brand consistency

🎯 **Design Process:**
   1. **Discovery**: Understanding your brand
   2. **Wireframing**: Structure planning
   3. **Design**: Visual creation
   4. **Testing**: User experience validation
   5. **Launch**: Going live

🛠️ **Technologies We Use:**
   • HTML5, CSS3, JavaScript
   • React, Vue.js, Angular
   • WordPress, Shopify
   • Adobe Creative Suite

📊 **Recent Projects:**
   • E-commerce: 300% increase in sales
   • Corporate: 250% more leads
   • Portfolio: 400% more inquiries

**Would you like to see our portfolio or discuss your design needs?**`;
  }

  getWebDevelopmentResponse() {
    return `💻 **Full-Stack Development Services:**

⚡ **Frontend Development:**
   • React.js, Vue.js, Angular
   • Progressive Web Apps (PWA)
   • Single Page Applications (SPA)
   • Responsive frameworks

🔧 **Backend Development:**
   • Node.js, PHP, Python
   • Database design (MySQL, MongoDB)
   • API development & integration
   • Cloud deployment (AWS, Google Cloud)

🛡️ **Security & Performance:**
   • SSL certificates
   • Data encryption
   • Performance optimization
   • Security audits

🔄 **Integration Services:**
   • Payment gateways
   • Third-party APIs
   • CRM integration
   • Analytics tracking

**🚀 Ready to build something powerful? What's your project idea?**`;
  }

  getAppDevelopmentResponse() {
    return `📱 **Mobile App Development:**

🍎 **iOS Development:**
   • Swift & Objective-C
   • Native iOS apps
   • App Store optimization
   • iOS-specific features

🤖 **Android Development:**
   • Kotlin & Java
   • Google Play Store
   • Android-specific features
   • Material Design

🔄 **Cross-Platform:**
   • React Native
   • Flutter
   • Ionic
   • Xamarin

📊 **App Features We Build:**
   • User authentication
   • Push notifications
   • In-app purchases
   • Social media integration
   • Offline functionality
   • Real-time chat

**💡 App Development Process:**
   1. Idea validation
   2. UI/UX design
   3. Development
   4. Testing
   5. App store submission

**Tell me about your app idea! What problem does it solve?**`;
  }

  getSEOResponse() {
    return `🔍 **SEO Services That Drive Results:**

📈 **Our SEO Strategy:**
   • Comprehensive website audit
   • Keyword research & analysis
   • On-page optimization
   • Technical SEO
   • Content optimization
   • Link building
   • Local SEO

📊 **What We Deliver:**
   • Higher search rankings
   • Increased organic traffic
   • Better user experience
   • Improved conversion rates
   • Monthly progress reports

🎯 **SEO Process:**
   1. **Audit**: Current website analysis
   2. **Strategy**: Custom SEO plan
   3. **Implementation**: On-page optimization
   4. **Content**: SEO-friendly content
   5. **Monitoring**: Track & adjust

📈 **Results We've Achieved:**
   • 300% traffic increase (avg)
   • Top 3 rankings in 6 months
   • 250% more leads generated

**🚀 Ready to dominate Google search? What's your target keyword?**`;
  }

  getMLMResponse() {
    return `🌐 **MLM Software Solutions:**

💼 **Complete MLM System:**
   • User registration & management
   • Commission calculation
   • Genealogy tree view
   • Payment integration
   • Real-time reporting

🎯 **MLM Plans We Support:**
   • Binary Plan
   • Matrix Plan
   • Unilevel Plan
   • Hybrid Plans
   • Custom compensation plans

📊 **Key Features:**
   • Multi-language support
   • Multi-currency support
   • Mobile-responsive design
   • Admin dashboard
   • Member dashboard
   • E-wallet integration

🛡️ **Security Features:**
   • Data encryption
   • Secure payment processing
   • Fraud detection
   • Backup & recovery

**🚀 MLM Business Setup:**
   1. Plan consultation
   2. System design
   3. Development
   4. Testing
   5. Launch support

**What type of MLM business are you planning to start?**`;
  }

  getSupportResponse() {
    return `💬 **24/7 Support Available:**

📞 **Contact Options:**
   • Phone: +91-XXX-XXXX-XXX
   • Email: support@webory.com
   • WhatsApp: +91-XXX-XXXX-XXX
   • Live Chat: Right here!

🎫 **Support Ticket System:**
   • Priority support for clients
   • Issue tracking
   • Regular updates
   • Resolution guarantee

⚡ **Quick Support:**
   • Technical issues
   • Website problems
   • Account assistance
   • General inquiries

🕐 **Response Times:**
   • Live Chat: Instant
   • Email: Within 2 hours
   • Phone: Within 1 hour
   • Tickets: Within 4 hours

**What kind of support do you need today?**`;
  }

  getComplaintResponse() {
    return `😔 **We're Sorry to Hear That!**

🎯 **Let's Resolve This:**
   • I'll create a priority support ticket
   • Our team will contact you within 1 hour
   • We'll provide regular updates
   • 100% satisfaction guarantee

📋 **Please Share:**
   • Nature of the issue
   • When it occurred
   • Your contact information
   • Any error messages

🛠️ **Immediate Actions:**
   • Issue escalated to senior team
   • Temporary workarounds if available
   • Regular progress updates
   • Follow-up until resolved

**Your satisfaction is our priority! How can we make this right?**`;
  }

  getConsultationResponse() {
    return `🤝 **Free Consultation Available:**

📅 **Book Your Consultation:**
   • 30-minute strategy session
   • Project analysis
   • Technology recommendations
   • Cost estimation
   • Timeline discussion

💼 **Consultation Process:**
   1. **Discovery**: Your requirements
   2. **Analysis**: Technical feasibility
   3. **Strategy**: Best approach
   4. **Proposal**: Detailed plan
   5. **Q&A**: Address concerns

📞 **Consultation Options:**
   • Video call (Google Meet/Zoom)
   • Phone consultation
   • In-person meeting
   • WhatsApp consultation

🎯 **What We'll Discuss:**
   • Your business goals
   • Target audience
   • Budget & timeline
   • Technical requirements
   • Success metrics

**When would you like to schedule your free consultation?**`;
  }

  getPortfolioResponse() {
    return `🎨 **Our Portfolio Highlights:**

💼 **Recent Success Stories:**

🛒 **E-commerce Projects:**
   • Fashion store: 300% sales increase
   • Electronics: 250% more traffic
   • Food delivery: 10,000+ orders/month

🏢 **Corporate Websites:**
   • Manufacturing: Lead generation up 400%
   • Healthcare: Patient bookings up 200%
   • Education: Enrollment up 150%

📱 **Mobile Apps:**
   • Fitness app: 50,000+ downloads
   • Food delivery: 4.8-star rating
   • Business app: 25,000+ active users

🎯 **Case Studies Available:**
   • Detailed project breakdowns
   • Before/after comparisons
   • Client testimonials
   • Performance metrics

**🌟 View Portfolio:**
   • Website: webory.com/portfolio
   • Behance: behance.net/webory
   • Dribbble: dribbble.com/webory

**Which industry interests you most?**`;
  }

  getLeadResponse() {
    return `🎯 **Great! Let's Get Started:**

📋 **Project Information Needed:**
   • Business type & industry
   • Project requirements
   • Target audience
   • Budget range
   • Timeline expectations

💼 **Next Steps:**
   1. **Brief Discussion**: Your needs
   2. **Proposal**: Detailed plan
   3. **Meeting**: Strategy session
   4. **Contract**: Project agreement
   5. **Kickoff**: Project start

🎁 **Special Offers:**
   • 10% discount for new clients
   • Free consultation worth ₹5,000
   • Free domain & hosting (1 year)
   • 30-day money-back guarantee

📞 **Let's Connect:**
   • Phone: +91-XXX-XXXX-XXX
   • Email: projects@webory.com
   • WhatsApp: Quick discussion

**What's your project about? I'd love to hear more!**`;
  }

  getGoodbyeResponse() {
    return `👋 **Thanks for Visiting Webory!**

🌟 **Before You Go:**
   • Save our contact: +91-XXX-XXXX-XXX
   • Follow us on social media
   • Subscribe to our newsletter
   • Bookmark our website

🎁 **Special Offer:**
   • 10% discount on your first project
   • Free consultation anytime
   • Priority support access

📞 **Stay Connected:**
   • Website: webory.com
   • Instagram: @webory
   • LinkedIn: Webory Solutions
   • Facebook: Webory

**Have a great day! Feel free to come back anytime! 😊**`;
  }

  getSatisfactionResponse(sentiment) {
    if (sentiment === "positive") {
      this.analytics.userSatisfaction.push(5);
      return `🌟 **Thank You for the Feedback!**

😊 We're thrilled you're happy with our service!

🎁 **As a token of appreciation:**
   • 15% discount on next project
   • Free premium support
   • Priority booking

📢 **Help Us Grow:**
   • Leave a Google review
   • Refer friends (get rewards)
   • Share on social media

**Your satisfaction motivates us to do better! 🚀**`;
    } else if (sentiment === "negative") {
      this.analytics.userSatisfaction.push(2);
      return `😔 **We're Sorry to Hear That!**

🎯 **Let's Fix This:**
   • Immediate escalation to management
   • Personal attention to your concerns
   • 100% satisfaction guarantee
   • Compensation if needed

📞 **Priority Contact:**
   • Direct line: +91-XXX-XXXX-XXX
   • Email: complaints@webory.com
   • WhatsApp: Immediate response

**Your feedback helps us improve! We'll make it right! 💪**`;
    }

    return "Thank you for your feedback! It helps us improve our services.";
  }

  // Advanced fallback with AI-like suggestions
  getAdvancedFallback(message, userContext) {
    const suggestions = [
      "💡 Try asking about our services",
      "🔍 Ask for pricing information",
      "📞 Request a consultation",
      "🎨 Ask to see our portfolio",
      "💬 Ask for support",
    ];

    return `🤔 **I'm still learning about:** "${message}"

🧠 **But I can help you with:**
   • Web Design & Development
   • Mobile App Development
   • SEO & Digital Marketing
   • MLM Software Solutions
   • Technical Support

${suggestions.slice(0, 3).join("\n")}

**Or try rephrasing your question! I'm getting smarter every day! 🚀**`;
  }

  // Conversation history management
  updateConversationHistory(userId, message, sender) {
    if (!this.conversationHistory.has(userId)) {
      this.conversationHistory.set(userId, []);
    }

    this.conversationHistory.get(userId).push({
      message,
      sender,
      timestamp: new Date(),
    });

    // Keep only last 50 messages
    const history = this.conversationHistory.get(userId);
    if (history.length > 50) {
      this.conversationHistory.set(userId, history.slice(-50));
    }
  }

  // Track popular queries for analytics
  trackPopularQuery(query) {
    const intent = this.detectIntent(query);
    const count = this.analytics.popularQueries.get(intent) || 0;
    this.analytics.popularQueries.set(intent, count + 1);
  }

  // Get suggestions based on intent
  getSuggestions(intent) {
    const suggestions = {
      services: ["Web Design", "App Development", "SEO Services", "Get Quote"],
      pricing: [
        "Web Design Cost",
        "App Development Cost",
        "SEO Pricing",
        "Custom Quote",
      ],
      support: [
        "Technical Help",
        "Account Issue",
        "General Query",
        "Emergency Support",
      ],
      unknown: [
        "Our Services",
        "Pricing Info",
        "Free Consultation",
        "Portfolio",
      ],
    };

    return suggestions[intent] || suggestions.unknown;
  }

  // Analytics and reporting
  getAnalytics() {
    return {
      totalMessages: this.analytics.totalMessages,
      popularQueries: Object.fromEntries(this.analytics.popularQueries),
      averageSatisfaction:
        this.analytics.userSatisfaction.reduce((a, b) => a + b, 0) /
          this.analytics.userSatisfaction.length || 0,
      activeUsers: this.userSessions.size,
      conversationCount: this.conversationHistory.size,
    };
  }

  // Lead qualification
  qualifyLead(userId, responses) {
    const score = this.calculateLeadScore(responses);
    const qualification = score > 70 ? "hot" : score > 40 ? "warm" : "cold";

    this.leadData.set(userId, {
      score,
      qualification,
      responses,
      timestamp: new Date(),
    });

    return { score, qualification };
  }

  calculateLeadScore(responses) {
    let score = 0;
    if (responses.budget && responses.budget > 25000) score += 30;
    if (responses.timeline && responses.timeline === "urgent") score += 20;
    if (responses.companySize && responses.companySize > 10) score += 25;
    if (responses.authority && responses.authority === "decision-maker")
      score += 25;
    return score;
  }
}

// Initialize the advanced bot
const weboryBot = new WeboryBot();

// Enhanced chat initialization with advanced features
const initializeChat = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔗 New connection: ${socket.id}`);

    // Welcome sequence
    setTimeout(() => {
      socket.emit("receiveMessage", {
        text: "Hey there! 👋 I'm Sara, your smart AI assistant from Webory!",
        sender: "bot",
        timestamp: new Date().toISOString(),
        suggestions: [
          "Our Services",
          "Pricing",
          "Portfolio",
          "Free Consultation",
        ],
      });
    }, 1000);

    setTimeout(() => {
      socket.emit("receiveMessage", {
        text: "I can help you with web design, app development, SEO, and more! What brings you here today? 🚀",
        sender: "bot",
        timestamp: new Date().toISOString(),
      });
    }, 3000);

    // Handle messages with advanced processing
    socket.on("sendMessage", async (message) => {
      try {
        // Echo user message
        socket.emit("receiveMessage", {
          text: message.text,
          sender: "user",
          timestamp: new Date().toISOString(),
        });

        // Show typing indicator
        socket.emit("botTyping", { isTyping: true });

        // Get advanced bot response
        const response = await weboryBot.getBotResponse(
          message.text,
          socket.id
        );

        // Simulate thinking time
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Stop typing indicator
        socket.emit("botTyping", { isTyping: false });

        // Send response
        socket.emit("receiveMessage", {
          text: response.text,
          sender: "bot",
          timestamp: response.timestamp,
          suggestions: response.suggestions,
          intent: response.intent,
          sentiment: response.sentiment,
        });

        // Send business hours info if relevant
        if (!response.businessHours.isOpen) {
          setTimeout(() => {
            socket.emit("receiveMessage", {
              text: response.businessHours.message,
              sender: "bot",
              timestamp: new Date().toISOString(),
              type: "info",
            });
          }, 2000);
        }
      } catch (error) {
        console.error("❌ Error:", error);
        socket.emit("receiveMessage", {
          text: "🤖 Oops! Something went wrong. Let me restart my systems... Please try again!",
          sender: "bot",
          timestamp: new Date().toISOString(),
        });
      }
    });

    // Handle user feedback
    socket.on("userFeedback", (feedback) => {
      console.log("📝 User feedback:", feedback);
      // Store feedback for improvement
    });

    // Handle quick replies
    socket.on("quickReply", async (option) => {
      const response = await weboryBot.getBotResponse(option, socket.id);
      socket.emit("receiveMessage", {
        text: response.text,
        sender: "bot",
        timestamp: response.timestamp,
        suggestions: response.suggestions,
      });
    });

    // Analytics endpoint
    socket.on("getAnalytics", () => {
      if (socket.handshake.query.admin === "true") {
        socket.emit("analytics", weboryBot.getAnalytics());
      }
    });

    socket.on("disconnect", () => {
      console.log(`🔌 User disconnected: ${socket.id}`);
    });
  });
};

// Export advanced bot
module.exports = {
  initializeChat,
  WeboryBot,
  getBotResponse: (message, userId, context) =>
    weboryBot.getBotResponse(message, userId, context),
};
