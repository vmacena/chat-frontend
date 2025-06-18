import React, { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Smile, Send } from "lucide-react";
import {
  ChatFooterContainer,
  Input,
  IconButton,
  EmojiWrapper,
  EmojiButton,
} from "./styles";

interface ChatFooterProps {
  receiverId: string;
  setReceiverId: (v: string) => void;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (receiverId: string, content: string) => void;
  getConversation: (receiverId: string) => void;
  refreshContacts: () => void;
  isConnected: boolean;
}

const ChatFooter: React.FC<ChatFooterProps> = ({
  receiverId,
  content,
  setContent,
  sendMessage,
  getConversation,
  refreshContacts,
  isConnected,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSend = async () => {
    if (!receiverId || !content.trim() || !isConnected) return;
    await sendMessage(receiverId, content);
    await getConversation(receiverId);
    refreshContacts();
    setContent("");
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setContent((prev: string) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <ChatFooterContainer>
      <Input
        placeholder="Mensagem"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />

      <EmojiWrapper>
        <EmojiButton onClick={() => setShowEmojiPicker((v) => !v)}>
          <Smile size={22} />
        </EmojiButton>
        {showEmojiPicker && (
          <div style={{ position: "absolute", bottom: "55px", right: "60px", zIndex: 1000 }}>
            <EmojiPicker onEmojiClick={handleEmojiClick} lazyLoadEmojis />
          </div>
        )}
      </EmojiWrapper>

      <IconButton onClick={handleSend}>
        <Send size={20} />
      </IconButton>
    </ChatFooterContainer>
  );
};

export default ChatFooter;
