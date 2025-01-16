import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const api = axios.create({
  baseURL: SERVER_URL,
});

export const fetchChatHistory = async (chatroomId, userId) => {
  const response = await api.get(`/api/chat/history`, {
    params: { chatroom_id: chatroomId, user_id: userId },
  });
  return response.data;
};

export const uploadMedia = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/api/chat/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.media_url;
};

export default api;
