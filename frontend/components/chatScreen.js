import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import socket from "../services/socket";
import { fetchChatHistory } from "../services/api";

const ChatScreen = ({ route }) => {
  const { chatroomId, userId } = route.params;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch chat history 
    const fetchHistory = async () => {
      const chatHistory = await fetchChatHistory(chatroomId, userId);
      setMessages(chatHistory);
    };
    fetchHistory();

    // Join room 
    socket.emit("join_room", { room: chatroomId, username: userId });

    //  new messages
    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [chatroomId, userId]);

  const sendMessage = (message) => {
    const newMessage = {
      sender_id: userId,
      chatroom_id: chatroomId,
      content: message,
    };

    socket.emit("send_message", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatBubble message={item} />}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messageList}
      />
      <ChatInput onSend={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  messageList: { padding: 10 },
});

export default ChatScreen;
