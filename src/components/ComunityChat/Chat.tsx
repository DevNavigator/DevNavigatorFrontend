'use client';
import React, { useContext, useState } from 'react';
import { BsFillChatRightTextFill } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import { AuthContext } from '@/contexts/authContext';
import Button from '../Button/Button';
import useChatSocket from './useChatSocket';

const Chat = () => {
  const { user, userExternal } = useContext(AuthContext);
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [connectedUsersCount, setConnectedUsersCount] = useState<number>(
    Math.floor(Math.random() * 100) + 1
  );

  const token = user?.token || userExternal?.token;
  const { messages, sendMessage } = useChatSocket(
    token,
    setConnectedUsersCount
  );

  const handleOpenChat = () => setOpen(!open);
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message, user?.user?.name || userExternal?.user?.name);
      setMessage('');
    }
  };

  if (user?.success || session?.user) {
    return (
      <>
        <button onClick={handleOpenChat}>
          <div className="fixed bottom-8 right-8 bg-blue-800 text-white p-4 rounded-full shadow-lg cursor-pointer text-3xl hover:bg-white hover:text-black ease-in-out duration-300">
            <BsFillChatRightTextFill />
          </div>
        </button>

        {open && (
          <div className="fixed bottom-28 right-8 w-96 bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Chat de Comunidad</h2>
            </div>
            <p className="text-sm text-gray-600">¡Bienvenid@ al chat!</p>
            <p className="text-sm text-gray-600 mt-4">
              Chatea con otros miembros de la comunidad
            </p>
            <div className="mb-4 text-sm text-gray-600 flex items-center">
              <strong>Usuarios conectados:</strong>
              <span className="ml-2 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-green-600 font-bold">
                  {connectedUsersCount}
                </span>
              </span>
            </div>

            <div className="flex-1 mb-4 overflow-y-auto max-h-36 space-y-4">
              {messages.map((msg: any, index: any) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.name === user?.user?.name ||
                    msg.name === userExternal?.user?.name
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.name === user?.user?.name ||
                      msg.name === userExternal?.user?.name
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    {msg.name !== user?.user?.name &&
                      msg.name !== userExternal?.user?.name && (
                        <strong className="block">{msg.name}</strong>
                      )}
                    <span>{msg.message}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center border-t border-gray-200 pt-2">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full p-2 border border-gray-300 rounded-lg outline-none"
              />
              <Button
                onClick={handleSendMessage}
                className="ml-3 bg-blue-600 text-white rounded-lg"
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
