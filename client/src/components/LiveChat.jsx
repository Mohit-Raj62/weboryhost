import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { API_BASE_URL } from '../config/api';
import dayjs from 'dayjs';
import axios from 'axios';

// 🎯 OPTIMIZED SARA AI CLASS
class OptimizedSaraAI {
    constructor() {
        this.userName = null;
        this.conversationHistory = [];
        this.currentMood = 'friendly';
        this.contextMemory = new Map();
        this.responseCount = 0;
        this.lastInteraction = null;
        this.language = 'en';
        
        // Enhanced personality traits
        this.personality = {
            empathy: 0.8,
            humor: 0.7,
            professionalism: 0.9,
            creativity: 0.8
        };
        
        // Optimized knowledge base with lazy loading
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
                rating: '4.9/5'
            },
            contact: {
                whatsapp: '+91-94704-89367',
                email: 'weboryinfo@gmail.com',
                instagram: '@webory_official',
                linkedin: 'webory-digital',
                website: 'webory.in'
            }
        };

        // Pre-compiled regex patterns for better performance
        this.patterns = {
            greeting: /\b(hi|hello|hey|namaste|good morning|good afternoon|good evening)\b/i,
            pricing: /\b(price|cost|rate|budget|expensive|cheap|affordable|quote|charges|fee|payment)\b/i,
            support: /\b(help|support|problem|issue|fix|error|bug|not working|broken)\b/i,
            information: /\b(what|how|when|where|why|tell me|explain|describe|details|about)\b/i,
            booking: /\b(book|schedule|appointment|meet|call|demo|consultation|meeting)\b/i,
            complaint: /\b(complaint|complain|dissatisfied|unhappy|refund|cancel|disappointed)\b/i,
            praise: /\b(great|excellent|amazing|love|fantastic|awesome|wonderful|perfect)\b/i,
            urgent: /\b(urgent|asap|emergency|quickly|immediate|now|today)\b/i,
            email: /[\w.-]+@[\w.-]+\.\w+/,
            phone: /\d{10}|\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/,
            name: /my name is (\w+)|i'm (\w+)|i am (\w+)/i
        };

        // Optimized response templates
        this.responseTemplates = {
            greeting: `{timeGreeting}{personalTouch}! I'm Sara from Webory! 🌟 Ready to bring your digital dreams to life? What can I help you with today?`,
            pricing: `Great question about pricing! 💰 Here's what we offer:\n\n{pricingInfo}\n\n✨ **Free consultation available!** Prices vary based on requirements. Want a custom quote?`,
            services: `Here's what we excel at! 🎯\n\n🌐 **Web Development** - Custom websites & web applications\n🎨 **UI/UX Design** - Beautiful, user-friendly interfaces\n📈 **Digital Marketing** - SEO, social media, PPC campaigns\n🛒 **E-commerce Solutions** - Online stores that convert\n🤖 **AI Solutions** - Chatbots, automation, and more\n🔧 **Maintenance & Support** - 24/7 technical support\n\nWhich service interests you most?`,
            company: `About Webory - Your Digital Success Partner! 🏢\n\n🚀 **Founded**: 2020\n👥 **Team**: 15+ skilled professionals\n📊 **Projects**: 500+ completed successfully\n🌟 **Clients**: 200+ happy customers\n⭐ **Rating**: 4.9/5 stars\n🌍 **Presence**: India-based, serving globally\n💼 **Model**: Remote-first culture\n\nWe're passionate about turning ideas into digital reality!`,
            contact: `Let's connect! 📞 Choose your preferred way:\n\n📱 **WhatsApp**: +91-94704-89367\n📧 **Email**: weboryinfo@gmail.com\n📸 **Instagram**: @webory_official\n💼 **LinkedIn**: webory-digital\n🌐 **Website**: webory.in\n\nI'm available 24/7 right here too! How would you like to proceed?`,
            support: `🛠️ **Support Mode On!** I'm here to help solve this step-by-step.\n\nTo assist you better, please share:\n• What specific issue are you facing?\n• What were you trying to do?\n• Any error messages you saw?\n\nI can also schedule a quick debug call if needed!`,
            default: `That's a great question! 🌟\n\nI want to make sure I give you the most helpful answer. Could you provide a bit more context about:\n• What specific area interests you?\n• Are you looking for pricing, process, or technical details?\n• Any particular requirements you have?\n\nI'm here to help and want to give you exactly what you need!`
        };
    }

    // 🚀 OPTIMIZED CONTEXT ANALYSIS
    analyzeContext(message) {
        const lowerMsg = message.toLowerCase();
        const context = {
            intent: this.detectIntent(lowerMsg),
            sentiment: this.analyzeSentiment(lowerMsg),
            urgency: this.patterns.urgent.test(lowerMsg) ? 'high' : 'normal',
            personalInfo: this.extractPersonalInfo(message),
            keywords: this.extractKeywords(lowerMsg)
        };
        return context;
    }

    // 🎯 OPTIMIZED INTENT DETECTION
    detectIntent(lowerMsg) {
        if (this.patterns.greeting.test(lowerMsg)) return 'greeting';
        if (this.patterns.pricing.test(lowerMsg)) return 'pricing';
        if (this.patterns.support.test(lowerMsg)) return 'support';
        if (this.patterns.booking.test(lowerMsg)) return 'booking';
        if (this.patterns.complaint.test(lowerMsg)) return 'complaint';
        if (this.patterns.praise.test(lowerMsg)) return 'praise';
        if (this.patterns.information.test(lowerMsg)) return 'information';
        return 'general';
    }

    // 🎭 OPTIMIZED SENTIMENT ANALYSIS
    analyzeSentiment(lowerMsg) {
        const positiveScore = (lowerMsg.match(/\b(good|great|awesome|love|excellent|amazing|fantastic|happy|pleased)\b/g) || []).length;
        const negativeScore = (lowerMsg.match(/\b(bad|terrible|hate|awful|disappointed|frustrated|angry|sad|upset)\b/g) || []).length;
        
        if (positiveScore > negativeScore) return 'positive';
        if (negativeScore > positiveScore) return 'negative';
        return 'neutral';
    }

    // 👤 OPTIMIZED PERSONAL INFO EXTRACTION
    extractPersonalInfo(message) {
        const info = {};
        
        const nameMatch = message.match(this.patterns.name);
        if (nameMatch) {
            info.name = nameMatch[1] || nameMatch[2] || nameMatch[3];
            this.userName = info.name;
        }
        
        const emailMatch = message.match(this.patterns.email);
        if (emailMatch) info.email = emailMatch[0];
        
        const phoneMatch = message.match(this.patterns.phone);
        if (phoneMatch) info.phone = phoneMatch[0];
        
        return info;
    }

    // 🔍 OPTIMIZED KEYWORD EXTRACTION
    extractKeywords(lowerMsg) {
        const keywords = [];
        const serviceKeywords = ['website', 'web', 'app', 'design', 'marketing', 'seo', 'ecommerce', 'e-commerce', 'ai', 'chatbot'];
        
        for (const keyword of serviceKeywords) {
            if (lowerMsg.includes(keyword)) {
                keywords.push(keyword);
            }
        }
        
        return keywords;
    }

    // 🎨 OPTIMIZED RESPONSE GENERATION
    generateResponse(message) {
        const context = this.analyzeContext(message);
        let response = this.getResponse(context, message);
        
        // Add personality and store conversation
        response = this.addPersonality(response, context);
        this.storeConversation(message, response, context);
        
        return response;
    }

    // 🎯 OPTIMIZED RESPONSE LOGIC
    getResponse(context, message) {
        const lowerMsg = message.toLowerCase();
        
        switch (context.intent) {
            case 'greeting':
                return this.getGreetingResponse();
            case 'pricing':
                return this.getPricingResponse(context.keywords);
            case 'support':
                return this.getSupportResponse(context.urgency);
            case 'complaint':
                return this.getComplaintResponse();
            case 'information':
                return this.getInformationResponse(lowerMsg);
            case 'booking':
                return this.getBookingResponse();
            default:
                return this.getDefaultResponse();
        }
    }

    // 🌟 OPTIMIZED RESPONSE METHODS
    getGreetingResponse() {
        const timeGreeting = this.getTimeBasedGreeting();
        const personalTouch = this.userName ? ` ${this.userName}` : '';
        return this.responseTemplates.greeting
            .replace('{timeGreeting}', timeGreeting)
            .replace('{personalTouch}', personalTouch);
    }

    getPricingResponse(keywords) {
        let pricingInfo = '';
        const services = this.knowledgeBase.services;
        
        if (keywords.includes('website') || keywords.includes('web')) {
            pricingInfo += `🌐 **Website Development**: ${services['web development'].pricing}\n`;
        }
        if (keywords.includes('design')) {
            pricingInfo += `🎨 **UI/UX Design**: ${services['ui/ux design'].pricing}\n`;
        }
        if (keywords.includes('marketing') || keywords.includes('seo')) {
            pricingInfo += `📈 **Digital Marketing**: ${services['digital marketing'].pricing}\n`;
        }
        if (keywords.includes('ecommerce') || keywords.includes('e-commerce')) {
            pricingInfo += `🛒 **E-commerce**: ${services['e-commerce'].pricing}\n`;
        }
        
        if (!pricingInfo) {
            pricingInfo = `🌐 **Websites**: ${services['web development'].pricing}\n🎨 **UI/UX Design**: ${services['ui/ux design'].pricing}\n📈 **Digital Marketing**: ${services['digital marketing'].pricing}\n🛒 **E-commerce**: ${services['e-commerce'].pricing}`;
        }
        
        return this.responseTemplates.pricing.replace('{pricingInfo}', pricingInfo);
    }

    getSupportResponse(urgency) {
        const prefix = urgency === 'high' ? '🚨 **Priority Support Activated!** ' : '';
        return prefix + this.responseTemplates.support;
    }

    getComplaintResponse() {
        return "I'm really sorry for the trouble! 😔\n\nPlease share your issue in detail so I can help you quickly.\n• What problem are you facing?\n• Which feature is causing issues?\n• Any screenshots would be helpful.\n\nYour feedback is important to us!";
    }

    getInformationResponse(lowerMsg) {
        if (lowerMsg.includes('service') || lowerMsg.includes('offer')) {
            return this.responseTemplates.services;
        }
        if (lowerMsg.includes('company') || lowerMsg.includes('about')) {
            return this.responseTemplates.company;
        }
        if (lowerMsg.includes('contact')) {
            return this.responseTemplates.contact;
        }
        return this.responseTemplates.default;
    }

    getBookingResponse() {
        return `Perfect! Let's schedule something! 📅\n\n**Available Options:**\n📞 **Free Consultation** - 30 minutes\n🎨 **Design Review** - 45 minutes\n💻 **Technical Discussion** - 60 minutes\n🚀 **Project Kickoff** - 90 minutes\n\n**Contact Methods:**\n• WhatsApp: +91-94704-89367\n• Email: weboryinfo@gmail.com\n• Continue here!\n\nWhat type of meeting works best for you?`;
    }

    getDefaultResponse() {
        return this.responseTemplates.default;
    }

    // 🕐 TIME-BASED GREETING
    getTimeBasedGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        if (hour < 20) return "Good evening";
        return "Hey there";
    }

    // 🎭 ADD PERSONALITY
    addPersonality(response, context) {
        if (context.sentiment === 'positive') {
            response += " 🎉";
        }
        if (context.urgency === 'high') {
            response = "I understand this is urgent! " + response;
        }
        return response;
    }

    // 💾 STORE CONVERSATION
    storeConversation(message, response, context) {
        this.conversationHistory.push({
            user: message,
            sara: response,
            context: context,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 20 conversations for memory efficiency
        if (this.conversationHistory.length > 20) {
            this.conversationHistory = this.conversationHistory.slice(-20);
        }
        
        this.responseCount++;
        this.lastInteraction = new Date();
    }
}

// 🚀 INITIALIZE OPTIMIZED SARA
// const optimizedSara = new OptimizedSaraAI();


// 🎯 MAIN FUNCTION


// 📱 OPTIMIZED QUICK REPLIES
const QUICK_REPLIES = [
    { label: 'Pricing', value: 'What are your pricing plans?' },
    { label: 'Contact', value: 'How can I contact support?' },
    { label: 'Services', value: 'What services do you offer?' },
    { label: 'Careers', value: 'Are there any job openings?' },
    { label: 'Report Issue', value: 'I have a problem with the website.' },
    { label: 'Thanks', value: 'Thanks!' },
];

// 🎨 OPTIMIZED CHAT ICONS
const ChatIcons = {
    Send: () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    ),
    Close: () => (
        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
        </svg>
    ),
    Chat: () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
    ),
    Clear: () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    )
};

// Add Ollama LLM API call function (no API key needed)
async function fetchOpenAIResponse(message, model = 'llama2') {
    // Using Ollama's local API (make sure Ollama is running)
    const endpoint = 'http://localhost:11434/v1/chat/completions';
    try {
        const response = await axios.post(
            endpoint,
            {
                model: model, // Use the selected model
                messages: [{ role: 'user', content: message }],
                stream: false
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        return "Sorry, I couldn't get an answer right now.";
    }
}

// 🎯 OPTIMIZED LIVECHAT COMPONENT
const LiveChat = React.memo(() => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const [hasShownWelcome, setHasShownWelcome] = useState(false);
    const [selectedModel, setSelectedModel] = useState('llama2');
    
    const socket = useRef(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // 🚫 HIDE CHAT ON ADMIN ROUTES
    const shouldHideChat = useMemo(() => {
        return location.pathname.startsWith('/admin');
    }, [location.pathname]);

    // 🔌 SOCKET CONNECTION
    useEffect(() => {
        if (shouldHideChat) return;
        
        socket.current = io(API_BASE_URL);

        socket.current.on('connect', () => {
            setIsOnline(true);
        });

        socket.current.on('receiveMessage', (message) => {
            setMessages(prev => [...prev, message]);
        });

        socket.current.on('disconnect', () => {
            setIsOnline(false);
        });

        return () => {
            socket.current?.disconnect();
        };
    }, [shouldHideChat]);

    // 📜 AUTO SCROLL TO BOTTOM
    useEffect(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isBotTyping]);

    // 🔄 TOGGLE CHAT
    const toggleChat = useCallback(() => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        
        if (newIsOpen && !hasShownWelcome && messages.length === 0) {
            setHasShownWelcome(true);
            setMessages([{
                text: "Hey there! 👋 I'm Sara from Webory! Ready to build something amazing together?",
                sender: 'bot',
                timestamp: new Date().toISOString(),
            }]);
        }
    }, [isOpen, hasShownWelcome, messages.length]);

    // 📤 SEND MESSAGE
    const handleSendMessage = useCallback(async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isBotTyping) return;

            const userMessage = {
                text: inputValue,
                sender: 'user',
                timestamp: new Date().toISOString(),
            };
            
            setMessages(prev => [...prev, userMessage]);
            setInputValue('');
            setIsBotTyping(true);
            
        // Get AI response from Ollama with selected model
                const botReply = await fetchOpenAIResponse(inputValue, selectedModel);
                setMessages(prev => [...prev, {
                    text: botReply,
                    sender: 'bot',
                    timestamp: new Date().toISOString(),
                }]);
                setIsBotTyping(false);
    }, [inputValue, isBotTyping, selectedModel]);

    // 🧹 CLEAR CHAT
    const handleClearChat = useCallback(() => {
        setMessages([]);
        setHasShownWelcome(false);
    }, []);

    // ⚡ QUICK REPLY
    const handleQuickReply = useCallback((value) => {
        if (!isBotTyping) {
            setInputValue(value);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isBotTyping]);

    // 🚫 HIDE ON ADMIN ROUTES
    if (shouldHideChat) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 max-w-full">
            {isOpen ? (
                <div className="w-80 max-w-xs sm:max-w-sm h-[32rem] bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col animate-fadeInPremium transition-all duration-300">
                    {/* Model Selector */}
                    <div className="px-4 pt-3 pb-1 bg-white border-b border-gray-100 flex items-center gap-2">
                        <label htmlFor="model-select" className="text-sm font-medium text-gray-700">Model:</label>
                        <select
                            id="model-select"
                            value={selectedModel}
                            onChange={e => setSelectedModel(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            <option value="llama2">Llama 2</option>
                            <option value="mistral">Mistral</option>
                            <option value="phi3">Phi-3</option>
                        </select>
                    </div>
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2 rounded-t-2xl border-b border-gray-100 bg-white">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white text-lg font-bold">S</span>
                            <span className="font-bold text-blue-600 text-base tracking-wide">Sara AI</span>
                            <span className={`ml-2 text-xs px-2 py-1 rounded font-semibold ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {isOnline ? '🟢' : '🔴'}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button 
                                onClick={handleClearChat} 
                                title="Clear chat" 
                                className="p-1 rounded-full hover:bg-gray-100 transition"
                            >
                                <ChatIcons.Clear />
                            </button>
                            <button 
                                onClick={toggleChat} 
                                title="Close chat" 
                                className="p-1 rounded-full hover:bg-gray-100 transition"
                            >
                                <ChatIcons.Close />
                            </button>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 px-4 py-4 overflow-y-auto bg-white custom-scrollbar scrollbar-hide">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex mb-4 ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'} animate-fadeInUpPremium`}>
                                {msg.sender === 'bot' && (
                                    <span className="mr-2 flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-blue-600 font-bold">
                                        👱🏻‍♀️
                                    </span>
                                )}
                                <div className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-base break-words transition-all duration-200 ${
                                    msg.sender === 'bot' 
                                        ? 'bg-gray-100 text-gray-900 border border-gray-200' 
                                        : 'bg-blue-600 text-white border border-blue-700'
                                }`}>
                                    {msg.text}
                                    <div className="text-[10px] text-gray-400 mt-1 text-right">
                                        {dayjs(msg.timestamp).format('HH:mm')}
                                    </div>
                                </div>
                                {msg.sender === 'user' && (
                                    <span className="ml-2 flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                        🧑
                                    </span>
                                )}
                            </div>
                        ))}
                        
                        {isBotTyping && (
                            <div className="flex items-center gap-2 mb-2 animate-pulse">
                                <span className="mr-2 flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-blue-600 font-bold">
                                    🤖
                                </span>
                                <div className="bg-gray-100 border border-gray-200 px-4 py-3 rounded-2xl shadow-sm text-base">
                                    Typing...
                                </div>
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    <div className="px-4 pb-2 -mt-2 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        {QUICK_REPLIES.map((qr) => (
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
                            ref={inputRef}
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
                            className="absolute right-6 top-1/2 -translate-y-1/2 bg-blue-600 text-white w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-50"
                                disabled={!inputValue.trim() || isBotTyping}
                            >
                            <ChatIcons.Send />
                            </button>
                    </form>
                </div>
            ) : (
                <button
                    onClick={toggleChat}
                    className="bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center animate-bounce border-4 border-white/60"
                >
                    <ChatIcons.Chat />
                </button>
            )}
        </div>
    );
});

LiveChat.displayName = 'LiveChat';

export default LiveChat;