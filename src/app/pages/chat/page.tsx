'use client';

import React, { useState, useEffect } from "react";
import { useChat } from "@/app/hooks/useChat";
import { ChatMessage } from "@/app/components/ChatMessage";
import {
  ChatContainer,
  ChatBody,
  ChatFooter,
  Messages,
  Input,
  Button,
} from "./styles";

const ChatPage: React.FC = () => {
  const [token, setToken] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [content, setContent] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const rawToken = localStorage.getItem("token") || "";
    const trimmed = rawToken.trim();
    if (trimmed && trimmed.split(".").length === 3) {
      setToken(trimmed);
      setReady(true);
    } else {
      console.error("Token ausente ou malformatado:", trimmed);
    }
  }, []);

  const { sendMessage, getConversation, messages, isConnected } = useChat(token);

  if (!ready) return null;

  return (
    <ChatContainer>
      <ChatBody>
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
      </ChatBody>
      <ChatFooter>
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
        />
        <Button
          onClick={() => {
            if (!receiverId || !content) {
              alert("Preencha ID do destinatário e a mensagem.");
              return;
            }
            if (!isConnected) {
              alert("Ainda não conectado ao servidor.");
              return;
            }
            sendMessage(receiverId, content);
            setContent("");
          }}
        >
          Enviar
        </Button>
        <Button
          onClick={() => {
            if (!receiverId) {
              alert("Preencha o ID do destinatário para buscar a conversa.");
              return;
            }
            if (!isConnected) {
              alert("Ainda não conectado ao servidor.");
              return;
            }
            getConversation(receiverId);
          }}
        >
          Buscar Conversa
        </Button>
      </ChatFooter>
    </ChatContainer>
  );
};

export default ChatPage;
