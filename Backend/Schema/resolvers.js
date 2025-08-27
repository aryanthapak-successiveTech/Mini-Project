import { messageModules } from "../Modules/Messages/index.js";

export const resolvers = {
    Query:{
        ...messageModules.Query
    },
    Mutation:{
        ...messageModules.Mutation
    },
    Subscription:{
        ...messageModules.Subscription
    }
};