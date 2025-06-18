'use client';

import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { ContactListContainer, ContactItem, AddContactButton } from './styles';
import { FiUserPlus } from 'react-icons/fi';
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

const ContactList = forwardRef<ContactListHandle, Props>(({ selectedId, onSelect }, ref) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchContacts = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const res = await fetch('http://localhost:5008/api/contacts', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setContacts(data);
    }
  };

  useImperativeHandle(ref, () => ({ refreshContacts: fetchContacts }));

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddContact = async () => {
    const email = prompt('Digite o email do contato');
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
    } else {
      toast.error('Erro ao adicionar contato.');
    }
  };

  return (
    <ContactListContainer>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          isSelected={contact.id === selectedId}
          onClick={() => onSelect(contact.id)}
        >
          <strong>{contact.name || '(sem nome)'}</strong>
          <p>{contact.lastMessage}</p>
        </ContactItem>
      ))}
      <AddContactButton onClick={handleAddContact}>
        <FiUserPlus size={24} />
      </AddContactButton>
    </ContactListContainer>
  );
});

export default ContactList;
