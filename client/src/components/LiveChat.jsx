import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { API_BASE_URL } from '../config/api';
import dayjs from 'dayjs';

// 🚀 SARA - NEXT-GEN AI ASSISTANT WITH ADVANCED FEATURES 2025 🚀

class SaraAI {
    constructor() {
        this.userName = null;
        this.userPreferences = {};
        this.conversationHistory = [];
        this.currentMood = 'friendly';
        this.contextMemory = new Map();
        this.responseCount = 0;
        this.userLocation = null;
        this.lastInteraction = null;
        
        // Advanced personality traits
        this.personality = {
            empathy: 0.8,
            humor: 0.7,
            professionalism: 0.9,
            creativity: 0.8
        };
        
        // Learning patterns
        this.userPatterns = {
            preferredTimeOfDay: null,
            commonQuestions: [],
            interests: [],
            communication_style: 'casual'
        };
    }

    // 🧠 ADVANCED CONTEXT UNDERSTANDING
    analyzeContext(message) {
        const context = {
            sentiment: this.analyzeSentiment(message),
            intent: this.detectIntent(message),
            urgency: this.detectUrgency(message),
            complexity: this.assessComplexity(message),
            personalInfo: this.extractPersonalInfo(message)
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

    // 🎯 INTENT DETECTION
    detectIntent(message) {
        const intents = {
            'pricing': /\b(price|cost|rate|budget|expensive|cheap|affordable|quote)\b/i,
            'support': /\b(help|support|problem|issue|fix|error|bug)\b/i,
            'information': /\b(what|how|when|where|why|tell me|explain)\b/i,
            'booking': /\b(book|schedule|appointment|meet|call|demo)\b/i,
            'complaint': /\b(complaint|complain|dissatisfied|unhappy|refund)\b/i,
            'praise': /\b(great|excellent|amazing|love|fantastic|awesome)\b/i
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

    // 🎨 DYNAMIC RESPONSE GENERATION
    generateResponse(message) {
        const context = this.analyzeContext(message);
        const response = this.getBaseResponse(message, context);
        
        // Add personality based on context
        const personalizedResponse = this.addPersonality(response, context);
        
        // Add follow-up suggestions
        const enhancedResponse = this.addFollowUpSuggestions(personalizedResponse, context);
        
        // Store conversation history
        this.conversationHistory.push({
            user: message,
            sara: enhancedResponse,
            context: context,
            timestamp: new Date().toISOString()
        });
        
        this.responseCount++;
        this.lastInteraction = new Date();
        
        return enhancedResponse;
    }

    // 📝 BASE RESPONSE SYSTEM (Enhanced)
    getBaseResponse(message, context) {
        const msg = message.toLowerCase();
        
        // 🌟 PERSONALIZED GREETINGS
        if (/\b(hi|hello|hey|namaste|good morning|good afternoon|good evening)\b/.test(msg)) {
            const timeBasedGreeting = this.getTimeBasedGreeting();
            const personalTouch = this.userName ? ` ${this.userName}` : '';
            return `${timeBasedGreeting}${personalTouch}! I'm Sara from Webory! 🌟 ${this.getContextualGreeting(context)}`;
        }

        // 💎 SMART PRICING WITH CONTEXT
        if (context.intent === 'pricing') {
            const urgencyBonus = context.urgency === 'high' ? ' I can fast-track a quote for you!' : '';
            return `Let's talk numbers! 💎 Our pricing starts from ₹15k for websites, ₹25k for e-commerce. Custom quotes available!${urgencyBonus} What's your project scope? 📊`;
        }

        // 🔧 INTELLIGENT SUPPORT
        if (context.intent === 'support') {
            const empathyLevel = context.sentiment === 'negative' ? 'I totally understand your frustration! ' : '';
            return `${empathyLevel}Sara's debugging mode activated! 🔧 I'm here to solve this step-by-step. Can you share more details about the issue? 💻⚡`;
        }

        // 🎯 SERVICES WITH SMART RECOMMENDATIONS
        if (/\b(service|offer|solution|product|what do you do)\b/.test(msg)) {
            const recommendations = this.getSmartRecommendations();
            return `I'd love to help you grow! 🎯 We offer: Web Dev | UI/UX | Digital Marketing | E-commerce | SEO | AI Solutions. ${recommendations} 🚀`;
        }

        // 📱 CONTACT WITH PREFERRED CHANNEL
        if (/\b(contact|email|phone|whatsapp|reach)\b/.test(msg)) {
            return `Let's connect! 📱 Choose your preferred way: WhatsApp: +91-94704-89367 | Email: weboryinfo@gmail.com | Or continue chatting here! I'm available 24/7! 🌐`;
        }

        // 💼 CAREER OPPORTUNITIES
        if (/\b(job|career|hiring|work|employment)\b/.test(msg)) {
            return `Join Team Webory! 💼 We're hiring talented folks! Remote-first | Flexible hours | Growth opportunities | Slide into our careers page! 🚀`;
        }

        // 🙏 GRATITUDE WITH FOLLOW-UP
        if (/\b(thanks|thank you|appreciate)\b/.test(msg)) {
            const followUp = this.getPersonalizedFollowUp();
            return `You're absolutely welcome! 🙏 ${followUp} Always happy to help amazing people like you! 💫`;
        }

        // 🌟 COMPANY INFO WITH STORYTELLING
        if (/\b(about|company|webory|story)\b/.test(msg)) {
            return `We're Webory - where digital dreams come true! 🌟 Founded by passionate creators, we've helped 500+ businesses transform their online presence. Innovation is our DNA! 🧬✨`;
        }

        // 🎨 PORTFOLIO WITH SOCIAL PROOF
        if (/\b(portfolio|work|example|project|showcase)\b/.test(msg)) {
            return `Our work speaks volumes! 🎨 500+ projects delivered | 50+ happy clients | 4.9★ rated | Check our latest work @webory_official! Which industry interests you? 📸`;
        }

        // 💻 TECH STACK WITH TREND AWARENESS
        if (/\b(technology|tech|stack|ai|ml|web3)\b/.test(msg)) {
            return `We're tech obsessed! 💻 Latest stack: React, Next.js, Node.js, Python, AI/ML, Web3, Blockchain ⛓️ | Always learning cutting-edge tech! What excites you? 🤖`;
        }

        // ⏰ SMART TIMELINE ESTIMATION
        if (/\b(time|duration|timeline|deadline|delivery)\b/.test(msg)) {
            const timeEstimate = this.getSmartTimeEstimate(context);
            return `Speed meets quality! ⏰ ${timeEstimate} | Agile sprints | Daily updates | Your timeline is our priority! When do you need to launch? 🎯`;
        }

        // 🔄 PROCESS WITH TRANSPARENCY
        if (/\b(process|how|work|methodology|approach)\b/.test(msg)) {
            return `Our proven process: 🔄 Discovery Call → Strategy → Design → Develop → Test → Launch → Optimize! Transparent workflow with daily updates! 📊`;
        }

        // 💳 FLEXIBLE PAYMENT OPTIONS
        if (/\b(payment|billing|invoice|emi|crypto)\b/.test(msg)) {
            return `Payment made simple! 💳 All methods accepted: UPI, Cards, Bank, Crypto! 30-70 milestone based | EMI options | Student discounts available! 🎓`;
        }

        // 🛠️ PROACTIVE SUPPORT
        if (/\b(support|maintenance|help|24x7)\b/.test(msg)) {
            return `Your success partner! 🛠️ 24/7 support | Free updates (60 days) | Dedicated Slack channel | Monthly health checks | We never leave you hanging! 🤝`;
        }

        // 🌍 GLOBAL PRESENCE
        if (/\b(location|global|remote|office)\b/.test(msg)) {
            return `Digital nomads at heart! 🌍 HQ: India | Clients: 20+ countries | Remote-first culture | Timezone flexible | Where are you located? 🕐`;
        }

        // ⚡ URGENCY HANDLING
        if (context.urgency === 'high') {
            return `Lightning mode activated! ⚡ I can see this is urgent. Let me connect you with our rapid response team immediately! What's the situation? 🚨`;
        }

        // 🤖 AI & AUTOMATION
        if (/\b(ai|artificial intelligence|chatbot|automation)\b/.test(msg)) {
            return `That's me! 🤖 I'm Sara, your AI assistant! We build smart chatbots, automation workflows, and AI-powered solutions. Want to create your own AI assistant? 🧠`;
        }

        // 💡 INNOVATION & TRENDS
        if (/\b(innovation|future|trending|latest|cutting edge)\b/.test(msg)) {
            return `Innovation drives us! 💡 We're experimenting with: AI, Web3, AR/VR, IoT, Blockchain | Always 2 steps ahead of trends! What's your vision? 🔮`;
        }

        // 🔒 SECURITY & PRIVACY
        if (/\b(security|privacy|safe|gdpr|ssl)\b/.test(msg)) {
            return `Your data fortress! 🔒 Bank-level security | GDPR compliant | SSL certificates | Regular security audits | Privacy by design! 🛡️`;
        }

        // 👋 INTELLIGENT GOODBYE
        if (/\b(bye|goodbye|see you|thanks|end)\b/.test(msg)) {
            const personalizedGoodbye = this.getPersonalizedGoodbye();
            return `${personalizedGoodbye} 🌟 Follow us @webory_official | Your digital journey starts here! Until next time! ✨`;
        }

        // 🎭 SMART DEFAULT RESPONSE
        return this.getIntelligentDefault();
    }

    // 🕐 TIME-BASED GREETINGS
    getTimeBasedGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        if (hour < 20) return "Good evening";
        return "Hey there";
    }

    // 🎯 CONTEXTUAL GREETING
    getContextualGreeting(context) {
        switch (context.sentiment) {
            case 'positive': return 'Love the positive energy! How can I help you shine brighter?';
            case 'negative': return 'I\'m here to turn things around! What\'s on your mind?';
            default: return 'Ready to create something amazing together?';
        }
    }

    // 🔮 SMART RECOMMENDATIONS
    getSmartRecommendations() {
        const recommendations = [
            'Based on current trends, I\'d recommend starting with a modern website!',
            'Most clients love our AI-powered solutions - very trending!',
            'E-commerce is booming - perfect timing to start selling online!',
            'SEO is crucial right now - let\'s get you ranking!'
        ];
        return recommendations[Math.floor(Math.random() * recommendations.length)];
    }

    // ⏰ SMART TIME ESTIMATION
    getSmartTimeEstimate(context) {
        const estimates = {
            'low': 'Simple projects: 1-2 weeks',
            'medium': 'Standard projects: 3-6 weeks',
            'high': 'Complex projects: 6-12 weeks'
        };
        return estimates[context.complexity] || 'MVP in 2 weeks | Full project 4-8 weeks';
    }

    // 🎭 PERSONALITY ENHANCEMENT
    addPersonality(response, context) {
        // Add humor for casual conversations
        if (context.sentiment === 'positive' && this.personality.humor > 0.5) {
            const humorous = ['😄', '🎉', '🚀', '💫', '✨'];
            response += ` ${humorous[Math.floor(Math.random() * humorous.length)]}`;
        }
        
        // Add empathy for support requests
        if (context.intent === 'support' && this.personality.empathy > 0.7) {
            response = "I totally get it! " + response;
        }
        
        return response;
    }

    // 🎯 FOLLOW-UP SUGGESTIONS
    addFollowUpSuggestions(response, context) {
        const suggestions = {
            'pricing': '\n\n💡 Quick suggestions:\n• Free consultation available\n• Custom quotes in 24 hours\n• Portfolio review included',
            'support': '\n\n🔧 Next steps:\n• Share screenshots if possible\n• Describe expected vs actual behavior\n• I can schedule a quick debug call',
            'information': '\n\n📚 Helpful resources:\n• Check our blog for tips\n• Free website audit available\n• Join our community for updates'
        };
        
        if (suggestions[context.intent]) {
            response += suggestions[context.intent];
        }
        
        return response;
    }

    // 🔄 PERSONALIZED FOLLOW-UP
    getPersonalizedFollowUp() {
        const followUps = [
            'What else can I help you with?',
            'Any other questions on your mind?',
            'Ready to take the next step?',
            'Curious about anything else?'
        ];
        return followUps[Math.floor(Math.random() * followUps.length)];
    }

    // 👋 PERSONALIZED GOODBYE
    getPersonalizedGoodbye() {
        const goodbyes = [
            'It was awesome chatting with you!',
            'Thanks for the great conversation!',
            'Hope I could help you today!',
            'Looking forward to working together!'
        ];
        return goodbyes[Math.floor(Math.random() * goodbyes.length)];
    }

    // 🎭 INTELLIGENT DEFAULT
    getIntelligentDefault() {
        const defaults = [
            'That\'s an interesting question! 🤔 I\'m Sara, and I\'d love to help you more. Could you give me a bit more context?',
            'Hey! Sara here! 💫 I want to make sure I give you the best answer. Can you tell me more about what you\'re looking for?',
            'Great question! 🌟 I\'m processing that... Could you elaborate a bit more so I can help you better?',
            'I love curious minds! 🧠 Let me understand your needs better. What specific area interests you most?'
        ];
        return defaults[Math.floor(Math.random() * defaults.length)];
    }

    // 📊 ANALYTICS & LEARNING
    getAnalytics() {
        return {
            totalConversations: this.conversationHistory.length,
            responseCount: this.responseCount,
            lastInteraction: this.lastInteraction,
            userPatterns: this.userPatterns,
            conversationHistory: this.conversationHistory.slice(-10) // Last 10 conversations
        };
    }

    // 🔄 CONTINUOUS LEARNING
    learn(feedback) {
        if (feedback.rating >= 4) {
            this.personality.empathy += 0.01;
            this.personality.humor += 0.01;
        }
        
        if (feedback.category) {
            this.userPatterns.interests.push(feedback.category);
        }
    }
}

// 🚀 SARA INSTANCE & MAIN FUNCTION
const sara = new SaraAI();

function getSaraResponse(message) {
    return sara.generateResponse(message);
}




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
                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white text-lg font-bold">S</span>
                            <span className="font-bold text-gray-900 text-base tracking-wide">Sara AI</span>
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