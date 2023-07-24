import React, { useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox.jsx";
import Conversation from "../../components/Conversation/Conversation.jsx";
import LogoSearch from "../../components/LogoSearch/LogoSearch.jsx";
import NavIcons from "../../components/NavIcons/NavIcons.jsx";
import "./Chat.css";
import { useEffect } from "react";
import { userChats } from "../../api/ChatRequest.js";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const user = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  // Get the chat in chat section
  useEffect(() => {
    console.log("user: ", user);

    const getChats = async () => {
      try {
        const { data } = await userChats(user?._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user?._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io(`${process.env.REACT_APP_SOCKET_URL}`, {
      transports: ["websocket", "polling"],
    });
    socket.current.emit("join", { id: user?._id, ...user });
    socket.current.on("activeUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    console.log("send message: ", sendMessage);
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log("receive: ", data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user.id === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats?.map((chat) => (
              <div
                key={chat._id}
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={user?._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user?._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
