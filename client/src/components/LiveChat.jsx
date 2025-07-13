import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { API_BASE_URL } from '../config/api';
import dayjs from 'dayjs';

// 🚀 SARA - NEXT-GEN AI ASSISTANT WITH ADVANCED FEATURES 2025 🚀

// 🚀 ENHANCED SARA AI - IMPROVED QUESTION HANDLING SYSTEM 2025 🚀

class EnhancedSaraAI {
    constructor() {
        this.userName = null;
        this.userPreferences = {};
        this.conversationHistory = [];
        this.currentMood = 'friendly';
        this.contextMemory = new Map();
        this.responseCount = 0;
        this.userLocation = null;
        this.lastInteraction = null;
        this.language = 'en'; // 'en' for English, 'hi' for Hinglish
        
        // Enhanced personality traits
        this.personality = {
            empathy: 0.8,
            humor: 0.7,
            professionalism: 0.9,
            creativity: 0.8
        };
        
        // Improved learning patterns
        this.userPatterns = {
            preferredTimeOfDay: null,
            commonQuestions: [],
            interests: [],
            communication_style: 'casual'
        };

        // Enhanced knowledge base
        this.knowledgeBase = {
            services: {
                'web development': {
                    description: 'Custom websites, web apps, and responsive designs',
                    pricing: '₹15,000 - ₹1,50,000',
                    timeline: '1-8 weeks',
                    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB']
                },
                'ui/ux design': {
                    description: 'User interface and experience design',
                    pricing: '₹10,000 - ₹80,000',
                    timeline: '1-4 weeks',
                    technologies: ['Figma', 'Adobe XD', 'Sketch']
                },
                'digital marketing': {
                    description: 'SEO, social media, PPC campaigns',
                    pricing: '₹20,000 - ₹1,00,000/month',
                    timeline: '2-6 months',
                    technologies: ['Google Ads', 'Facebook Ads', 'Analytics']
                },
                'e-commerce': {
                    description: 'Online stores and shopping platforms',
                    pricing: '₹25,000 - ₹2,00,000',
                    timeline: '2-10 weeks',
                    technologies: ['Shopify', 'WooCommerce', 'Magento']
                }
            },
            company: {
                founded: '2020',
                team_size: '15+ professionals',
                projects_completed: '500+',
                clients: '200+',
                rating: '4.9/5',
                office_location: 'India',
                work_model: 'Remote-first'
            },
            contact: {
                whatsapp: '+91-94704-89367',
                email: 'weboryinfo@gmail.com',
                instagram: '@webory_official',
                linkedin: 'webory-digital',
                website: 'webory.in'
            }
        };
    }

    // 🧠 ENHANCED CONTEXT UNDERSTANDING
    analyzeContext(message) {
        const context = {
            sentiment: this.analyzeSentiment(message),
            intent: this.detectIntent(message),
            urgency: this.detectUrgency(message),
            complexity: this.assessComplexity(message),
            personalInfo: this.extractPersonalInfo(message),
            questionType: this.detectQuestionType(message),
            keywords: this.extractKeywords(message),
            topic: this.identifyTopic(message)
        };
        return context;
    }

    // 🎭 SENTIMENT ANALYSIS
    analyzeSentiment(message) {
        const positiveWords = ['good', 'great', 'awesome', 'love', 'excellent', 'amazing', 'fantastic', 'happy', 'pleased'];
        const negativeWords = ['bad', 'terrible', 'hate', 'awful', 'disappointed', 'frustrated', 'angry', 'sad', 'upset'];
        
        const positive = positiveWords.filter(word => message.toLowerCase().includes(word)).length;
        const negative = negativeWords.filter(word => message.toLowerCase().includes(word)).length;
        
        if (positive > negative) return 'positive';
        if (negative > positive) return 'negative';
        return 'neutral';
    }

    // 🎯 ENHANCED INTENT DETECTION
    detectIntent(message) {
        const intents = {
            'pricing': /\b(price|cost|rate|budget|expensive|cheap|affordable|quote|charges|fee|payment)\b/i,
            'support': /\b(help|support|problem|issue|fix|error|bug|not working|broken)\b/i,
            'information': /\b(what|how|when|where|why|tell me|explain|describe|details|about)\b/i,
            'booking': /\b(book|schedule|appointment|meet|call|demo|consultation|meeting)\b/i,
            'complaint': /\b(complaint|complain|dissatisfied|unhappy|refund|cancel|disappointed)\b/i,
            'praise': /\b(great|excellent|amazing|love|fantastic|awesome|wonderful|perfect)\b/i,
            'comparison': /\b(vs|versus|compare|difference|better|best|which|between)\b/i,
            'timeline': /\b(time|duration|timeline|deadline|delivery|when|how long|complete)\b/i,
            'technology': /\b(tech|technology|stack|framework|language|tool|software)\b/i,
            'portfolio': /\b(work|portfolio|example|project|showcase|previous|sample)\b/i
        };
        
        for (let intent in intents) {
            if (intents[intent].test(message)) return intent;
        }
        return 'general';
    }

    // ⚡ URGENCY DETECTION
    detectUrgency(message) {
        const urgentWords = ['urgent', 'asap', 'emergency', 'quickly', 'immediate', 'now', 'today'];
        return urgentWords.some(word => message.toLowerCase().includes(word)) ? 'high' : 'normal';
    }

    // 🔍 COMPLEXITY ASSESSMENT
    assessComplexity(message) {
        if (message.length > 200) return 'high';
        if (message.split(' ').length > 20) return 'medium';
        return 'low';
    }

    // 👤 PERSONAL INFO EXTRACTION
    extractPersonalInfo(message) {
        const info = {};
        
        // Name detection
        const nameMatch = message.match(/my name is (\w+)|i'm (\w+)|i am (\w+)/i);
        if (nameMatch) {
            info.name = nameMatch[1] || nameMatch[2] || nameMatch[3];
        }
        
        // Email detection
        const emailMatch = message.match(/[\w.-]+@[\w.-]+\.\w+/);
        if (emailMatch) {
            info.email = emailMatch[0];
        }
        
        // Phone detection
        const phoneMatch = message.match(/\d{10}|\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/);
        if (phoneMatch) {
            info.phone = phoneMatch[0];
        }
        
        return info;
    }

    // ❓ QUESTION TYPE DETECTION
    detectQuestionType(message) {
        const questionTypes = {
            'what': /\bwhat\b/i,
            'how': /\bhow\b/i,
            'when': /\bwhen\b/i,
            'where': /\bwhere\b/i,
            'why': /\bwhy\b/i,
            'who': /\bwho\b/i,
            'which': /\bwhich\b/i,
            'can': /\bcan\b/i,
            'do': /\bdo\b/i,
            'is': /\bis\b/i,
            'are': /\bare\b/i
        };
        
        for (let type in questionTypes) {
            if (questionTypes[type].test(message)) return type;
        }
        return 'statement';
    }

    // 🔍 KEYWORD EXTRACTION
    extractKeywords(message) {
        const keywords = [];
        const serviceKeywords = ['website', 'web', 'app', 'design', 'marketing', 'seo', 'ecommerce', 'e-commerce', 'ai', 'chatbot'];
        const techKeywords = ['react', 'node', 'javascript', 'python', 'php', 'wordpress', 'shopify'];
        
        serviceKeywords.forEach(keyword => {
            if (message.toLowerCase().includes(keyword)) {
                keywords.push(keyword);
            }
        });
        
        techKeywords.forEach(keyword => {
            if (message.toLowerCase().includes(keyword)) {
                keywords.push(keyword);
            }
        });
        
        return keywords;
    }

    // 📚 TOPIC IDENTIFICATION
    identifyTopic(message) {
        const topics = {
            'services': /\b(service|offer|solution|product|what do you do|provide)\b/i,
            'pricing': /\b(price|cost|rate|budget|expensive|cheap|affordable)\b/i,
            'company': /\b(about|company|webory|story|team|founded|history)\b/i,
            'contact': /\b(contact|email|phone|whatsapp|reach|connect)\b/i,
            'technology': /\b(technology|tech|stack|framework|language|tool)\b/i,
            'portfolio': /\b(portfolio|work|example|project|showcase)\b/i,
            'process': /\b(process|how|work|methodology|approach|steps)\b/i,
            'timeline': /\b(time|duration|timeline|deadline|delivery|when)\b/i,
            'career': /\b(job|career|hiring|work|employment|vacancy)\b/i
        };
        
        for (let topic in topics) {
            if (topics[topic].test(message)) return topic;
        }
        return 'general';
    }

    // 🎨 ENHANCED RESPONSE GENERATION
    generateResponse(message) {
        // Detect language
        const lang = this.detectLanguage(message);
        this.language = lang;
        const context = this.analyzeContext(message);
        
        // Get base response using enhanced logic
        let response = this.getEnhancedResponse(message, context);
        
        // Add personality and context
        response = this.addPersonality(response, context);
        
        // Add relevant follow-up questions
        response = this.addFollowUpQuestions(response, context);
        
        // Translate response if needed
        response = this.translateResponse(response, lang);
        
        // Store conversation history
        this.conversationHistory.push({
            user: message,
            sara: response,
            context: context,
            timestamp: new Date().toISOString()
        });
        
        this.responseCount++;
        this.lastInteraction = new Date();
        
        return response;
    }

    // 🚀 ENHANCED RESPONSE SYSTEM
    getEnhancedResponse(message, context) {
        const msg = message.toLowerCase();
        // Handle greetings
        if (this.isGreeting(msg)) {
            return this.getGreetingResponse();
        }
        // Direct response for pricing intent
        if (context.intent === 'pricing') {
            return this.getPricingResponse(context, true); // force show pricing
        }
        // Direct response for complaint intent
        if (context.intent === 'complaint') {
            return this.getComplaintResponse(context);
        }
        // Handle specific questions based on intent and topic
        switch (context.intent) {
            case 'information':
                return this.getInformationResponse(context);
            case 'support':
                return this.getSupportResponse(context);
            case 'booking':
                return this.getBookingResponse();
            case 'comparison':
                return this.getComparisonResponse();
            case 'timeline':
                return this.getTimelineResponse(context);
            case 'technology':
                return this.getTechnologyResponse();
            case 'portfolio':
                return this.getPortfolioResponse();
            default:
                return this.getTopicBasedResponse(context);
        }
    }

    // 👋 GREETING DETECTION
    isGreeting(msg) {
        return /\b(hi|hello|hey|namaste|good morning|good afternoon|good evening|hola|bonjour)\b/.test(msg);
    }

    // 🌟 GREETING RESPONSE
    getGreetingResponse() {
        const timeBasedGreeting = this.getTimeBasedGreeting();
        const personalTouch = this.userName ? ` ${this.userName}` : '';
        return `${timeBasedGreeting}${personalTouch}! I'm Sara from Webory! 🌟 Ready to bring your digital dreams to life? What can I help you with today?`;
    }

    // 💰 PRICING RESPONSE
    getPricingResponse(context, alwaysShowAll) {
        const keywords = context.keywords;
        let response = "Great question about pricing! 💰 Here's what we offer:\n\n";
        let added = false;
        if (keywords.includes('website') || keywords.includes('web')) {
            response += "🌐 **Website Development**: ₹15,000 - ₹1,50,000\n";
            added = true;
        }
        if (keywords.includes('design')) {
            response += "🎨 **UI/UX Design**: ₹10,000 - ₹80,000\n";
            added = true;
        }
        if (keywords.includes('marketing') || keywords.includes('seo')) {
            response += "📈 **Digital Marketing**: ₹20,000 - ₹1,00,000/month\n";
            added = true;
        }
        if (keywords.includes('ecommerce') || keywords.includes('e-commerce')) {
            response += "🛒 **E-commerce**: ₹25,000 - ₹2,00,000\n";
            added = true;
        }
        if (!added || alwaysShowAll) {
            response += "🌐 **Websites**: ₹15,000 - ₹1,50,000\n";
            response += "🎨 **UI/UX Design**: ₹10,000 - ₹80,000\n";
            response += "📈 **Digital Marketing**: ₹20,000 - ₹1,00,000/month\n";
            response += "🛒 **E-commerce**: ₹25,000 - ₹2,00,000\n";
        }
        response += "\n✨ **Free consultation available!** Prices vary based on requirements. Want a custom quote?";
        return response;
    }

    // 😔 COMPLAINT RESPONSE
    getComplaintResponse(context) {
        // Empathetic, ask for details
        return "I'm really sorry for the trouble! 😔\n\nPlease share your issue in detail so I can help you quickly.\n• Kya problem aa rahi hai?\n• Kis feature mein dikkat hai?\n• Agar screenshot hai to bhej sakte hain.\n\nAapka feedback hamare liye important hai!";
    }

    // 📚 INFORMATION RESPONSE
    getInformationResponse(context) {
        const topic = context.topic;
        
        switch (topic) {
            case 'services':
                return this.getServicesInfo();
            case 'company':
                return this.getCompanyInfo();
            case 'contact':
                return this.getContactInfo();
            case 'technology':
                return this.getTechnologyInfo();
            case 'portfolio':
                return this.getPortfolioInfo();
            case 'process':
                return this.getProcessInfo();
            default:
                return this.getGeneralInfo();
        }
    }

    // 🎯 SERVICES INFO
    getServicesInfo() {
        return `Here's what we excel at! 🎯\n\n🌐 **Web Development** - Custom websites & web applications\n🎨 **UI/UX Design** - Beautiful, user-friendly interfaces\n📈 **Digital Marketing** - SEO, social media, PPC campaigns\n🛒 **E-commerce Solutions** - Online stores that convert\n🤖 **AI Solutions** - Chatbots, automation, and more\n🔧 **Maintenance & Support** - 24/7 technical support\n\nWhich service interests you most?`;
    }

    // 🏢 COMPANY INFO
    getCompanyInfo() {
        return `About Webory - Your Digital Success Partner! 🏢\n\n🚀 **Founded**: 2020\n👥 **Team**: 15+ skilled professionals\n📊 **Projects**: 500+ completed successfully\n🌟 **Clients**: 200+ happy customers\n⭐ **Rating**: 4.9/5 stars\n🌍 **Presence**: India-based, serving globally\n💼 **Model**: Remote-first culture\n\nWe're passionate about turning ideas into digital reality!`;
    }

    // 📞 CONTACT INFO
    getContactInfo() {
        return `Let's connect! 📞 Choose your preferred way:\n\n📱 **WhatsApp**: +91-94704-89367\n📧 **Email**: weboryinfo@gmail.com\n📸 **Instagram**: @webory_official\n💼 **LinkedIn**: webory-digital\n🌐 **Website**: webory.in\n\nI'm available 24/7 right here too! How would you like to proceed?`;
    }

    // 💻 TECHNOLOGY INFO
    getTechnologyInfo() {
        return `We're tech obsessed! 💻 Here's our cutting-edge stack:\n\n**Frontend**: React, Next.js, Vue.js, Angular\n**Backend**: Node.js, Python, PHP, Java\n**Database**: MongoDB, MySQL, PostgreSQL\n**Cloud**: AWS, Google Cloud, Azure\n**Mobile**: React Native, Flutter\n**AI/ML**: Python, TensorFlow, OpenAI\n**E-commerce**: Shopify, WooCommerce, Magento\n\nWhat technology are you curious about?`;
    }

    // 🎨 PORTFOLIO INFO
    getPortfolioInfo() {
        return `Our work speaks for itself! 🎨\n\n📊 **Stats**: 500+ projects | 200+ clients | 4.9★ rating\n🏆 **Industries**: Healthcare, E-commerce, Education, Finance\n🌟 **Highlights**: Award-winning designs, performance-optimized\n📱 **Follow**: @webory_official for latest work\n\nWant to see examples from your industry? Which sector interests you?`;
    }

    // 🔄 PROCESS INFO
    getProcessInfo() {
        return `Our proven development process! 🔄\n\n1️⃣ **Discovery Call** - Understanding your needs\n2️⃣ **Strategy & Planning** - Roadmap creation\n3️⃣ **Design Phase** - UI/UX mockups\n4️⃣ **Development** - Building your solution\n5️⃣ **Testing & QA** - Ensuring perfection\n6️⃣ **Launch** - Going live!\n7️⃣ **Support** - Ongoing maintenance\n\nTransparent workflow with daily updates! Ready to start?`;
    }

    // 🛠️ SUPPORT RESPONSE
    getSupportResponse(context) {
        const urgency = context.urgency;
        let response = "";
        
        if (urgency === 'high') {
            response = "🚨 **Priority Support Activated!** I can see this is urgent. ";
        } else {
            response = "🛠️ **Support Mode On!** ";
        }
        
        response += "I'm here to help solve this step-by-step.\n\n";
        response += "To assist you better, please share:\n";
        response += "• What specific issue are you facing?\n";
        response += "• What were you trying to do?\n";
        response += "• Any error messages you saw?\n\n";
        response += "I can also schedule a quick debug call if needed!";
        
        return response;
    }

    // 📅 BOOKING RESPONSE
    getBookingResponse() {
        return `Perfect! Let's schedule something! 📅\n\n**Available Options:**\n📞 **Free Consultation** - 30 minutes\n🎨 **Design Review** - 45 minutes\n💻 **Technical Discussion** - 60 minutes\n🚀 **Project Kickoff** - 90 minutes\n\n**Booking Methods:**\n• WhatsApp: +91-94704-89367\n• Email: weboryinfo@gmail.com\n• Continue here and I'll connect you!\n\nWhat type of meeting works best for you?`;
    }

    // ⚖️ COMPARISON RESPONSE
    getComparisonResponse() {
        return `Great question! Let me help you compare! ⚖️\n\n**Why Choose Webory?**\n✅ **Quality**: 4.9★ rating, 500+ projects\n✅ **Speed**: Agile development, faster delivery\n✅ **Support**: 24/7 availability, dedicated team\n✅ **Price**: Transparent, competitive rates\n✅ **Tech**: Latest frameworks, future-proof\n\n**vs Traditional Agencies:**\n• More flexible, less bureaucracy\n• Direct communication with developers\n• Faster iterations and feedback\n\nWhat specific comparison can I help you with?`;
    }

    // ⏰ TIMELINE RESPONSE
    getTimelineResponse(context) {
        const keywords = context.keywords;
        let response = "Here are our typical timelines! ⏰\n\n";
        
        if (keywords.includes('website') || keywords.includes('web')) {
            response += "🌐 **Website**: 1-8 weeks (depends on complexity)\n";
        }
        if (keywords.includes('design')) {
            response += "🎨 **Design**: 1-4 weeks\n";
        }
        if (keywords.includes('ecommerce')) {
            response += "🛒 **E-commerce**: 2-10 weeks\n";
        }
        if (keywords.includes('app')) {
            response += "📱 **Mobile App**: 4-16 weeks\n";
        }
        
        response += "\n⚡ **Rush Jobs**: 50% extra, 2x faster delivery\n";
        response += "📊 **Factors**: Features, integrations, revisions\n";
        response += "🎯 **Promise**: Your timeline is our priority!\n\n";
        response += "When do you need to launch?";
        
        return response;
    }

    // 💻 TECHNOLOGY RESPONSE
    getTechnologyResponse() {
        return this.getTechnologyInfo();
    }

    // 🎨 PORTFOLIO RESPONSE
    getPortfolioResponse() {
        return this.getPortfolioInfo();
    }

    // 🎭 TOPIC-BASED RESPONSE
    getTopicBasedResponse(context) {
        const topic = context.topic;
        
        switch (topic) {
            case 'career':
                return "Join Team Webory! 💼\n\nWe're always looking for talented individuals!\n🏠 **Remote-first** culture\n⏰ **Flexible** working hours\n📈 **Growth** opportunities\n💰 **Competitive** packages\n\nSend your portfolio to: careers@webory.com";
            
            default:
                return this.getIntelligentDefault(context);
        }
    }

    // 🎯 GENERAL INFO
    getGeneralInfo() {
        return `I'd love to help you more! 🎯\n\nI'm Sara, your AI assistant from Webory. We're a digital agency specializing in:\n• Web Development\n• UI/UX Design\n• Digital Marketing\n• E-commerce Solutions\n\nWhat specific information can I provide? Feel free to ask about our services, pricing, process, or anything else!`;
    }

    // 🤔 INTELLIGENT DEFAULT
    getIntelligentDefault(context) {
        const questionType = context.questionType;
        const keywords = context.keywords;
        
        if (questionType === 'what' && keywords.length > 0) {
            return `Interesting question about ${keywords.join(', ')}! 🤔\n\nI'd love to give you detailed information. Could you be more specific about what aspect you'd like to know? For example:\n• Pricing and packages\n• Technical details\n• Timeline and process\n• Examples and portfolio\n\nJust let me know what's most important to you!`;
        }
        
        return `That's a great question! 🌟\n\nI want to make sure I give you the most helpful answer. Could you provide a bit more context about:\n• What specific area interests you?\n• Are you looking for pricing, process, or technical details?\n• Any particular requirements you have?\n\nI'm here to help and want to give you exactly what you need!`;
    }

    // 🕐 TIME-BASED GREETING
    getTimeBasedGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        if (hour < 20) return "Good evening";
        return "Hey there";
    }

    // 🎭 PERSONALITY ENHANCEMENT
    addPersonality(response, context) {
        // Add empathy for support requests
        if (context.intent === 'support' && context.sentiment === 'negative') {
            response = "I understand how frustrating this can be! " + response;
        }
        
        // Add enthusiasm for positive interactions
        if (context.sentiment === 'positive' && this.personality.humor > 0.5) {
            response += " 🎉";
        }
        
        return response;
    }

    // 🎯 FOLLOW-UP QUESTIONS
    addFollowUpQuestions(response, context) {
        const followUps = {
            'pricing': {
                en: '\n\n💡 **Next Steps**:\n• Want a detailed quote?\n• Need to discuss specific features?\n• Ready to start a project?',
                hi: '\n\n💡 **Agla Kadam**:\n• Detailed quote chahiye?\n• Khaas features discuss karna hai?\n• Project shuru karna hai?'
            },
            'information': {
                en: '\n\n📚 **More Info**:\n• Want to see examples?\n• Need technical details?\n• Questions about process?',
                hi: '\n\n📚 **Aur Jaankari**:\n• Examples dekhna hai?\n• Technical details chahiye?\n• Process ke baare mein puchna hai?'
            },
            'support': {
                en: '\n\n🔧 **Support Options**:\n• Schedule a call?\n• Screen sharing session?\n• Email detailed steps?',
                hi: '\n\n🔧 **Support Options**:\n• Call schedule karein?\n• Screen share karna hai?\n• Steps email kar doon?'
            },
            'booking': {
                en: '\n\n📅 **Booking Help**:\n• Preferred time slot?\n• Specific agenda items?\n• Any preparation needed?',
                hi: '\n\n📅 **Booking Help**:\n• Kaunsa time slot chahiye?\n• Khaas agenda hai?\n• Koi tayari karni hai?'
            }
        };
        const lang = this.language || 'en';
        if (followUps[context.intent]) {
            response += followUps[context.intent][lang] || followUps[context.intent]['en'];
        }
        return response;
    }

    // 📊 ANALYTICS
    getAnalytics() {
        return {
            totalConversations: this.conversationHistory.length,
            responseCount: this.responseCount,
            lastInteraction: this.lastInteraction,
            userPatterns: this.userPatterns,
            conversationHistory: this.conversationHistory.slice(-10)
        };
    }

    // 🌐 LANGUAGE DETECTION (Hinglish/English)
    detectLanguage(message) {
        // Simple check: if message contains common Hindi words, treat as Hinglish
        const hindiWords = ['hai', 'kya', 'kaise', 'kyun', 'kyon', 'kar', 'bata', 'hota', 'nahi', 'ho', 'raha', 'rha', 'main', 'mera', 'apka', 'aap', 'mujhe', 'tum', 'kyunki', 'par', 'aur', 'se', 'ko', 'mein', 'ke', 'ye', 'wo', 'tha', 'thi', 'hun', 'hoon', 'karna', 'karne', 'kr', 'krna'];
        const lower = message.toLowerCase();
        for (let word of hindiWords) {
            if (lower.includes(word + ' ') || lower.endsWith(word)) {
                return 'hi';
            }
        }
        return 'en';
    }

    // 🌐 TRANSLATE RESPONSE (English <-> Hinglish)
    translateResponse(response, lang) {
        if (lang === 'en') return response;
        // For demo: Replace some common phrases with Hinglish
        let translated = response
            .replace(/How can I help you/g, 'Main aapki kaise madad kar sakti hoon')
            .replace(/What can I help you with today\?/g, 'Aaj aapko kis cheez mein madad chahiye?')
            .replace(/Ready to bring your digital dreams to life\?/g, 'Tayyar hain apne digital sapne poore karne ke liye?')
            .replace(/Let's connect/g, 'Chaliye baat karte hain')
            .replace(/I'm here to help/g, 'Main madad ke liye yahan hoon')
            .replace(/Thank you/g, 'Dhanyavaad')
            .replace(/You're absolutely welcome/g, 'Aapka swagat hai')
            .replace(/What specific information can I provide\?/g, 'Kya specific jaankari chahiye aapko?')
            .replace(/Which service interests you most\?/g, 'Kaunsi service mein interest hai aapko?')
            .replace(/Want a custom quote\?/g, 'Custom quote chahiye?')
            .replace(/When do you need to launch\?/g, 'Kab tak launch karna hai?')
            .replace(/I'm available 24\/7 right here too!/g, 'Main yahan 24x7 available hoon!')
            .replace(/Great question/g, 'Bohot accha sawal hai')
            .replace(/Perfect! Let's schedule something!/g, 'Badhiya! Chaliye kuch schedule karte hain!')
            .replace(/Priority Support Activated/g, 'Priority Support shuru ho gaya hai')
            .replace(/Support Mode On/g, 'Support mode on ho gaya hai')
            .replace(/Could you provide a bit more context/g, 'Thoda aur context de sakte hain')
            .replace(/I'm here to help and want to give you exactly what you need/g, 'Main madad ke liye hoon aur aapko wahi dungi jo aapko chahiye')
            .replace(/Your timeline is our priority/g, 'Aapka timeline hamari priority hai')
            .replace(/Free consultation available/g, 'Free consultation mil sakta hai')
            .replace(/Thank you for reaching out/g, 'Contact karne ke liye dhanyavaad')
            .replace(/digital agency/g, 'digital agency (डिजिटल एजेंसी)')
            .replace(/Web Development/g, 'Web Development (वेब डेवलपमेंट)')
            .replace(/UI\/UX Design/g, 'UI/UX Design (यूआई/यूएक्स डिजाइन)')
            .replace(/Digital Marketing/g, 'Digital Marketing (डिजिटल मार्केटिंग)')
            .replace(/E-commerce Solutions/g, 'E-commerce Solutions (ई-कॉमर्स सॉल्यूशंस)');
        // Add more as needed for demo
        return translated;
    }
}

// 🚀 INITIALIZE ENHANCED SARA
const enhancedSara = new EnhancedSaraAI();


// 🎯 MAIN FUNCTION
function getSaraResponse(message) {
    return enhancedSara.generateResponse(message);
}

// Export for use
export { getSaraResponse, enhancedSara };




const quickReplies = [
  { label: 'Pricing', value: 'What are your pricing plans?' },
  { label: 'Contact', value: 'How can I contact support?' },
  { label: 'Services', value: 'What services do you offer?' },
  { label: 'Careers', value: 'Are there any job openings?' },
  { label: 'Report Issue', value: 'I have a problem with the website.' },
  { label: 'Thanks', value: 'Thanks!' },
];

const LiveChat = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const socket = useRef(null);
    const messagesEndRef = useRef(null);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const [hasShownWelcome, setHasShownWelcome] = useState(false);

    useEffect(() => {
        // Hide chat on admin routes
        if (location.pathname.startsWith('/admin')) {
            return;
        }
        
        // Connect to the socket server
        // Use the API_BASE_URL from config
        const SERVER_URL = API_BASE_URL;
            
        socket.current = io(SERVER_URL);

        socket.current.on('connect', () => {
            setIsOnline(true);
            console.log('Connected to chat server');
        });

        socket.current.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.current.on('disconnect', () => {
            setIsOnline(false);
            console.log('Disconnected from chat server');
        });

        return () => {
            socket.current.disconnect();
        };
    }, [location.pathname]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const toggleChat = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        
        // Add welcome message when chat is opened for the first time
        if (newIsOpen && !hasShownWelcome && messages.length === 0) {
            setHasShownWelcome(true);
            setMessages([{
                text: "Hey there! 👋 I'm Sara from Webory! Ready to build something amazing together?",
                sender: 'bot',
                timestamp: new Date().toISOString(),
            }]);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputValue.trim() && socket.current) {
            const message = {
                text: inputValue,
                sender: 'user',
                timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, message]);
            // NLP smart reply
            const botReply = getSaraResponse(inputValue);
            setInputValue('');
            if (botReply) {
                setIsBotTyping(true);
                setTimeout(() => {
                    setMessages((prev) => [...prev, {
                        text: botReply,
                        sender: 'bot',
                        timestamp: new Date().toISOString(),
                    }]);
                    setIsBotTyping(false);
                }, 800);
            } else {
                socket.current.emit('sendMessage', message);
            }
        }
    };

    const handleClearChat = () => {
        setMessages([]);
    };

    const handleQuickReply = (value) => {
        if (!isBotTyping) {
            setInputValue(value);
            setTimeout(() => {
                document.getElementById('livechat-input')?.focus();
            }, 50);
        }
    };

    if (location.pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 max-w-full">
            {isOpen ? (
                <div className="w-80 max-w-xs sm:max-w-sm h-[32rem] bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col animate-fadeInPremium transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2 rounded-t-2xl border-b border-gray-100 bg-white">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-pink-400 text-lg font-bold">S</span>
                            <span className="font-bold text-pink-400 text-base tracking-wide">Sara AI</span>
                            <span className={`ml-2 text-xs px-2 py-1 rounded font-semibold ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{isOnline ? '🟢' :'🔴'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={handleClearChat} title="Clear chat" className="p-1 rounded-full hover:bg-gray-100 transition">
                                {/* Trash icon (Heroicons) */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3h6a2 2 0 012 2v2H7V5a2 2 0 012-2zm3 7v6m-4 0h8" />
                                </svg>
                            </button>
                            <button onClick={toggleChat} title="Close chat" className="p-1 rounded-full hover:bg-gray-100 transition">
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg>
                            </button>
                        </div>
                    </div>
                    {/* Chat Area */}
                    <div className="flex-1 px-4 py-4 overflow-y-auto bg-white custom-scrollbar scrollbar-hide">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex mb-4 ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'} animate-fadeInUpPremium`}> 
                                {msg.sender === 'bot' && (
                                    <span className="mr-2 flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-blue-600 font-bold">👱🏻‍♀️ </span>
                                )}
                                {/* 🤖 */}
                                <div className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-base break-words transition-all duration-200
                                    ${msg.sender === 'bot' ? 'bg-gray-100 text-gray-900 border border-gray-200' : 'bg-blue-600 text-white border border-blue-700'}`}
                                >
                                    {msg.text}
                                    <div className="text-[10px] text-gray-400 mt-1 text-right">{dayjs(msg.timestamp).format('HH:mm')}</div>
                                </div>
                                {msg.sender === 'user' && (
                                    <span className="ml-2 flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">🧑</span>
                                    )}
                            </div>
                        ))}
                        {isBotTyping && (
                            <div className="flex items-center gap-2 mb-2 animate-pulse">
                                <span className="mr-2 flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-blue-600 font-bold">🤖</span>
                                <div className="bg-gray-100 border border-gray-200 px-4 py-3 rounded-2xl shadow-sm text-base">Typing...</div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    {/* Quick Replies */}
                    <div className="px-4 pb-2 -mt-2 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        {quickReplies.map((qr) => (
                            <button
                                key={qr.label}
                                type="button"
                                className="px-4 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium border border-gray-200 hover:bg-blue-50 hover:text-blue-700 transition mr-2"
                                onClick={() => handleQuickReply(qr.value)}
                                disabled={isBotTyping}
                            >
                                {qr.label}
                            </button>
                        ))}
                    </div>
                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="relative px-4 py-3 border-t border-gray-100 bg-white rounded-b-2xl flex items-center">
                        <input
                            id="livechat-input"
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                            className="w-full pl-5 pr-12 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-base shadow-sm placeholder-gray-400"
                            autoComplete="off"
                            disabled={isBotTyping}
                        />
                        <button
                            type="submit"
                            className="absolute right-6 top-1/2 -translate-y-1/2 bg-blue-600 text-white w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-50 text-lg font-bold"
                            disabled={!inputValue.trim() || isBotTyping}
                            style={{boxShadow:'0 2px 8px 0 rgba(31, 38, 135, 0.10)'}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </button>
                    </form>
                </div>
            ) : (
                <button
                    onClick={toggleChat}
                    className="bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center animate-bounce border-4 border-white/60"
                    style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.10)'}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default LiveChat; 