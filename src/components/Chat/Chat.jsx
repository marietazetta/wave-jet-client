import React, { useState, useEffect, useContext, useRef } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import messageServices from "../../services/message.services";
import { AuthContext } from "../../contexts/auth.context";
import ChatBox from "../../components/ChatBox/ChatBox";
import "./Chat.css";
import authServices from "../../services/auth.services";
<<<<<<< HEAD
import socket from '../../services/socket'; // Singleton socket instance
=======
import { io } from "socket.io-client";
>>>>>>> diego

const Chat = () => {
    const { loggedUser, isLoading } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [groupedMessages, setGroupedMessages] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
<<<<<<< HEAD

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
=======
    const socket = useRef(null);

    useEffect(() => {
        socket.current = io("http://localhost:5005");

        socket.current.on("connect", () => {
            socket.current.emit("registered-user", {
                userSocket: socket.current.id,
                userId: loggedUser._id,
            });
        });

        socket.current.on("receive-message", (message) => {
            setMessages((prevMessages) => {
                const exists = prevMessages.some((msg) => msg._id === message._id);
                if (exists) return prevMessages;
                return [...prevMessages, message];
            });
        });

        return () => {
            socket.current.disconnect();
        };
    }, [loggedUser]);

    useEffect(() => {
        if (!isLoading) {
            if (loggedUser.role === "Admin") {
                messageServices
                    .getAllMessages()
                    .then((response) => {
                        setMessages(response.data);
                    })
                    .catch((error) => console.error("Error fetching messages:", error));

                authServices
                    .getAllUsers()
                    .then((response) => {
                        setAllUsers(response.data);
                    })
                    .catch((error) => console.error("Error fetching users:", error));
            } else if (loggedUser.role === "User") {
                messageServices
                    .getAllMessages(loggedUser._id)
                    .then((response) => {
                        setMessages(response.data);
                    })
                    .catch((error) => console.error("Error fetching messages:", error));
>>>>>>> diego
            }
        };
        fetchData();
    }, [isLoading, loggedUser]);

    useEffect(() => {
        if (loggedUser?.role === "Admin") {
            const grouped = messages.reduce((acc, msg) => {
                const userId = msg.owner?._id === loggedUser._id ? msg.recipient?._id : msg.owner?._id;
                if (userId) {
                    if (!acc[userId]) acc[userId] = [];
                    acc[userId].push(msg);
                }
                return acc;
            }, {});
            setGroupedMessages(grouped);
        } else if (loggedUser?.role === "User") {
            const filteredMessages = messages.filter(
                (msg) =>
                    msg.owner?._id === loggedUser._id ||
                    msg.recipient?._id === loggedUser._id
            );
            setGroupedMessages({ [loggedUser._id]: filteredMessages });
        }
    }, [messages, loggedUser]);

    const handleSendMessage = async (e, recipientId) => {
        e.preventDefault();
        if (!loggedUser) return;

        const newMsg = {
            message: newMessage,
            owner: {
                _id: loggedUser._id,
                username: loggedUser.username,
            },
            ownerModel: loggedUser.role,
            recipient: recipientId,
        };

        messageServices
            .saveMessage(newMsg)
            .then((response) => {
                const addedMessage = response.data;
                setMessages((prevMessages) => [...prevMessages, addedMessage]);
                socket.current.emit("send-message", addedMessage);
                setNewMessage("");
            })
            .catch((error) => console.error("Error sending message:", error));
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            {loggedUser.role === "Admin" ? (
                <>
                    <DropdownButton id="dropdown-basic-button" title="Select User">
                        {allUsers.map((user) => (
                            <Dropdown.Item
                                key={user._id}
                                onClick={() => setSelectedUser(user._id)}
                            >
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
        </>
    );
};

export default Chat;
