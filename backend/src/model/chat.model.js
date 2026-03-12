import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
      type: String,
      required: [true, "Chat title is required"],
      default: "New Chat",
        trim: true,
        maxlength: 100,
    }
},
{
    timestamps: true,
}
);

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;
