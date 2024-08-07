import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import messageServices from "../../services/message.services";
import { AuthContext } from "../../contexts/auth.context";
import ChatBox from "../../components/ChatBox/ChatBox";
import "./Chat.css";
import authServices from "../../services/auth.services";
import socket from '../../services/socket'; // Singleton socket instance

const Chat = () => {
    const { loggedUser, isLoading } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [groupedMessages, setGroupedMessages] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        // Event handler for receiving messages
        const handleReceiveMessage = (message) => {
            console.log('Message received:', message); // Debugging line
            setMessages(prevMessages => [...prevMessages, message]);
        };

        // Register socket event listeners
        socket.on('receive-message', handleReceiveMessage);

        // Clean up on component unmount
        return () => {
            socket.off('receive-message', handleReceiveMessage); // Cleanup
        };
    }, []); // Empty dependency array to run only once

    useEffect(() => {
        const fetchData = async () => {
            if (!isLoading) {
                try {
                    if (loggedUser.role === 'Admin') {
                        const messageResponse = await messageServices.getAllMessages();
                        setMessages(messageResponse.data);
                        const userResponse = await authServices.getAllUsers();
                        setAllUsers(userResponse.data);
                    } else if (loggedUser.role === 'User') {
                        const messageResponse = await messageServices.getAllMessages(loggedUser._id);
                        setMessages(messageResponse.data);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };
        fetchData();
    }, [isLoading, loggedUser]);

    useEffect(() => {
        const updateGroupedMessages = () => {
            if (loggedUser?.role === 'Admin') {
                const grouped = messages.reduce((acc, msg) => {
                    const userId = msg.owner?._id === loggedUser._id ? msg.recipient?._id : msg.owner?._id;
                    if (userId) {
                        if (!acc[userId]) acc[userId] = [];
                        acc[userId].push(msg);
                    }
                    return acc;
                }, {});
                setGroupedMessages(grouped);
            } else if (loggedUser?.role === 'User') {
                const filteredMessages = messages.filter(
                    msg => msg.owner?._id === loggedUser._id || msg.recipient?._id === loggedUser._id
                );
                setGroupedMessages({ [loggedUser._id]: filteredMessages });
            }
        };
        updateGroupedMessages();
    }, [messages, loggedUser]);

    const handleSendMessage = async (e, recipientId) => {
        e.preventDefault();
        if (!loggedUser) return;

        const newMsg = {
            message: newMessage,
            owner: {
                _id: loggedUser._id,
                username: loggedUser.username
            },
            ownerModel: loggedUser.role,
            recipient: recipientId
        };

        try {
            const response = await messageServices.saveMessage(newMsg);
            const addedMessage = response.data;
            console.log("Message sent:", addedMessage); // Debugging line
            socket.emit('send-message', addedMessage);
            setMessages(prevMessages => [...prevMessages, addedMessage]);
            setGroupedMessages(prevGroupedMessages => {
                const updatedGroupedMessages = { ...prevGroupedMessages };
                if (loggedUser.role === 'Admin') {
                    if (!updatedGroupedMessages[recipientId]) {
                        updatedGroupedMessages[recipientId] = [];
                    }
                    updatedGroupedMessages[recipientId].push(addedMessage);
                } else if (loggedUser.role === 'User') {
                    if (!updatedGroupedMessages[loggedUser._id]) {
                        updatedGroupedMessages[loggedUser._id] = [];
                    }
                    updatedGroupedMessages[loggedUser._id].push(addedMessage);
                }
                return updatedGroupedMessages;
            });
            setNewMessage(""); // Clear input field after sending
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <Container className="chat-container">
            <Row>
                <Col>
                    {loggedUser.role === 'Admin' ? (
                        <>
                            <DropdownButton id="dropdown-basic-button" title="Select User">
                                {allUsers.map(user => (
                                    <Dropdown.Item key={user._id} onClick={() => setSelectedUser(user._id)}>
                                        {user.username}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                            {selectedUser && (
                                <ChatBox
                                    messages={groupedMessages[selectedUser] || []}
                                    onSendMessage={(e) => handleSendMessage(e, selectedUser)}
                                    newMessage={newMessage}
                                    setNewMessage={setNewMessage}
                                    selectedUser={selectedUser}
                                />
                            )}
                        </>
                    ) : (
                        <ChatBox
                            messages={groupedMessages[loggedUser._id] || []}
                            onSendMessage={(e) => handleSendMessage(e, loggedUser._id)}
                            newMessage={newMessage}
                            setNewMessage={setNewMessage}
                            selectedUser={loggedUser._id}
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Chat;
