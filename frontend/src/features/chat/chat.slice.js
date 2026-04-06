import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chat: [],
    messages: [],
    activeChat: null,
    loading: false,
    error: null,
  },
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload;
      state.loading = false;
      state.error = null;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
      state.error = null;
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addStreamChunk: (state, action) => {
      const lastMsg = state.messages[state.messages.length - 1];
      if (lastMsg && (lastMsg.role === "ai" || lastMsg.role === "assistant")) {
        lastMsg.content += action.payload; // chunk append karo
      } else {
        state.messages.push({ role: "ai", content: action.payload });
      }
    },
  },
});

export const {
  setChat,
  setMessages,
  setActiveChat,
  setLoading,
  setError,
  addStreamChunk,
} = chatSlice.actions;

export default chatSlice.reducer;
