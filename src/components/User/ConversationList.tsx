// ConversationList.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface User {
  _id: string;
  name: string;
  avatar?: string;
}

interface Conversation {
  _id: string;
  members: User[];
  lastMessage?: string;
}

interface ConversationListProps {
  setActiveChat: (chatName: string) => void;
  setActiveChatId: (chatId: string) => void;
  setConId: (conId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ setActiveChat, setActiveChatId , setConId}) => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`/user/get-user-conversations/${currentUser._id}`);
        setConversations(response.data);
      } catch (error) {
        console.error("Failed to fetch conversations", error);
      }
    };

    fetchConversations();
  }, [currentUser]);

  return (
    <div className="w-80 bg-gray-100 p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Messages</h2>
      <input
        type="text"
        placeholder="Search for chats..."
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
    
      <div>
        {conversations.length > 0 ? (
          conversations.map((conv) => {
            // Get the conversation partner's data (exclude current user)
            const partner = conv.members.find((member) => member._id !== currentUser._id);

            return (
              <div
                key={conv._id}
                onClick={() => {
                    setActiveChat(partner ? partner.name : "Unknown User")
                    setActiveChatId(partner ? partner._id : "Unknown User")
                    setConId(conv._id);
                }}
                className="flex items-center p-2 cursor-pointer rounded-md hover:bg-gray-200"
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3">
                  {partner?.avatar ? (
                    <img src={partner.avatar} alt={`${partner.name}'s avatar`} className="rounded-full" />
                  ) : (
                    <span>{partner?.name?.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <p className="font-semibold">{partner?.name || "Unknown User"}</p>
                  <p className="text-sm text-gray-600">{conv.lastMessage || "No messages yet"}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No conversations found.</p>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
