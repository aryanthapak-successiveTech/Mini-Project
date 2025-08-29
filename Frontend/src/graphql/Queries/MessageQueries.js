import { gql } from "@apollo/client";

const GET_MESSAGES = gql`
    query GetMessages{
        getMessages{
            _id
            conversationId
            sender
            message
            createdAt
    }
  }
`

export {GET_MESSAGES};