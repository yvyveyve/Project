import { createContext, useContext, useState } from 'react';
import api from '../utils/api';

const ChatbotContext = createContext();

export const useChatbot = () => {
    const context = useContext(ChatbotContext);
    if (!context) {
        throw new Error('useChatbot must be used within ChatbotProvider');
    }
    return context;
};

export const ChatbotProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! I'm your shopping assistant. I can help you find products, navigate the store, or show you trending items. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (text) => {
        // Add user message
        const userMessage = {
            id: messages.length + 1,
            text,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);

        setLoading(true);
        try {
            const { data } = await api.post('/chatbot/message', { message: text });

            if (data.success) {
                const botMessage = {
                    id: messages.length + 2,
                    text: data.data.text,
                    sender: 'bot',
                    timestamp: new Date(),
                    products: data.data.products,
                    action: data.data.action,
                    path: data.data.path,
                    suggestions: data.data.suggestions
                };
                setMessages(prev => [...prev, botMessage]);

                return botMessage;
            }
        } catch (error) {
            const errorMessage = {
                id: messages.length + 2,
                text: 'Sorry, I encountered an error. Please try again.',
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const closeChat = () => {
        setIsOpen(false);
    };

    const openChat = () => {
        setIsOpen(true);
    };

    const value = {
        isOpen,
        messages,
        loading,
        sendMessage,
        toggleChat,
        closeChat,
        openChat
    };

    return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
};
