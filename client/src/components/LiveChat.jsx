import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import dayjs from 'dayjs';

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
        this.personality = {
            empathy: 0.8,
            humor: 0.7,
            professionalism: 0.9,
            creativity: 0.8
        };
        this.knowledgeBase = {
            services: {
                'web development': {
                    description: 'Custom websites, web apps, and responsive designs',
                    pricing: '₹3,000 - ₹50,000',
                    timeline: '1-8 weeks',
                    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB']
                },
                'ui/ux design': {
                    description: 'User interface and experience design',
                    pricing: '₹5,000 - ₹50,000',
                    timeline: '1-4 weeks',
                    technologies: ['Figma', 'Adobe XD', 'Sketch']
                },
                'digital marketing': {
                    description: 'SEO, social media, PPC campaigns',
                    pricing: '₹10,000 - ₹1,00,000/month',
                    timeline: '2-6 months',
                    technologies: ['Google Ads', 'Facebook Ads', 'Analytics']
                },
                'e-commerce': {
                    description: 'Online stores and shopping platforms',
                    pricing: '₹10,000 - ₹2,00,000',
                    timeline: '2-10 weeks',
                    technologies: ['Shopify', 'WooCommerce', 'Magento']
                }
            },
            company: {
                // founded: '20',
                team_size: '5+ professionals',
                projects_completed: '100+',
                clients: '50+',
                rating: '4.6/5'
            },
            contact: {
                whatsapp: '+91-94704-89367',
                email: 'weboryinfo@gmail.com',
                instagram: '@weboryinfo',
                linkedin: 'weboryinfo',
                website: 'webory.netlify.app'
            }
        };
        this.patterns = {
            greeting: /\b(hi|hello|hey|namaste|good morning|good afternoon|good evening|pranam|salaam|greetings|ram ram|hello sara|hey sara|sara ji|sara)\b/i,
            pricing: /\b(price|cost|rate|budget|expensive|cheap|affordable|quote|charges|fee|payment|kharcha|kitna|daam|kimat|kitne|paise|charge|lagat|estimate|quotation|how much|how many|total cost|website ka kharcha|banwane ka kharcha|banane ka kharcha|pricing plan|pricing plans|plans|web design|website design|design price|design cost|design charges|designing|designing ka kharcha)\b/i,
            support: /\b(help|support|problem|issue|fix|error|bug|not working|broken|madad|samasya|samasyaen|samasyao|samasya hai|problem hai|madad karo|help karo|sahayata|trouble|samasya ka hal|samasya ka solution|technical issue|technical problem|site down|website down|login issue|login problem)\b/i,
            information: /\b(what|how|when|where|why|tell me|explain|describe|details|about|kya|kaise|kab|kahan|kyun|batao|jankari|jaankari|detail|samjhao|kaun|kis|company|team|location|office|address|timing|hours|kab khula|kab band|kab tak|kab se|kab tak open|kab se open|kab se band|kab se start|kab se close|kab se available|kab se service|kab se support)\b/i,
            booking: /\b(book|schedule|appointment|meet|call|demo|consultation|meeting|milna|samay|time|slot|baat|baatcheet|baatcheet karna|call lagana|call karna|baat karna|meeting fix|meeting set|appointment fix|appointment set)\b/i,
            complaint: /\b(complaint|complain|dissatisfied|unhappy|refund|cancel|disappointed|shikayat|shikayat karna|naraaz|naraz|pareshan|refund chahiye|cancel karna|bad experience|not happy|not satisfied|service bad|service poor)\b/i,
            praise: /\b(great|excellent|amazing|love|fantastic|awesome|wonderful|perfect|shandar|badhiya|accha|mast|badiya|superb|best|bahut accha|bahut badhiya|thank you|thanks|shukriya|dhanyavaad|good job|well done|nice work|nice|awesome work|great job)\b/i,
            urgent: /\b(urgent|asap|emergency|quickly|immediate|now|today|jaldi|abhi|turant|fauran|foran|aaj hi|abhi chahiye|immediately|jaldi karo|abhi karo)\b/i,
            job: /\b(job|career|opening|vacancy|hiring|join|kaam|naukri|bharti|job chahiye|career opportunity|job opportunity|internship|intern|work with|work at|join team|join webory)\b/i,
            feedback: /\b(feedback|suggestion|review|opinion|feedback dena|suggestion dena|review dena|opinion dena|feedback form|feedback submit|feedback do|feedback doge)\b/i,
            goodbye: /\b(bye|goodbye|see you|see ya|alvida|phir milenge|phir milte hain|phir milenge sara|bye sara|good night|goodnight|shubh ratri|shubhratri|take care|tc)\b/i,
            email: /[\w.-]+@[\w.-]+\.\w+/, 
            phone: /\d{10}|\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/,
            name: /my name is (\w+)|i'm (\w+)|i am (\w+)|mera naam (\w+)/i,
            acknowledge: /\b(ok|okay|thik hai|theek hai|haan|hmm|hmmm|hmm.|h|yes|sure|done|great|acha|accha|thik|thik h|fine|cool|alright|sahi)\b/i,
            contact: /\b(contact|whatsapp|email|phone|call|number|mobile|contact number|phone number|mobile number|nambar|numb|no|contact info|contact details)\b/i,
        };
        this.responseTemplates = {
            greeting: `{timeGreeting}{personalTouch}! I'm Sara from Webory. How can I help you today?\n\n(Ask in Hindi or English!)`,
            pricing: `Here's our pricing:\n{pricingInfo}\n\nFree consultation! Prices depend on your needs. Want a custom quote?`,
            services: `We offer:\n- Web Development\n- UI/UX Design\n- Digital Marketing\n- E-commerce\n- AI Solutions\n- 24/7 Support\n\nWhich service interests you?`,
            company: `About Webory:\n- Founded: 2020\n- Team: 15+\n- Projects: 500+\n- Clients: 200+\n- Rating: 4.9/5\n- India-based, global service.`,
            contact: `Contact us:\nWhatsApp: +91-94704-89367\nEmail: weboryinfo@gmail.com\nInstagram: @webory_official\nLinkedIn: webory-digital\nWebsite: webory.in`,
            support: `Support mode on!\nPlease share:\n- Your issue\n- What you tried\n- Any error message`,
            job: `We're hiring!\nSend your resume to weboryinfo@gmail.com or check our Careers page.`,
            feedback: `Thanks for your feedback! You can also fill our feedback form on the website.`,
            goodbye: `Thanks for chatting! Have a great day!`,
            praise: `Thank you! 😊 Glad to help.`,
            default: `Could you give more details?\nTry asking about pricing, services, support, company, or contact.\nEg: 'Website ka kharcha?', 'What services do you offer?'`
        };
    }
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
    detectIntent(lowerMsg) {
        if (this.patterns.greeting.test(lowerMsg)) return 'greeting';
        if (this.patterns.pricing.test(lowerMsg)) return 'pricing';
        if (this.patterns.support.test(lowerMsg)) return 'support';
        if (this.patterns.booking.test(lowerMsg)) return 'booking';
        if (this.patterns.complaint.test(lowerMsg)) return 'complaint';
        if (this.patterns.praise.test(lowerMsg)) return 'praise';
        if (this.patterns.information.test(lowerMsg)) return 'information';
        if (this.patterns.job.test(lowerMsg)) return 'job';
        if (this.patterns.feedback.test(lowerMsg)) return 'feedback';
        if (this.patterns.goodbye.test(lowerMsg)) return 'goodbye';
        if (this.patterns.acknowledge.test(lowerMsg)) return 'acknowledge';
        if (this.patterns.contact.test(lowerMsg)) return 'contact';
        return 'general';
    }
    analyzeSentiment(lowerMsg) {
        const positiveScore = (lowerMsg.match(/\b(good|great|awesome|love|excellent|amazing|fantastic|happy|pleased)\b/g) || []).length;
        const negativeScore = (lowerMsg.match(/\b(bad|terrible|hate|awful|disappointed|frustrated|angry|sad|upset)\b/g) || []).length;
        if (positiveScore > negativeScore) return 'positive';
        if (negativeScore > positiveScore) return 'negative';
        return 'neutral';
    }
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
    extractKeywords(lowerMsg) {
        const keywords = [];
        const serviceKeywords = [
            'website', 'web', 'app', 'design', 'web design', 'website design', 'marketing', 'seo', 'ecommerce', 'e-commerce', 'ai', 'chatbot', 'pricing', 'plans', 'pricing plans'
        ];
        for (const keyword of serviceKeywords) {
            if (lowerMsg.includes(keyword)) {
                keywords.push(keyword);
            }
        }
        return keywords;
    }
    generateResponse(message) {
        const context = this.analyzeContext(message);
        let response = this.getResponse(context, message);
        response = this.addPersonality(response, context);
        this.storeConversation(message, response, context);
        return response;
    }
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
            case 'job':
                return this.responseTemplates.job;
            case 'feedback':
                return this.responseTemplates.feedback;
            case 'goodbye':
                return this.responseTemplates.goodbye;
            case 'praise':
                return this.responseTemplates.praise;
            case 'contact':
                return this.responseTemplates.contact;
            default:
                return this.getDefaultResponse();
        }
    }
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

        if (keywords.includes('website') || keywords.includes('web') || keywords.includes('website design') || keywords.includes('web design')) {
            pricingInfo += `🌐 **Website Development**: ${services['web development'].pricing}\n`;
        }
        if (keywords.includes('design') || keywords.includes('web design') || keywords.includes('website design')) {
            pricingInfo += `🎨 **UI/UX Design**: ${services['ui/ux design'].pricing}\n`;
        }
        if (keywords.includes('marketing') || keywords.includes('seo')) {
            pricingInfo += `📈 **Digital Marketing**: ${services['digital marketing'].pricing}\n`;
        }
        if (keywords.includes('ecommerce') || keywords.includes('e-commerce')) {
            pricingInfo += `🛒 **E-commerce**: ${services['e-commerce'].pricing}\n`;
        }
        // Fallback: If no specific keyword matched, show all pricing
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
        if (lowerMsg.includes('company') || lowerMsg.includes('about') || lowerMsg.includes('team') || lowerMsg.includes('office') || lowerMsg.includes('location') || lowerMsg.includes('address')) {
            return this.responseTemplates.company;
        }
        if (
            lowerMsg.includes('contact') ||
            lowerMsg.includes('whatsapp') ||
            lowerMsg.includes('email') ||
            lowerMsg.includes('phone') ||
            lowerMsg.includes('call') ||
            lowerMsg.includes('number') ||
            lowerMsg.includes('mobile')
        ) {
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
    getTimeBasedGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        if (hour < 20) return "Good evening";
        return "Hey there";
    }
    addPersonality(response, context) {
        if (context.sentiment === 'positive') {
            response += " 🎉";
        }
        if (context.urgency === 'high') {
            response = "I understand this is urgent! " + response;
        }
        return response;
    }
    storeConversation(message, response, context) {
        this.conversationHistory.push({
            user: message,
            sara: response,
            context: context,
            timestamp: new Date().toISOString()
        });
        if (this.conversationHistory.length > 20) {
            this.conversationHistory = this.conversationHistory.slice(-20);
        }
        this.responseCount++;
        this.lastInteraction = new Date();
    }
}

// 🚀 INITIALIZE OPTIMIZED SARA
const optimizedSara = new OptimizedSaraAI();

// 🎯 MAIN FUNCTION
function getSaraResponse(message) {
    return optimizedSara.generateResponse(message);
}

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

// Chat Header Component
function ChatHeader({ onClear, onClose }) {
    return (
        <div className="flex items-center justify-between px-4 py-2 rounded-t-2xl border-b bg-gradient-to-r from-blue-600 to-blue-400 shadow-md">
            <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white text-blue-600 text-lg font-bold shadow">S</span>
                <span className="font-bold text-white text-base tracking-wide drop-shadow">SARA AI</span>
                <span className="text-xs">🟢</span>
            </div>
            <div className="flex items-center gap-1">
                <button 
                    onClick={onClear} 
                    title="Clear chat" 
                    className="p-1 rounded-full hover:bg-blue-100 transition"
                >
                    <ChatIcons.Clear />
                </button>
                <button 
                    onClick={onClose} 
                    title="Close chat" 
                    className="p-1 rounded-full hover:bg-blue-100 transition"
                >
                    <ChatIcons.Close />
                </button>
            </div>
        </div>
    );
}

// Message List Component
function MessageList({ messages, isBotTyping, messagesEndRef }) {
    return (
        <div
            className="flex-1 px-4 py-4 overflow-y-auto bg-white custom-scrollbar scrollbar-thin"
            aria-live="polite"
            style={{ scrollbarWidth: 'thin' }}
        >
            {messages.map((msg, index) => (
                <div key={index} className={`flex mb-4 ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'} animate-fadeInUpPremium`}>
                    {msg.sender === 'bot' && (
                        <span className="mr-2 flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-blue-600 font-bold shadow">👱🏻‍♀️</span>
                    )}
                    <div className={`max-w-[75%] px-4 py-3 rounded-3xl shadow text-base break-words transition-all duration-200 ${
                        msg.sender === 'bot' 
                            ? 'bg-gray-100 text-gray-900 border border-gray-200' 
                            : 'bg-blue-600 text-white border border-blue-700'
                    }`} aria-label={msg.sender === 'bot' ? 'Bot message' : 'User message'}>
                        {msg.text}
                        <div className="text-[10px] text-gray-400 mt-1 text-right">
                            {dayjs(msg.timestamp).format('HH:mm')}
                        </div>
                    </div>
                    {msg.sender === 'user' && (
                        <span className="ml-2 flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shadow">🧑</span>
                    )}
                </div>
            ))}
            {isBotTyping && (
                <div className="flex items-center gap-2 mb-2 animate-pulse">
                    <span className="mr-2 flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-blue-600 font-bold shadow">
                        🤖
                    </span>
                    <div className="bg-gray-100 border border-gray-200 px-4 py-3 rounded-3xl shadow text-base">
                        Typing...
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
}

// Input Area Component
function InputArea({ inputValue, setInputValue, handleSendMessage, isBotTyping, inputRef }) {
    return (
        <form onSubmit={handleSendMessage} className="relative px-4 py-3 border-t border-gray-100 bg-white rounded-b-2xl flex items-center shadow-inner">
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="w-full pl-5 pr-12 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-base shadow-sm placeholder-gray-400"
                autoComplete="off"
                disabled={isBotTyping}
                aria-label="Type your message"
            />
            <button
                type="submit"
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-400 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-50 border-2 border-white"
                disabled={!inputValue.trim() || isBotTyping}
                aria-label="Send message"
            >
                <ChatIcons.Send />
            </button>
        </form>
    );
}

// 🎯 OPTIMIZED LIVECHAT COMPONENT
const LiveChat = React.memo(() => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [hasShownWelcome, setHasShownWelcome] = useState(false);
    
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // 🚫 HIDE CHAT ON ADMIN ROUTES
    const shouldHideChat = location.pathname.startsWith('/admin');

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
    const handleSendMessage = useCallback((e) => {
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
            setTimeout(() => {
            const botReply = getSaraResponse(inputValue);
                setMessages(prev => [...prev, {
                    text: botReply,
                    sender: 'bot',
                    timestamp: new Date().toISOString(),
                }]);
                setIsBotTyping(false);
        }, 800);
    }, [inputValue, isBotTyping]);

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
        <div className="fixed bottom-6 right-6 z-50 max-w-full" aria-label="Live chat">
            {isOpen ? (
                <div className="w-80 max-w-xs sm:max-w-sm h-[32rem] bg-white border-2 border-blue-200 rounded-2xl shadow-2xl flex flex-col animate-fadeInPremium transition-all duration-300">
                    {/* Header */}
                    <ChatHeader onClear={handleClearChat} onClose={toggleChat} />
                    {/* Chat Area */}
                    <MessageList messages={messages} isBotTyping={isBotTyping} messagesEndRef={messagesEndRef} />
                    {/* Quick Replies */}
                    <div className="px-4 pb-2 -mt-2 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-thin">
                        {QUICK_REPLIES.map((qr) => (
                            <button
                                key={qr.label}
                                type="button"
                                className="px-4 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium border border-gray-200 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 hover:text-blue-700 transition mr-2 shadow-sm"
                                onClick={() => handleQuickReply(qr.value)}
                                disabled={isBotTyping}
                                aria-label={`Quick reply: ${qr.label}`}
                            >
                                {qr.label}
                            </button>
                        ))}
                    </div>
                    {/* Input Area */}
                    <InputArea inputValue={inputValue} setInputValue={setInputValue} handleSendMessage={handleSendMessage} isBotTyping={isBotTyping} inputRef={inputRef} />
                </div>
            ) : (
                <button
                    onClick={toggleChat}
                    className="bg-gradient-to-r from-blue-600 to-blue-400 text-white w-16 h-16 rounded-full shadow-2xl hover:bg-blue-700 transition-colors flex items-center justify-center animate-bounce border-4 border-white/60"
                    aria-label="Open chat"
                >
                    <ChatIcons.Chat />
                </button>
            )}
        </div>
    );
});

LiveChat.displayName = 'LiveChat';

export default LiveChat;