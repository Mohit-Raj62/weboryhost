import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { API_BASE_URL } from '../config/api';

const LiveChat = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const socket = useRef(null);
    const messagesEndRef = useRef(null);

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
            };
            socket.current.emit('sendMessage', message);
            setInputValue('');
        }
    };
    
    if (location.pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen ? (
                <div className="w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
                    <div className="bg-blue-500 text-white p-3 rounded-t-lg">
                        <h3 className="text-lg font-semibold">Webory Support</h3>
                        <button onClick={toggleChat} className="absolute top-2 right-2 text-white">&times;</button>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-2 ${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}>
                                <p className={`inline-block p-2 rounded-lg ${msg.sender === 'bot' ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
                                    {msg.text}
                                </p>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="p-2 border-t">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                            className="w-full p-2 border rounded-lg"
                        />
                    </form>
                </div>
            ) : (
                <button
                    onClick={toggleChat}
                    className="bg-blue-500 text-white w-16 h-16 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
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