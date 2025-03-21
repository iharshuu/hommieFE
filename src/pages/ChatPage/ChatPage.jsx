import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaInfoCircle, FaPaperclip, FaTimes } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { io } from "socket.io-client";
import axios from "axios";
import { backendUrl } from "../../lib/config";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// Connect to WebSocket server
const socket = io("http://localhost:8080");

const ChatPage = ({ userchat, handleChat }) => {
    const lastPart = userchat.email;
    const cred = JSON.parse(localStorage.getItem("cred"));
    const navigate = useNavigate();
    const [chatRoomId, setChatRoomId] = useState(null);
    const [chatroomname, setChatRoomname] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!cred?.email || !lastPart) return;

        const fetchOrCreateChatRoom = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}chat-room?email=${cred.email}&otherEmail=${lastPart}`);
                if (data.chatId) {
                    setChatRoomId(data.chatId);
                    setChatRoomname(data.chatName);
                    fetchMessages(data.chatId);
                } else {
                    const newChat = await axios.post(`${backendUrl}create-chat`, { userEmail: cred.email, senderid: lastPart });
                    setChatRoomId(newChat.data.chatId);
                    setChatRoomname(data.chatName);
                    fetchMessages(newChat.data.chatId);
                }
            } catch (error) {
                console.error("Error checking/creating chat room:", error);
            }
        };

        fetchOrCreateChatRoom();
    }, [cred?.email, lastPart]);

    const fetchMessages = async (chatId) => {
        try {
            const { data } = await axios.get(`${backendUrl}messages/${chatId}`);
            setMessages(data.messages || []);
            scrollToBottom();
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 6 * 1024 * 1024) {
            alert("File size should be less than 5MB");
            return;
        }

        if (file.type.startsWith("image/")) {
            setMediaType("image");
        } else if (file.type.startsWith("video/")) {
            setMediaType("video");
        } else if (file.type === "application/pdf") {
            setMediaType("pdf");
        } else {
            alert("Unsupported file type. Please upload an image, video, or PDF.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setMediaPreview(reader.result);
        };
        reader.readAsDataURL(file);

        setMedia(file);
    };

    const handleRemoveMedia = () => {
        setMedia(null);
        setMediaPreview(null);
        setMediaType(null);
    };

    const handleSendMessage = async () => {
        if (!message.trim() && !media) return;

        let mediaUrl = null;
        if (media) {
            try {
                const formData = new FormData();
                formData.append("file", media);
                formData.append("upload_preset", "chat-app");
                formData.append("cloud_name", "piyushproj");

                const uploadRes = await axios.post(
                    `https://api.cloudinary.com/v1_1/piyushproj/${mediaType === "pdf" ? "raw/upload" : mediaType === "image" ? "image/upload" : "video/upload"}`,
                    formData
                );
                mediaUrl = uploadRes.data.secure_url;
            } catch (error) {
                console.error("Error uploading media:", error);
                return;
            }
        }

        const newMessage = {
            chatId: chatRoomId,
            sender: cred?.email,
            text: message,
            mediaUrl,
            mediaType,
        };

        try {
            const { data } = await axios.post(`${backendUrl}send-message`, newMessage);
            socket.emit("new message", data.message);
            setMessage("");
            setMedia(null);
            setMediaPreview(null);
            setMediaType(null);
            scrollToBottom();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        if (!chatRoomId) return;

        socket.emit("join chat", chatRoomId);

        const handleMessageReceived = (newMessage) => {
            setMessages((prev) => {
                const messageExists = prev.some((msg) => msg._id === newMessage._id);
                if (!messageExists) {
                    return [...prev, newMessage];
                }
                return prev;
            });
            scrollToBottom();
        };

        socket.on("message received", handleMessageReceived);

        return () => {
            socket.off("message received", handleMessageReceived);
        };
    }, [chatRoomId]);

    const [chatRooms, setChatRooms] = useState([]);
    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}user-chats?email=${cred.email}&otherEmail=${lastPart}`);
                setChatRooms(data.existingChat);
            } catch (error) {
                console.error("Error fetching chat rooms:", error);
            }
        };

        fetchChatRooms();
    }, [cred.email]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return "Today";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else {
            return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
    };

    const groupMessagesByDate = (messages) => {
        return messages.reduce((groups, message) => {
            const date = formatDate(message.timestamp);
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
            return groups;
        }, {});
    };

    const groupedMessages = groupMessagesByDate(messages);

    return (
        <div className="flex h-screen">
            {/* Chat List */}
            <div className="w-1/3 bg-gray-100 p-4 border-r">
                <button
                    type="button"
                    onClick={() => handleChat()}
                    className="flex items-center text-grey font-bold py-2 rounded"
                >
                    <AiOutlineArrowLeft className="mr-2" /> Back
                </button>
                <h2 className="text-lg font-bold mb-4">Chats</h2>
                {chatRooms.map((chat , index) => {
                    const otherUser = chat.users.find(user => user.email !== cred.email);
                    return (
                        index === 0 && (
                        <div
                            key={chat._id}
                            className="flex items-center gap-3 p-3 bg-white rounded-lg shadow cursor-pointer"
                            onClick={() => setChatRoomId(chat._id)}
                        >
                            <FaUserCircle className="text-3xl text-gray-600" />
                            <div>
                                <p className="font-semibold">{userchat.name}</p>
                                <p className="text-sm text-gray-500">
                                    {chat.latestMessage ? `${chat.latestMessage.sender === cred._id ? "You" : userchat.name}: ${chat.latestMessage.text}` : "No messages yet"}
                                </p>
                            </div>
                        </div>
                        )
                    );
                })}
            </div>

            {/* Chat Window */}
            <div className="w-2/3 flex flex-col">
                <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <FaUserCircle className="text-3xl" />
                        <p className="font-semibold">{userchat.name}</p>
                    </div>
                    <FaInfoCircle className="text-xl cursor-pointer" />
                </div>

                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                    {Object.entries(groupedMessages).map(([date, messages]) => (
                        <div key={date}>
                            <div className="text-center text-gray-500 text-sm my-2">{date}</div>
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === cred._id ? "justify-end" : "justify-start"} mb-2`}>
                                    {msg.mediaUrl ? (
                                        msg.mediaType === "image" ? (
                                            <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === cred._id ? "bg-green-400 text-white" : "bg-gray-300 text-black"}`}>
                                                {msg.text}
                                                <img
                                                    src={msg.mediaUrl}
                                                    alt="Media"
                                                    className="w-full max-w-xs h-auto rounded-lg mt-2 object-cover"
                                                />
                                                <div className="text-xs text-gray-500 mt-1">{formatTime(msg.timestamp)}</div>
                                            </div>
                                        ) : msg.mediaType === "video" ? (
                                            <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === cred._id ? "bg-green-400 text-white" : "bg-gray-300 text-black"}`}>
                                                {msg.text}
                                                <video controls className="w-full max-w-xs h-auto rounded-lg mt-2 object-cover">
                                                    <source src={msg.mediaUrl} type="video/mp4" />
                                                </video>
                                                <div className="text-xs text-gray-500 mt-1">{formatTime(msg.timestamp)}</div>
                                            </div>
                                        ) : (
                                            <a href={msg.mediaUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                View PDF
                                            </a>
                                        )
                                    ) : (
                                        <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === cred._id ? "bg-green-400 text-white" : "bg-gray-300 text-black"}`}>
                                            {msg.text}
                                            <div className="text-xs text-gray-500 mt-1">{formatTime(msg.timestamp)}</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 bg-white border-t flex items-center">
                    <label className="cursor-pointer">
                        <FaPaperclip className="text-xl text-gray-600 mr-2" />
                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*, video/*, application/pdf" />
                    </label>

                    {mediaPreview && (
                        <div className="relative mr-2">
                            {mediaType === "image" ? (
                                <img src={mediaPreview} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                            ) : mediaType === "video" ? (
                                <video src={mediaPreview} className="w-12 h-12 object-cover rounded-lg" />
                            ) : (
                                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-lg">
                                    <span className="text-sm">PDF</span>
                                </div>
                            )}
                            <button onClick={handleRemoveMedia} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                                <FaTimes className="text-xs" />
                            </button>
                        </div>
                    )}

                    <input
                        type="text"
                        className="flex-grow p-2 border rounded-lg outline-none"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg" onClick={handleSendMessage}>
                        <IoIosSend className="text-xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
