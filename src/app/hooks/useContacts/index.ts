import { useState, useEffect } from "react";

export interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
}

export function useContacts(token: string) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5008/api/contacts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar contatos.");
        return res.json();
      })
      .then((data) => setContacts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  return { contacts, loading };
}
