import { useEffect, useState } from "react";
import io from "socket.io-client";

const useChatSocket = (token) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (token) {
      const newSocket = io("http://localhost:3000", {
        query: { token },
      });

      newSocket.on("connect", () => {
        console.log("Conectado al servidor de WebSocket");
        newSocket.emit("clients-changed", newSocket.id);
      });

      newSocket.on("message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      newSocket.on("disconnect", () => {
        console.log("Desconectado del servidor de WebSocket");
      });

      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [token]);

  const sendMessage = (message) => {
    if (socket && message) {
      socket.emit("message", {
        name: "Usuario",
        message,
      });
    }
  };

  return { messages, sendMessage };
};

export default useChatSocket;
