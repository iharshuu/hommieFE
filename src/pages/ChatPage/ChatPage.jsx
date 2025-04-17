import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaUserCircle, FaInfoCircle, FaPaperclip, FaTimes, FaMoneyBillWave } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { io } from "socket.io-client";
import axios from "axios";
import { backendUrl } from "../../lib/config";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "./utils"; // Import the debounce utility
import Navbar from "../../components/organisms/Navbar";
import { FaRupeeSign } from "react-icons/fa";
import { toast } from "sonner";
import jsPDF from "jspdf";


// Connect to WebSocket server
const socket = io("http://localhost:8080", {
    withCredentials: true,
    transports: [ "polling"],
    upgrade: true,
    forceNew: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
  });
const ChatPage = () => {
    const cred = JSON.parse(localStorage.getItem("cred"));
    const location = useLocation();
//   const data = location.state;
    const lastPart = location?.state || '';
    const navigate = useNavigate();
    const [chatRoomId, setChatRoomId] = useState(null);
    const [chatroomname, setChatRoomname] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    const messagesEndRef = useRef(null);
    const [userChatRooms, setUserChatRooms] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false)

    const [showPaymentModal, setShowPaymentModal] = useState(false);
const [paymentAmount, setPaymentAmount] = useState("");
const [paymentDescription, setPaymentDescription] = useState("");

    const handleSearch = useCallback(debounce(async (query) => {
        if (!query.trim() || !cred?.email) {
          setSearchResults([]);
          return;
        }
        
        try {
          const { data } = await axios.get(
            `${backendUrl}search-users?email=${cred.email}&searchQuery=${query}`
          );
          setSearchResults(data.users || []);
        } catch (error) {
          console.error("Error searching users:", error);
          setSearchResults([]);
        }
      }, 300), [cred?.email]);

      useEffect(() => {
        handleSearch(searchQuery);
      }, [searchQuery, handleSearch]);


      const startNewChat = async (user) => {
        try {
          const { data } = await axios.post(`${backendUrl}create-chat`, {
            userEmail: cred.email,
            senderid: user.email
          });
          
          setChatRoomId(data.chatId);
          setChatRoomname(data.chatName || user.name);
          fetchMessages(data.chatId);
          setSearchQuery("");
          setSearchResults([]);
          setShowSearchResults(false);
        } catch (error) {
          console.error("Error starting new chat:", error);
        }
      };


    useEffect(() => {
        if (!cred?.email) return;
        fetchUserChatRooms().then(rooms => setUserChatRooms(rooms));

        if(lastPart !==''){
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
    }
    }, [cred?.email, lastPart]);


    const fetchUserChatRooms = async () => {
        try {
          const { data } = await axios.get(`${backendUrl}user-chat-rooms?email=${cred.email}`);
          return data.chatRooms || [];
        } catch (error) {
          console.error("Error fetching chat rooms:", error);
          return [];
        }
      };

    const fetchMessages = async (chatId) => {
        try {
            const { data } = await axios.get(`${backendUrl}messages/${chatId}`);
            setMessages(data.messages || []);
            scrollToBottom();
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSendPayment = async () => {
        if (!paymentAmount || !paymentDescription) return;
      
        try {
          const paymentId = `pay_${Date.now()}`;
          
          const newMessage = {
            chatId: chatRoomId,
            sender: cred?.email,
            text: ` ${paymentAmount} - ${paymentDescription}`,
            mediaType: "payment",  // Add this field
            paymentData: {
              amount: parseFloat(paymentAmount),
              currency: "INR",
              status: "pending",
              paymentId,
              description: paymentDescription
            }
          };
      
          const { data } = await axios.post(`${backendUrl}send-message`, newMessage);
          socket.emit("new message", data.message);
          
          // Reset payment fields and close modal
          setPaymentAmount("");
          setPaymentDescription("");
          setShowPaymentModal(false);
          scrollToBottom();
        } catch (error) {
          console.error("Error sending payment request:", error);
        }
      };


      const generatePDF = async (status, paymentId, amount , property) => {
        const doc = new jsPDF();
      
        // Load Hommie logo
        const logoUrl = "https://hommiefe.vercel.app/assets/image-21V97lk_.png";
        const image = await fetch(logoUrl)
          .then(res => res.blob())
          .then(blob => new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          }));
      
        // Add Logo
        doc.addImage(image, "PNG", 80, 10, 50, 20);
      
        doc.setFontSize(18);
        doc.setTextColor(40, 40, 40);
        doc.text("Payment Receipt", 105, 40, { align: "center" });
      
        doc.setDrawColor(200);
        doc.line(20, 45, 190, 45); // top line
      
        doc.setFontSize(12);
        doc.setTextColor(60, 60, 60);
      
        const details = [
          ["Status", status.toUpperCase()],
          ["Name", cred?.name || "N/A"],
          ["Email", cred?.email || "N/A"],
          ['paidto', "Hommie"],
          ["Property Name", property],
    
          ["Payment ID", paymentId],
          ["Amount", ` ${(amount / 100).toLocaleString("en-IN")} Rs/-`],
          ["Date", new Date().toLocaleString()],
        ];
      
        let y = 55;
        details.forEach(([label, value]) => {
          doc.setFont(undefined, "bold");
          doc.text(`${label}:`, 25, y);
          doc.setFont(undefined, "normal");
          doc.text(`${value}`, 70, y);
          y += 10;
        });
      
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("Thank you for booking with Hommie!", 105, y + 10, { align: "center" });
      
        doc.save(`Hommie-Receipt-${paymentId}.pdf`);
      };
      
    
      const paymentHandler = async (price , property) => {
      //  e.preventDefault();
        try {
          const { data } = await axios.post(`${backendUrl}order`, {
            amount: price * 100,
            currency: "INR",
            receipt: new Date().getTime().toString(),
          });
    
          const options = {
            key: "rzp_test_REHiXvIdoU0pqW",
            amount: price * 100,
            currency: "INR",
            name: "Hommie",
            description: "Room Booking Payment",
            image: "https://hommiefe.vercel.app/assets/image-21V97lk_.png",
            order_id: data.id,
            handler: async (response) => {
              await axios.post(`${backendUrl}order/validate`, response);
              generatePDF("success", response.razorpay_payment_id, price * 100);
              toast.success("Payment Successful!");
            },
            prefill: {
              name: cred?.name || "Customer",
              email: cred?.email || "",
            },
            notes: {
              address: "Hommie Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };
    
          const rzp1 = new window.Razorpay(options);
          rzp1.on("payment.failed", function (response) {
            generatePDF("failed", response.error.metadata.payment_id, price * 100 , property);
            toast.failure("Payment Failed: " + response.error.description);
          });
    
          rzp1.open();
        } catch (error) {
          console.error("Error initiating payment:", error);
          toast.failure("Payment initiation failed.");
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

    const [selectchat, setSelectChat] = useState('');

    return (
        <>
              <Navbar />
        <div className="flex h-screen">
            {/* Chat List */}
            
            <div className="w-1/3 bg-gray-100 p-4 border-r">
        <div className="flex items-center gap-2 mb-4">
          
          <div className="relative flex-grow">
            <input
              type="text"
              className="w-full p-2 border rounded-lg outline-none"
              placeholder="Search users by email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
            />
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => startNewChat(user)}
                  >
                    <FaUserCircle className="text-2xl text-gray-600" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Existing Chat List */}
        <h2 className="text-lg font-bold mb-2">Your Chats</h2>
        {userChatRooms.map((chat) => {
          const otherUser = chat.participants[0] || {};
          return (
            <div
              key={chat._id}
              className="flex items-center gap-3 p-3 bg-white rounded-lg shadow cursor-pointer mb-2"
              onClick={() => {
                setChatRoomId(chat._id);
                setChatRoomname(chat.chatName);
                fetchMessages(chat._id);
                setSelectChat(chat.chatName.split('__SEP__')[0] === cred.email
                ? chat.chatName.split('__SEP__')[1]
                : chat.chatName.split('__SEP__')[0])
              }}
            >
              <FaUserCircle className="text-3xl text-gray-600" />
              <div className="flex-1">
              <p className="font-semibold">
  {chat.chatName.split('__SEP__')[0] === cred.email
    ? chat.chatName.split('__SEP__')[1]
    : chat.chatName.split('__SEP__')[0]}
</p>
                <p className="text-sm text-gray-500 truncate">
                  {chat.latestMessage?.text || "No messages yet"}
                </p>
              </div>
              <div className="text-xs text-gray-400">
                {formatTime(chat.latestMessage?.timestamp)}
              </div>
            </div>
          );
        })}
      </div>

            {(selectchat || lastPart) ? 
            <div className="w-2/3 flex flex-col">
                <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <FaUserCircle className="text-3xl" />
                        <p className="font-semibold">{selectchat !='' ? selectchat : lastPart}</p>
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
                                    {msg && msg.mediaType === "payment" ? (
  <div className={`px-4 py-2 rounded-lg max-w-xs bg-yellow-100 border border-yellow-300`}>
    <div className="flex items-center gap-2">
      <FaRupeeSign className="text-green-600" />
      <span className="font-semibold">Payment Request</span>
    </div>
    <div className="mt-1">
      <p>Amount: ₹{msg.text.split('-')[0]}</p>
      <p>For: {msg.text.split('-')[1]}</p>
      {/* <p>Status: <span className={`font-semibold ${
        msg.paymentData.status === 'completed' ? 'text-green-600' : 
        msg.paymentData.status === 'pending' ? 'text-yellow-600' : 
        'text-red-600'
      }`}>{msg.paymentData.status}</span></p> */}
    </div>
    {msg.sender === cred._id ? (
      <p className="text-xs text-gray-500 mt-1">You requested this payment</p>
    ) : (
      <div className="flex gap-2 mt-2">
        <button 
          className="px-3 py-1 bg-green-500 text-white rounded text-sm"
          onClick={() => paymentHandler(msg.text.split('-')[0] , msg.text.split('-')[1])}
        >
          Pay Now
        </button>
        {/* <button 
          className="px-3 py-1 bg-gray-300 rounded text-sm"
          onClick={() => }
        >
          Decline
        </button> */}
      </div>
    )}
    <div className="text-xs text-gray-500 mt-1">{formatTime(msg.timestamp)}</div>
  </div>
)  : msg?.mediaUrl  ? (
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

                {showPaymentModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-96">
      <h3 className="text-lg font-bold mb-4">Create Payment Request</h3>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Amount (₹)</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Enter amount"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Description</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="What's this payment for?"
          value={paymentDescription}
          onChange={(e) => setPaymentDescription(e.target.value)}
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setShowPaymentModal(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleSendPayment}
          disabled={!paymentAmount || !paymentDescription}
        >
          Send Request
        </button>
      </div>
    </div>
  </div>
)}

<div className="p-4 bg-white border-t flex items-center">
  {/* Existing file attachment button */}
  <label className="cursor-pointer">
    <FaPaperclip className="text-xl text-gray-600 mr-2" />
    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*, video/*, application/pdf" />
  </label>

  {/* Rupee payment button */}
  <button
    className="text-xl text-gray-600 mr-2"
    onClick={() => setShowPaymentModal(true)}
  >
    <FaRupeeSign />
  </button>

  {/* Message input (disabled when payment modal is open) */}
  <input
    type="text"
    className="flex-grow p-2 border rounded-lg outline-none"
    placeholder={showPaymentModal ? "Creating payment request..." : "Type a message..."}
    value={showPaymentModal ? "" : message}
    onChange={(e) => !showPaymentModal && setMessage(e.target.value)}
    onKeyDown={(e) => !showPaymentModal && e.key === "Enter" && handleSendMessage()}
    disabled={showPaymentModal}
  />

  {/* Send button */}
  <button 
    className="ml-2 p-2 bg-blue-500 text-white rounded-lg" 
    onClick={handleSendMessage}
    disabled={showPaymentModal}
  >
    <IoIosSend className="text-xl" />
  </button>
</div>
            </div>
            : <div className="flex flex-col justify-center w-2/3 items-center h-full bg-gray-100 text-center p-10">
            <img
              src="https://hommiefe.vercel.app/assets/image-21V97lk_.png"
              alt="Hommie"
              className="w-40 mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Select a chat</h2>
            <p className="text-gray-500">Start a conversation by selecting a chat from the list.</p>
          </div> }
        </div>
        </>
    );
};

export default ChatPage;