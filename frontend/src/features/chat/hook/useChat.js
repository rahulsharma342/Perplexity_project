import { useDispatch, useSelector } from "react-redux";
import {
  getChats,
  getMessages,
  sendMessage,
  deleteChat,
} from "../services/chat.api";
import {
  setChat,
  setMessages,
  setActiveChat,
  setLoading,
  setError,
} from "../chat.slice";

export function useChat() {
  const dispatch = useDispatch();

  // ✅ Redux se data read karo
  const { chat, messages, activeChat, loading, error } = useSelector(
    (state) => state.chat,
  );

  const fetchChats = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getChats();
      dispatch(setChat(data.chats || []));
    } catch (error) {
      dispatch(setError(error.message || "Failed to fetch chats"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      dispatch(setLoading(true));
      const data = await getMessages(chatId);
      dispatch(setMessages(data.messages || []));
    } catch (error) {
      dispatch(setError(error.message || "Failed to fetch messages"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSendMessage = async ({ message, chatId }) => {
    try {
      dispatch(setLoading(true));
      const data = await sendMessage({ message, chatId });

      if (data.chat) {
        dispatch(setActiveChat(data.chat));
      }

      dispatch(setMessages(data.messages || []));
      await fetchChats();
    } catch (error) {
      dispatch(setError(error.message || "Failed to send message"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ✅ deleteChat add kiya
  const handleDeleteChat = async (chatId) => {
    try {
      dispatch(setLoading(true));
      await deleteChat(chatId);
      // Chat delete hone ke baad fresh list lo
      await fetchChats();
    } catch (error) {
      dispatch(setError(error.message || "Failed to delete chat"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ✅ activeChat set karne ka function
  const handleSelectChat = async (chat) => {
    dispatch(setActiveChat(chat));
    await fetchMessages(chat._id);
  };

  return {
    // Data
    chat,
    messages,
    activeChat,
    loading,
    error,
    // Functions
    fetchChats,
    fetchMessages,
    handleSendMessage,
    handleDeleteChat,
    handleSelectChat,
  };
}
