import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { API_BASE_URL } from '../config/api';
import dayjs from 'dayjs';
import axios from 'axios';

// Get OpenAI response from backend
async function getOpenAIResponse(message) {
  try {
    const res = await axios.post('/api/openai/chat', { message });
    return res.data.reply;
  } catch (err) {
    return "Sorry, I'm having trouble connecting to my brain right now!";
  }
}

// Quick replies for better UX
const QUICK_REPLIES = [
  { label: 'Pricing', value: 'What are your pricing plans?' },
  { label: 'Contact', value: 'How can I contact support?' },
  { label: 'Services', value: 'What services do you offer?' },
  { label: 'Careers', value: 'Are there any job openings?' },
  { label: 'Report Issue', value: 'I have a problem with the website.' },
  { label: 'Thanks', value: 'Thanks!' },
];

// Chat icons
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

// Main LiveChat component
const LiveChat = React.memo(() => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Hide chat on admin routes
  const shouldHideChat = useMemo(() => {
    return location.pathname.startsWith('/admin');
  }, [location.pathname]);

  // Socket connection for online status (optional, can be removed if not needed)
  useEffect(() => {
    if (shouldHideChat) return;
    socket.current = io(API_BASE_URL);
    socket.current.on('connect', () => setIsOnline(true));
    socket.current.on('disconnect', () => setIsOnline(false));
    return () => { socket.current?.disconnect(); };
  }, [shouldHideChat]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  // Toggle chat open/close
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

  // Send message handler
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
    // Get AI response from OpenAI
    const botReply = await getOpenAIResponse(inputValue);
    setMessages(prev => [...prev, {
      text: botReply,
      sender: 'bot',
      timestamp: new Date().toISOString(),
    }]);
    setIsBotTyping(false);
  }, [inputValue, isBotTyping]);

  // Clear chat
  const handleClearChat = useCallback(() => {
    setMessages([]);
    setHasShownWelcome(false);
  }, []);

  // Quick reply handler
  const handleQuickReply = useCallback((value) => {
    if (!isBotTyping) {
      setInputValue(value);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isBotTyping]);

  if (shouldHideChat) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-full">
      {isOpen ? (
        <div className="w-80 max-w-xs sm:max-w-sm h-[32rem] bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col animate-fadeInPremium transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 rounded-t-2xl border-b border-gray-100 bg-white">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white text-lg font-bold">S</span>
              <span className="font-bold text-blue-600 text-base tracking-wide">Sara AI</span>
              <span className={`ml-2 text-xs px-2 py-1 rounded font-semibold ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{isOnline ? '🟢' : '🔴'}</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={handleClearChat} title="Clear chat" className="p-1 rounded-full hover:bg-gray-100 transition">
                <ChatIcons.Clear />
              </button>
              <button onClick={toggleChat} title="Close chat" className="p-1 rounded-full hover:bg-gray-100 transition">
                <ChatIcons.Close />
              </button>
            </div>
          </div>
          {/* Chat Area */}
          <div className="flex-1 px-4 py-4 overflow-y-auto bg-white custom-scrollbar scrollbar-hide">
            {messages.map((msg, index) => (
              <div key={index} className={`flex mb-4 ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'} animate-fadeInUpPremium`}>
                {msg.sender === 'bot' && (
                  <span className="mr-2 flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-blue-600 font-bold">👱🏻‍♀️</span>
                )}
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-base break-words transition-all duration-200 ${msg.sender === 'bot' ? 'bg-gray-100 text-gray-900 border border-gray-200' : 'bg-blue-600 text-white border border-blue-700'}`}>
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
            {QUICK_REPLIES.map((qr) => (
              <button key={qr.label} type="button" className="px-4 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium border border-gray-200 hover:bg-blue-50 hover:text-blue-700 transition mr-2" onClick={() => handleQuickReply(qr.value)} disabled={isBotTyping}>{qr.label}</button>
            ))}
          </div>
          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="relative px-4 py-3 border-t border-gray-100 bg-white rounded-b-2xl flex items-center">
            <input ref={inputRef} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Type a message..." className="w-full pl-5 pr-12 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-base shadow-sm placeholder-gray-400" autoComplete="off" disabled={isBotTyping} />
            <button type="submit" className="absolute right-6 top-1/2 -translate-y-1/2 bg-blue-600 text-white w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-50" disabled={!inputValue.trim() || isBotTyping}><ChatIcons.Send /></button>
          </form>
        </div>
      ) : (
        <button onClick={toggleChat} className="bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center animate-bounce border-4 border-white/60">
          <ChatIcons.Chat />
        </button>
      )}
    </div>
  );
});

LiveChat.displayName = 'LiveChat';

export default LiveChat;