'use client';

import React from "react";
import { Message as StyledMessage } from "./styles";
import { formatarDataMensagem } from "@/app/utils/dateFormatter";

interface ChatMessageProps {
  isMe: boolean;
  isLog: boolean;
  content: string;
  sentAt: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ isMe, isLog, content, sentAt }) => {
  return (
    <StyledMessage isMe={isMe} isLog={isLog}>
      {isLog ? (
        <i>{content}</i>
      ) : (
        <>
          <b>{isMe ? "Você" : "Outro"}:</b> {content}{" "}
          <i>({formatarDataMensagem(sentAt)})</i>
        </>
      )}
    </StyledMessage>
  );
};
