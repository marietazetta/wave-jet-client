import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import messageServices from "../../services/message.services";
import { AuthContext } from "../../contexts/auth.context";
import "./Chat.css";

const Chat = () => {
    const { loggedUser, isLoading } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (!isLoading) {
            messageServices.getAllMessages()
                .then(response => setMessages(response.data))
                .catch(error => console.error("Error fetching messages:", error));
        }
    }, [isLoading]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!loggedUser) return;

        messageServices.saveMessage({
            message: newMessage,
            owner: loggedUser._id,
            ownerModel: loggedUser.role
        })
            .then(response => {
                setMessages([...messages, response.data]);
                setNewMessage("");
            })
            .catch(error => console.error("Error sending message:", error));
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <Container className="chat-container">
            <Row>
                <Col>
                    <div className="chat-box">
                        {messages.map((msg) => (
                            <div key={msg._id} className={`chat-message ${msg.ownerModel?.toLowerCase() || 'unknown'}`}>
                                <div className="message-owner">{msg.owner.username}</div>
                                <div className="message-text">{msg.message}</div>
                                <div className="message-time">{new Date(msg.createdAt).toLocaleTimeString()}</div>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={handleSendMessage} className="chat-form">
                        <Form.Group controlId="messageInput">
                            <Form.Control
                                type="text"
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary">Send</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Chat;
