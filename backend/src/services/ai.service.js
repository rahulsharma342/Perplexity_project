import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";
import { ChatMistralAI } from "@langchain/mistralai";

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const googleModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.API_KEY,
});

export async function generateResponse(userMessage) {
  try {
    const history = userMessage
      .map((msg) => {
        if (msg.role === "user") return new HumanMessage(msg.content);
        if (msg.role === "ai") return new AIMessage(msg.content);
        return null;
      })
      .filter(Boolean);

    const response = await googleModel.invoke(history);
    return response.text;
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Failed to generate response");
  }
}

export async function generateChatTitle(userMessage) {
  try {
    const response = await mistralModel.invoke([
      new SystemMessage(
        "You are a helpful assistant that generates concise and descriptive titles for chat conversations in the 2 to 5 words .",
      ),
      new HumanMessage(
        `Generate a title for the following chat conversation: ${userMessage}`,
      ),
    ]);
    return response.text;
  } catch (error) {
    console.error("Error generating chat title:", error);
    throw new Error("Failed to generate chat title");
  }
  return response.text;
}
