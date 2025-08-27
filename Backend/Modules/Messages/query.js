import Conversation from "../../Models/ConversationModel.js"
import Message from "../../Models/MessageModel.js"
export const messageQueryResolver = {
    getMessages:async(_,__,{userId})=>{
        const conversation=await Conversation.findOne({userId});
        const messages=await Message.find({conversationId:conversation._id});
        return messages;
    }
}
