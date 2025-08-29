const { gql } = require("@apollo/client");

export const SUBSCRIBE_TO_MESSAGES = gql`
subscription MessageSent($conversationId: String!) {
  messageSent(conversationId: $conversationId) {
    _id
    conversationId
    sender
    message
    createdAt
  }
}`