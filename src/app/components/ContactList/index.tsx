'use client';

import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react';
import {
  ContactListContainer,
  ContactItem,
  AddContactButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  CloseButton,
  EmailInput,
  ModalActions,
  SubmitButton
} from './styles';
import { FiUserPlus, FiX, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
}

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
}

export type ContactListHandle = {
  refreshContacts: () => void;
};

const ContactList = forwardRef<ContactListHandle, Props>(
  ({ selectedId, onSelect }, ref) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');

    const fetchContacts = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch('http://localhost:5008/api/contacts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setContacts(await res.json());
    };

    const addContact = async () => {
      if (!email) return;
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch('http://localhost:5008/api/contacts/by-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        await fetchContacts();
        setShowModal(false);
        setEmail('');
      } else {
        toast.error('Erro ao adicionar contato.');
      }
    };

    useImperativeHandle(ref, () => ({ refreshContacts: fetchContacts }));
    useEffect(() => {
      fetchContacts();
    }, []);

    return (
      <ContactListContainer>
        {contacts.map(c => (
          <ContactItem
            key={c.id}
            isSelected={c.id === selectedId}
            onClick={() => onSelect(c.id)}
          >
            <strong>{c.name || '(sem nome)'}</strong>
            <p>{c.lastMessage}</p>
          </ContactItem>
        ))}
        <AddContactButton onClick={() => setShowModal(true)}>
          <FiUserPlus size={24} />
        </AddContactButton>

        {showModal && (
          <ModalOverlay onClick={() => setShowModal(false)}>
            <ModalContent onClick={e => e.stopPropagation()}>
              <ModalHeader>
                <h3>Adicionar contato</h3>
                <CloseButton onClick={() => setShowModal(false)}>
                  <FiX size={20} />
                </CloseButton>
              </ModalHeader>
              <EmailInput
                type="email"
                placeholder="Email do contato"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <ModalActions>
                <SubmitButton onClick={addContact}>
                  <FiPlus size={16} />
                </SubmitButton>
              </ModalActions>
            </ModalContent>
          </ModalOverlay>
        )}
      </ContactListContainer>
    );
  }
);

export default ContactList;
