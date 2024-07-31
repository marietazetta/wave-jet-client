import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import messageServices from "../../services/message.services";
import { AuthContext } from "../../contexts/auth.context";
import ChatBox from "../../components/ChatBox/ChatBox";
import "./Chat.css";

const Chat = () => {
    const { loggedUser, isLoading } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [groupedMessages, setGroupedMessages] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (!isLoading) {
            if (loggedUser.role === 'Admin') {
                messageServices.getAllMessages()
                    .then(response => {
                        setMessages(response.data);
                    })
                    .catch(error => console.error("Error fetching messages:", error));
            } else if (loggedUser.role === 'User') {
                messageServices.getAllMessages(loggedUser._id)
                    .then(response => {
                        setMessages(response.data);
                    })
                    .catch(error => console.error("Error fetching messages:", error));
            }
        }
    }, [isLoading, loggedUser]);

    useEffect(() => {
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
    }, [messages, loggedUser]);

    const handleSendMessage = (e, recipientId) => {
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

        messageServices.saveMessage(newMsg)
            .then(response => {
                const addedMessage = response.data;
                console.log("New message added:", addedMessage);
                setMessages(prevMessages => [...prevMessages, addedMessage]);

                if (loggedUser.role === 'Admin') {
                    setGroupedMessages(prevGroupedMessages => {
                        const updatedGroupedMessages = { ...prevGroupedMessages };
                        if (!updatedGroupedMessages[recipientId]) {
                            updatedGroupedMessages[recipientId] = [];
                        }
                        updatedGroupedMessages[recipientId].push(addedMessage);
                        return updatedGroupedMessages;
                    });
                } else if (loggedUser.role === 'User') {
                    setGroupedMessages(prevGroupedMessages => {
                        const updatedGroupedMessages = { ...prevGroupedMessages };
                        if (!updatedGroupedMessages[loggedUser._id]) {
                            updatedGroupedMessages[loggedUser._id] = [];
                        }
                        updatedGroupedMessages[loggedUser._id].push(addedMessage);
                        return updatedGroupedMessages;
                    });
                }

                setNewMessage("");
            })
            .catch(error => console.error("Error sending message:", error));
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <Container className="chat-container">
            <Row>
                <Col>
                    {loggedUser.role === 'Admin' ? (
                        <>
                            <DropdownButton id="dropdown-basic-button" title="Select User">
                                {Object.keys(groupedMessages).map(userId => (
                                    <Dropdown.Item key={userId} onClick={() => setSelectedUser(userId)}>
                                        {groupedMessages[userId][0]?.owner?.username || groupedMessages[userId][0]?.recipient?.username || "Unknown User"}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                            {selectedUser && (
                                <ChatBox
                                    messages={groupedMessages[selectedUser] || []}
                                    onSendMessage={handleSendMessage}
                                    newMessage={newMessage}
                                    setNewMessage={setNewMessage}
                                    selectedUser={selectedUser}
                                />
                            )}
                        </>
                    ) : (
                        <ChatBox
                            messages={groupedMessages[loggedUser._id] || []}
                            onSendMessage={handleSendMessage}
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
