import { useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { toast } from "react-toastify";

export function useChat(token: string) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [myUserId, setMyUserId] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const shownMessages = useRef(new Set<string>());

  useEffect(() => {
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.sub) {
        setMyUserId(payload.sub);
      } else {
        throw new Error("Campo 'sub' ausente no token.");
      }
    } catch {
      setMyUserId("");
      console.error("Falha ao decodificar o token.");
    }
  }, [token]);

  useEffect(() => {
    if (!token || !myUserId) return;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5008/chatHub", {
        accessTokenFactory: () => token,
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    newConnection.on("ReceiveMessage", (msg) => {
      const isMe = msg.senderId === myUserId;
      addMessage(msg, isMe);
    });

    newConnection.on("ReceiveConversation", (msgs: any[]) => {
      setMessages([]);
      shownMessages.current.clear();
      msgs.forEach((msg) => {
        const isMe = msg.senderId === myUserId;
        addMessage(msg, isMe);
      });
    });

    newConnection.onclose(() => {
      toast.error("Desconectado.");
      setIsConnected(false);
    });

    newConnection
      .start()
      .then(() => {
        setConnection(newConnection);
        setIsConnected(true);
      })
      .catch(() => {
        toast.error("Erro ao conectar.");
      });

    return () => {
      newConnection.stop();
    };
  }, [token, myUserId]);

  const sendMessage = async (receiverId: string, content: string) => {
    if (!connection || connection.state !== signalR.HubConnectionState.Connected) {
      toast.error("Conecte primeiro.");
      return;
    }
    try {
      await connection.invoke("SendMessage", { receiverId, content });
    } catch {
      toast.error("Erro ao enviar.");
    }
  };

  const getConversation = async (receiverId: string) => {
    if (!connection || connection.state !== signalR.HubConnectionState.Connected) {
      toast.error("Conecte primeiro.");
      return;
    }
    try {
      await connection.invoke("GetConversation", receiverId);
    } catch {
      toast.error("Erro ao buscar conversa.");
    }
  };

  const addMessage = (msg: any, isMe: boolean) => {
    if (shownMessages.current.has(msg.id)) return;
    shownMessages.current.add(msg.id);
    setMessages((prev) => [...prev, { ...msg, isMe, isLog: false }]);
  };

  return { sendMessage, getConversation, messages, isConnected };
}
