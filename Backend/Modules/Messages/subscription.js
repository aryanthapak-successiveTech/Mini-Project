import { pubsub } from "../../Server/pubsub.js";
export const messageSubscriptionResolver ={
    messageSent:{
        subscribe:(_,{conversationId},)=>{
            return pubsub.asyncIterableIterator(`MESSAGE_SENT_${conversationId}`);
        }
    }
}