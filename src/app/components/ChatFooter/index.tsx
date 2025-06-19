import React, { useRef, useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Paperclip, Smile, Send } from "lucide-react";
import {
  ChatFooterContainer,
  Input,
  ActionButton,
  SendButton,
  EmojiWrapper,
} from "./styles";
import { useUploadFile } from "@/app/hooks/useUploadFile";

interface ChatFooterProps {
  receiverId: string;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (receiverId: string, content: string) => Promise<void>;
  getConversation: (receiverId: string) => Promise<void>;
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile } = useUploadFile();

  const handleSend = async () => {
    if (!receiverId || !content.trim() || !isConnected) return;
    await sendMessage(receiverId, content);
    await getConversation(receiverId);
    refreshContacts();
    setContent("");
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setContent(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileButton = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isConnected && receiverId) {
      await uploadFile(file, receiverId);
      await getConversation(receiverId);
      refreshContacts();
    }
    e.target.value = "";
  };

  return (
    <ChatFooterContainer>
      <EmojiWrapper>
        <ActionButton onClick={() => setShowEmojiPicker(v => !v)}>
          <Smile size={22} />
        </ActionButton>
        {showEmojiPicker && (
          <div style={{ position: "absolute", bottom: "55px", right: "60px", zIndex: 1000 }}>
            <EmojiPicker onEmojiClick={handleEmojiClick} lazyLoadEmojis />
          </div>
        )}
      </EmojiWrapper>

      <Input
        placeholder="Mensagem"
        value={content}
        onChange={e => setContent(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
      />

      <ActionButton onClick={handleFileButton}>
        <Paperclip size={20} />
      </ActionButton>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <SendButton onClick={handleSend}>
        <Send size={20} />
      </SendButton>
    </ChatFooterContainer>
  );
};

export default ChatFooter;
