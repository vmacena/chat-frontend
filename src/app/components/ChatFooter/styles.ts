import styled from "styled-components";

export const ChatContainer = styled.div`
  background-color: #212121;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  background-color: #1e1e1e;
  color: white;
  text-align: center;
  padding: 12px;
  border-bottom: 1px solid #333;
  font-weight: bold;
  font-size: 18px;
`;

export const StatusDot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: green;
  border-radius: 50%;
  margin-right: 8px;
`;

export const ChatFooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px;
  background: #1a1a1a;
  gap: 8px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  background: #2c2c2c;
  color: white;
  border: none;
  border-radius: 6px;
`;

export const Button = styled.button`
  padding: 10px 16px;
  background: #2979ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #1565c0;
  }
`;

export const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Message = styled.div<{ isMe: boolean; isLog: boolean }>`
  align-self: ${({ isMe }) => (isMe ? "flex-end" : "flex-start")};
  background: ${({ isMe }) => (isMe ? "#2979ff55" : "#ffffff")};
  color: ${({ isMe }) => (isMe ? "white" : "black")};
  padding: 8px 12px;
  border-radius: 12px;
  max-width: 70%;
  position: relative;
  font-size: 14px;

  i {
    display: block;
    font-size: 10px;
    margin-top: 4px;
    text-align: right;
    color: ${({ isMe }) => (isMe ? "#e3f2fd" : "#999")};
  }
`;
