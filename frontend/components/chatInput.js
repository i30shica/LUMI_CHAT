import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatBubble = ({ message }) => {
  const isMine = message.sender_id === "user123"; // Replace with current user ID
  return (
    <View style={[styles.bubble, isMine ? styles.myBubble : styles.theirBubble]}>
      <Text style={styles.text}>{message.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: { padding: 10, borderRadius: 10, marginBottom: 10 },
  myBubble: { backgroundColor: "#DCF8C6", alignSelf: "flex-end" },
  theirBubble: { backgroundColor: "#F1F0F0", alignSelf: "flex-start" },
  text: { fontSize: 16 },
});

export default ChatBubble;
