import Message from "../../Models/MessageModel.js" 
import Conversation from "../../Models/ConversationModel.js"
import sendPrompt from "../../utils/genAI.js";
import aiPrompt from "../../utils/prompt.js";
import { pubsub } from "../../Server/pubsub.js";
export const messageMutationResolver = {
    sendMessage:async(_,{text},{user})=>{
        const conversation=await Conversation.findOne({userId:user.userId});
        const newMessage=Message.create({
            conversationId:conversation._id,
            sender:"user",
            message:text
        });

        const aiResponse=await sendPrompt(aiPrompt(text));
        const aiMessage=await Message.create({
            conversationId:conversation._id,
            sender:"gemini",
            message:aiResponse
        });

         pubsub.publish("MESSAGE_SENT",{messageSent:aiMessage});
        return newMessage;
    }

};

export const conversationMutationResolver={
    createConversation:async(_,{},{user})=>{

        const existingConversation=await Conversation.findOne({userId:user.userId});
        if(existingConversation){
            return existingConversation;
        }
        const newConversation=await Conversation.create({userId:user.userId});
        const newConvo= newConversation.toObject();
        return newConvo;
    }
}