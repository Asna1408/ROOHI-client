import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Message from './Message';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

interface MessageType {
  _id: string;
  conversationId: string;  
  senderId: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
}

interface MessageAreaProps {
  activeChatId: string | null;
  conId: string;
  name: string;
}

const MessageArea: React.FC<MessageAreaProps> = ({ activeChatId, conId, name }) => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const socket = io('http://localhost:7000');

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/user/get-messages/${conId}`);
      setMessages(res.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    socket.emit('join room', conId);

    socket.on('join room', (data) => {
      console.log("Joined room:", data);
    });

    socket.on('send-message', (data) => {
      if (data === conId) {
        fetchMessages();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [conId, socket]);

  useEffect(() => {
    if (activeChatId !== 'null' && conId !== 'null' && name !== null) fetchMessages();
  }, [conId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (inputValue.trim()) {
      try {
        const newMessage = { conversationId: conId, senderId: currentUser._id, text: inputValue };
        const res = await axios.post('/user/send-message', newMessage);
        socket.emit('send-message', conId);
        
        setMessages([...messages, res.data]);
        setInputValue('');
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      {activeChatId !== 'null' && conId !== 'null' && name !== null && (
        <>
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3"
            style={{ maxHeight: '80vh', scrollbarWidth: 'none', msOverflowStyle: 'none' }} // For Firefox
          >
            <style>
              {`
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            {messages.map((message) => (
              <Message key={message._id} message={message} />
            ))}
            <div ref={messageEndRef} />
          </div>
          <div className="p-4 border-t border-gray-200 flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded-md mr-3"
            />
            <button onClick={handleSend} className="text-white bg-custom-gradient p-2 rounded-full">
              ➤
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MessageArea;
