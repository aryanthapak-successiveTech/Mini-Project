import { conversationMutationResolver, messageMutationResolver } from "./mutation.js";
import { messageQueryResolver } from "./query.js";
import { messageSubscriptionResolver } from "./subscription.js";

export const messageModules={
    Query:{
        ...messageQueryResolver
    },
    Mutation:{
        ...messageMutationResolver,...conversationMutationResolver
    },
    Subscription:{
        ...messageSubscriptionResolver
    }
}