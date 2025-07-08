import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { API_BASE_URL } from '../config/api';
import dayjs from 'dayjs';

// Simple NLP-like function for instant bot replies
const getBotReply = (text) => {
    const msg = text.toLowerCase();
    if (/\b(hi|hello|hey|namaste)\b/.test(msg)) return 'Hello! 👋 How can I help you today?';
    if (/\b(pricing|price|cost)\b/.test(msg)) return 'You can view our pricing plans on the Pricing page. Need a custom quote?';
    if (/\b(contact|email|phone|support)\b/.test(msg)) return 'You can contact us at support@webory.com or use this chat for quick help!';
    if (/\b(service|offer|solution|product)\b/.test(msg)) return 'We offer web development, design, SEO, consulting, and more! What are you interested in?';
    if (/\b(job|career|vacancy|hiring)\b/.test(msg)) return 'Check our Careers page for current openings or send your resume!';
    if (/\b(problem|issue|error|bug)\b/.test(msg)) return 'Sorry to hear that! Please describe your issue and we\'ll help you ASAP.';
    if (/\bthanks|thank you|shukriya\b/.test(msg)) return 'You\'re welcome! 😊';
    return null;
};

const LiveChat = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const socket = useRef(null);
    const messagesEndRef = useRef(null);
    const [isBotTyping, setIsBotTyping] = useState(false);

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
            console.log('Connected to chat server');
        });

        socket.current.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.current.on('disconnect', () => {
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
        setIsOpen(!isOpen);
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
            const botReply = getBotReply(inputValue);
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
    
    if (location.pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 max-w-full">
            {isOpen ? (
                <div className="w-80 max-w-xs sm:max-w-sm h-[28rem] bg-white/90 rounded-2xl shadow-2xl flex flex-col border border-gray-200 animate-fadeIn">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-4 rounded-t-2xl flex items-center justify-between relative">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/20 text-white text-lg font-bold">W</span>
                            <h3 className="text-lg font-semibold tracking-wide">Webory Support</h3>
                        </div>
                        <button onClick={toggleChat} className="text-white text-2xl font-bold absolute top-2 right-4 hover:text-red-200">&times;</button>
                    </div>
                    <div className="flex-1 p-3 overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex mb-2 ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                                {msg.sender === 'bot' && (
                                    <span className="mr-2 flex-shrink-0 h-8 w-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">🤖</span>
                                )}
                                <div className={`max-w-[70%] px-3 py-2 rounded-2xl shadow text-sm break-words transition-all duration-200
                                    ${msg.sender === 'bot' ? 'bg-white text-gray-800 border border-indigo-100' : 'bg-blue-500 text-white border border-blue-400'}`}
                                >
                                    {msg.text}
                                    <div className="text-[10px] text-gray-400 mt-1 text-right">{dayjs(msg.timestamp).format('HH:mm')}</div>
                                </div>
                                {msg.sender === 'user' && (
                                    <span className="ml-2 flex-shrink-0 h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold">🧑</span>
                                )}
                            </div>
                        ))}
                        {isBotTyping && (
                            <div className="flex items-center gap-2 mb-2">
                                <span className="mr-2 flex-shrink-0 h-8 w-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">🤖</span>
                                <div className="bg-white border border-indigo-100 px-3 py-2 rounded-2xl shadow text-sm animate-pulse">Typing...</div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="p-3 border-t bg-white/80 rounded-b-2xl flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            autoComplete="off"
                            disabled={isBotTyping}
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-indigo-600 transition disabled:opacity-50"
                            disabled={!inputValue.trim() || isBotTyping}
                        >
                            Send
                        </button>
                    </form>
                </div>
            ) : (
                <button
                    onClick={toggleChat}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white w-16 h-16 rounded-full shadow-2xl hover:from-blue-600 hover:to-indigo-600 transition-colors flex items-center justify-center animate-bounce"
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