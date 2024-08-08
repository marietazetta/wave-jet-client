import React, { useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import "./ChatBox.css";

const ChatBox = ({ messages, onSendMessage, newMessage, setNewMessage, selectedUser }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="chat-box">
            <div className="messages-container">
                {messages.map((msg) => (
                    <div key={msg._id} className={`chat-message ${msg.ownerModel?.toLowerCase() || 'unknown'}`}>
                        <div className="message-owner">{msg.owner?.username || msg.recipient?.username || "Unknown User"}</div>
                        <div className="message-text">{msg.message}</div>
                        <div className="message-time">{new Date(msg.createdAt).toLocaleTimeString()}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <Form onSubmit={(e) => onSendMessage(e, selectedUser)} className="chat-form">
                <Form.Group controlId="messageInput" className="input-group">
                    <Form.Control
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                </Form.Group>
                <Button className="send-button" type="submit" variant="primary">Send</Button>
            </Form>
        </div>
    );
};

export default ChatBox;
