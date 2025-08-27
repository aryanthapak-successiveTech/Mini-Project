import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const conversationModel = mongoose.model("Conversation", conversationSchema);

export default conversationModel;