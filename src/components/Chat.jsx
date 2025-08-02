import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection, disconnectSocket } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      console.log(chat.data.messages);

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    // Create socket connection
    const socketConnection = createSocketConnection();
    setSocket(socketConnection);

    // Join chat room
    socketConnection.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    // Listen for messages
    const handleMessageReceived = ({ firstName, lastName, text }) => {
      console.log(firstName + " :  " + text);
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, lastName, text },
      ]);
    };

    socketConnection.on("messageReceived", handleMessageReceived);

    // Cleanup function
    return () => {
      socketConnection.off("messageReceived", handleMessageReceived);
      // Don't disconnect here if you want to maintain connection across components
      // disconnectSocket();
    };
  }, [userId, targetUserId, user.firstName]);

  const sendMessage = () => {
    if (!socket || !newMessage.trim()) {
      return;
    }

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {`${msg.firstName}  ${msg.lastName}`}
                <time className="text-xs opacity-50"> 2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 border border-gray-500 text-white rounded p-2"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;