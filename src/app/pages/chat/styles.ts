import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: #212121;
`;

export const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: white;
`;

export const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

export const ChatFooter = styled.div`
  display: flex;
  padding: 10px;
  background-color: #1e1e1e;
  border-top: 1px solid #333;
`;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 8px;
  background-color: #2a2a2a;
  border: none;
  color: white;
  margin-right: 10px;
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 8px 12px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #5c6bc0;
  }
`;
