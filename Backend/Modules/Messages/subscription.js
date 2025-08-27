import { pubsub } from "../../Server/pubsub.js";
export const messageSubscriptionResolver ={
    messageSent:{
        subscribe:(_,__,)=>{
            return pubsub.asyncIterableIterator("MESSAGE_SENT");
        }
    }
}