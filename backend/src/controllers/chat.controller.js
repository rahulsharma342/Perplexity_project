import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../model/chat.model.js";
import messageModel from "../model/message.model.js";


export async function sendMessage(req, res) {
  try {
    const { message, chatId } = req.body;

    let title = null;
    let chat = null;

    if (!chatId) {
      title = await generateChatTitle(message);
      console.log("Generated chat title:", title);
      chat = await chatModel.create({
        user: req.user._id,
        title: title,
      });
    }

    const userMessage = await messageModel.create({
      chatId: chatId || chat._id,
      role: "user",
      content: message,
    });

    const messages = await messageModel
      .find({
        chatId: chatId || chat._id,
      })
      .sort({ createdAt: 1 });

    console.log("Chat history:", messages);
    const aiResponse = await generateResponse(messages);

    const aiMessage = await messageModel.create({
      chatId: chatId || chat._id,
      role: "ai",
      content: aiResponse,
    });

    res.status(200).json({
      title,
      chat,
      aiMessage,
    });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getChats(req, res) {
  try {
    const user = req.user;
    const chats = await chatModel
      .find({ user: user._id })
      .sort({ createdAt: -1 });
    res.status(200).json(chats);
  } catch (error) {
    console.error("Error in getChats:", error);
    res.status(500).json({ message: "chat received successfully" }, chats);
  }
}

export async function getMessages(req, res) {
  try {
    const { chatId } = req.params;
    const chat = await chatModel.findOne({ _id: chatId, user: req.user._id });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    const messages = await messageModel.find({ chatId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error);
    res.status(500).json({ message: "Failed to retrieve messages" });
  }
}

export async function deleteChat(req, res) {
  try {
    const { chatId } = req.params;
    const chat = await chatModel.findOneAndDelete({ _id: chatId, user: req.user._id });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    await messageModel.deleteMany({ chatId });
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Error in deleteChat:", error);
    res.status(500).json({ message: "Failed to delete chat" });
  }
}