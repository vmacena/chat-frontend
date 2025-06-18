import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #212121;
`;

export const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Message = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isMe" && prop !== "isLog"
})<{ isMe: boolean; isLog: boolean }>`
  align-self: ${({ isMe, isLog }) =>
    isLog ? "center" : isMe ? "flex-end" : "flex-start"};
  background-color: ${({ isMe, isLog }) =>
    isLog ? "transparent" : isMe ? "#cce4ff" : "#ffffff"};
  color: #000000;
  padding: 10px 14px;
  border-radius: 18px;
  max-width: 80%;
  font-size: 14px;
  font-style: ${({ isLog }) => (isLog ? "italic" : "normal")};
  border-bottom-right-radius: ${({ isMe, isLog }) =>
    isLog ? "18px" : isMe ? "0" : "18px"};
  border-bottom-left-radius: ${({ isMe, isLog }) =>
    isLog ? "18px" : isMe ? "18px" : "0"};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
`;

export const ChatFooter = styled.div`
  display: flex;
  padding: 12px;
  gap: 8px;
  background-color: #1e1e1e;
  border-top: 1px solid #333;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px 14px;
  border-radius: 20px;
  border: none;
  background-color: #2e2e2e;
  color: #ffffff;
  font-size: 14px;
  &::placeholder {
    color: #aaaaaa;
  }
`;

export const Button = styled.button`
  padding: 10px 16px;
  background-color: #128c7e;
  border: none;
  border-radius: 20px;
  color: #ffffff;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #075e54;
  }
`;
