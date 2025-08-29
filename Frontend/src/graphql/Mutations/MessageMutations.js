import { gql } from "@apollo/client";

export const SEND_MESSAGE=gql`
mutation SendMessage($text: String!) {
  sendMessage(text: $text) {
    _id
    conversationId
    sender
    message
    createdAt
  }
}
`