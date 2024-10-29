// Message.tsx
import React from 'react';
import { useSelector } from 'react-redux';

interface MessageProps {
  message: {
    _id: string;
    conversationId: string;
    senderId: string;
    text: string;
    createdAt: string;
    updatedAt?: string;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { currentUser } = useSelector((state: any) => state.user);

  const isCurrentUser = message.senderId === currentUser._id;

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`p-3 border border-gray-300 rounded-lg ${
          isCurrentUser ? 'bg-gray-200 text-right' : 'bg-white'
        } max-w-xs`}
      >
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
