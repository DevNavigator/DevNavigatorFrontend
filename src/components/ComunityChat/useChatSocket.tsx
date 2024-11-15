import { useEffect, useState } from "react";
import io from "socket.io-client";

const useChatSocket = (
  token: any,
  setConnectedUsersCount: (count: number) => void
) => {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    if (token) {
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const newSocket = io(`${url}/chat`, {
        transports: ["websocket"],
        query: { token },
      });

      newSocket.on("connect", () => {
        console.log("Conectado al servidor de WebSocket");
      });

      newSocket.on("message", (data) => {
        console.log("Mensaje recibido del servidor:", data);
        setMessages((prevMessages: any) => [...prevMessages, data]);
      });

      newSocket.on("disconnect", () => {
        console.log("Desconectado del servidor de WebSocket");
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [token, setConnectedUsersCount]);

  const sendMessage: any = (message: string, username: string) => {
    if (socket && message) {
      console.log("Enviando mensaje:", message);
      socket.emit("message", {
        name: username,
        message,
      });
    }
  };

  return { messages, sendMessage };
};

export default useChatSocket;
