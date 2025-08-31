import { gql } from "@apollo/client";

export const CREATE_CONVERSATION = gql`
  mutation CreateConversation {
    createConversation {
      _id
      userId
      createdAt
    }
  }
`;


