'use client';

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "@/app/hooks/useChat";
import { ChatMessage } from "@/app/components/ChatMessage";
import ContactList, { ContactListHandle } from "@/app/components/ContactList";
import {
  PageWrapper,
  ChatContainer,
  ChatBody,
  Messages,
  Input,
  Button,
} from "./styles";
import ChatFooter from "@/app/components/ChatFooter";

const ChatPage: React.FC = () => {
  const [token, setToken] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [content, setContent] = useState("");
  const [ready, setReady] = useState(false);

  const { sendMessage, getConversation, messages, isConnected } = useChat(token);
  const contactListRef = useRef<ContactListHandle>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const rawToken = localStorage.getItem("token") || "";
    const trimmed = rawToken.trim();
    if (trimmed && trimmed.split(".").length === 3) {
      setToken(trimmed);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (receiverId && isConnected) {
      getConversation(receiverId);
    }
  }, [receiverId, isConnected]);

  if (!ready) return null;

  return (
    <PageWrapper>
      <ContactList ref={contactListRef} selectedId={receiverId} onSelect={setReceiverId} />
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
        <ChatFooter
          receiverId={receiverId}
          setReceiverId={setReceiverId}
          content={content}
          setContent={setContent}
          sendMessage={sendMessage}
          getConversation={getConversation}
          refreshContacts={() => contactListRef.current?.refreshContacts()}
          isConnected={isConnected}
        />

      </ChatContainer>
    </PageWrapper>
  );
};

export default ChatPage;
