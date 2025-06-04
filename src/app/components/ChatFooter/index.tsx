import React from "react";
import { ChatFooterContainer, Input, Button } from "./styles";

interface ChatFooterProps {
  receiverId: string;
  setReceiverId: (v: string) => void;
  content: string;
  setContent: (v: string) => void;
  sendMessage: (receiverId: string, content: string) => void;
  getConversation: (receiverId: string) => void;
  isConnected: boolean;
}

const ChatFooter: React.FC<ChatFooterProps> = ({
  receiverId,
  setReceiverId,
  content,
  setContent,
  sendMessage,
  getConversation,
  isConnected,
}) => {
  return (
    <ChatFooterContainer>
      <Input
        type="text"
        placeholder="ID do destinatário"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Mensagem"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        onClick={() => {
          if (!receiverId || !content || !isConnected) return;
          sendMessage(receiverId, content);
          setContent("");
        }}
      >
        Enviar
      </Button>
      <Button
        onClick={() => {
          if (!receiverId || !isConnected) return;
          getConversation(receiverId);
        }}
      >
        Buscar Conversa
      </Button>
    </ChatFooterContainer>
  );
};

export default ChatFooter;
