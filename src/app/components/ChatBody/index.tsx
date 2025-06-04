'use client';

import React from "react";
import { Messages, ChatBodyWrapper } from "./styles";
import { ChatMessage } from "@/app/components/ChatMessage";

interface Props {
  messages: {
    isMe: boolean;
    isLog: boolean;
    content: string;
    sentAt: string;
  }[];
}

export const ChatBody: React.FC<Props> = ({ messages }) => {
  return (
    <ChatBodyWrapper>
      <Messages>
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            isMe={msg.isMe}
            isLog={msg.isLog}
            content={msg.content}
            sentAt={msg.sentAt}
          />
        ))}
      </Messages>
    </ChatBodyWrapper>
  );
};
