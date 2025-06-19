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

export const ContactItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected"
})<{ isSelected: boolean }>`
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

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const ModalContent = styled.div`
  background: #212121;
  padding: 1.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const EmailInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
