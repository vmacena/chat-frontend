import styled from "styled-components";

export const ContactListContainer = styled.div`
  width: 300px;
  background-color: #2b2b2b;
  color: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-right: 1px solid #444;
  position: relative;
  padding-bottom: 80px;
`;

export const ContactItem = styled.div<{ isSelected: boolean }>`
  padding: 12px;
  border-bottom: 1px solid #444;
  background-color: ${({ isSelected }) => (isSelected ? "#3c3c3c" : "transparent")};
  cursor: pointer;

  strong {
    display: block;
  }

  p {
    font-size: 0.85rem;
    color: #bbb;
    margin-top: 4px;
  }

  &:hover {
    background-color: #3a3a3a;
  }
`;

export const AddContactButton = styled.button`
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #1976d2;
  color: white;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;
