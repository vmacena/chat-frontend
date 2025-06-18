import styled from "styled-components";

export const ChatFooterContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #1e1e1e;
  border-top: 1px solid #444;
  position: relative;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px 14px;
  border-radius: 20px;
  border: none;
  background-color: #2a2a2a;
  color: white;
  outline: none;
`;

export const IconButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
  }
`;

export const EmojiButton = styled(IconButton)`
  background-color: transparent;
  color: white;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const EmojiWrapper = styled.div`
  position: relative;
`;
