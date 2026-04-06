import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(new Error(message));
  },
);

export async function getChats() {
  const response = await api.get("/api/chats");
  return response.data;
}

export async function getMessages(chatId) {
  const response = await api.get(`/api/chats/${chatId}/messages`);
  return response.data;
}

export async function sendMessage({ message, chatId }) {
  const response = await api.post("/api/chats/messages", {
    message,
    chatId,
  });
  return response.data;
}
export async function deleteChat(chatId) {
  const response = await api.delete(`/api/chats/delete/${chatId}`);
  return response.data;
}
