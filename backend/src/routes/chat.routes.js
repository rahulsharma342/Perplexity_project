import express from 'express';
import { sendMessage , getChats ,getMessages , deleteChat} from '../controllers/chat.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const chatRouter = express.Router();

chatRouter.get("/", authMiddleware, getChats);

chatRouter.post("/messages", authMiddleware, sendMessage);

chatRouter.get("/:chatId/messages", authMiddleware, getMessages);

chatRouter.delete("/delete/:chatId", authMiddleware, deleteChat);








export default chatRouter;  