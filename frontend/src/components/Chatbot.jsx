import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatbot } from '../context/ChatbotContext';
import ProductCard from './ProductCard';
import './Chatbot.css';

const Chatbot = () => {
    const navigate = useNavigate();
    const { isOpen, messages, loading, sendMessage, toggleChat, closeChat } = useChatbot();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.trim() && !loading) {
            const message = input;
            setInput('');
            const response = await sendMessage(message);

            // Handle navigation action
            if (response?.action === 'navigate' && response?.path) {
                setTimeout(() => {
                    navigate(response.path);
                    closeChat();
                }, 1000);
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
    };

    return (
        <>
            {!isOpen && (
                <button className="chat-toggle-btn" onClick={toggleChat}>
                    💬
                </button>
            )}

            {isOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <h3>Shopping Assistant</h3>
                        <button className="close-btn" onClick={closeChat}>
                            ✕
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((message) => (
                            <div key={message.id} className={`message ${message.sender}`}>
                                <div className="message-bubble">
                                    <p>{message.text}</p>

                                    {message.products && message.products.length > 0 && (
                                        <div className="message-products">
                                            {message.products.map(product => (
                                                <div key={product._id} className="mini-product-card" onClick={() => {
                                                    navigate(`/products/${product._id}`);
                                                    closeChat();
                                                }}>
                                                    <img src={product.images[0]} alt={product.title} />
                                                    <div>
                                                        <p className="mini-product-title">{product.title}</p>
                                                        <p className="mini-product-price">KSh {product.price.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {message.suggestions && message.suggestions.length > 0 && (
                                        <div className="message-suggestions">
                                            {message.suggestions.map((suggestion, idx) => (
                                                <button
                                                    key={idx}
                                                    className="suggestion-chip"
                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="message bot">
                                <div className="message-bubble">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chatbot-input-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="chatbot-input"
                            disabled={loading}
                        />
                        <button type="submit" className="send-btn" disabled={loading || !input.trim()}>
                            ➤
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chatbot;
