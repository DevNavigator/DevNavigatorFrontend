"use client";
import React, { useContext, useState } from "react";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { AuthContext } from "@/contexts/authContext";
import Button from "../Button/Button";
import useChatSocket from "@/components/ComunityChat/useChatSocket";

const Chat = () => {
  const { user, userExternal } = useContext(AuthContext);
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const token = user?.token || userExternal?.token;

  const { messages, sendMessage } = useChatSocket(token);

  const handleOpenChat = () => setOpen(!open);
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  if (user?.success || session?.user) {
    return (
      <>
        <button onClick={handleOpenChat}>
          <div className="fixed bottom-8 right-8 bg-secondary text-white p-4 rounded-full shadow-lg cursor-pointer text-3xl hover:bg-primary hover:text-secondary ease-in-out duration-300">
            <BsFillChatRightTextFill />
          </div>
        </button>

        {open && (
          <div className="fixed bottom-28 right-8 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Chat</h2>
            </div>
            <p className="text-sm text-gray-600">¡Bienvenid@ al chat!</p>
            <p className="text-sm text-gray-600 mt-4">
              Chatea con otros miembros de la comunidad
            </p>
            <div className="flex-1 mb-4 overflow-y-auto max-h-40">
              {messages.map((msg: any, index: any) => (
                <p key={index} className="text-sm text-gray-600">
                  <strong>{msg.name}:</strong> {msg.message}
                </p>
              ))}
            </div>
            <div className="flex items-center border-t border-gray-200 pt-2">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="w-full p-2 border border-gray-300 rounded-lg outline-none"
              />
              <Button
                onClick={handleSendMessage}
                className="ml-3 bg-secondary text-white rounded-lg"
              >
                Enviar
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export default Chat;
