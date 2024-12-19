
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../constant/axiosInstance';

 interface User {
  _id: string;
  name: string;
  avatar?: string;
}

interface Conversation {
  updatedAt: string | number | Date;
  _id: string;
  members: User[];
  lastMessage?: string;
}


const socket = io('www.perfect-bride.shop');


const ConversationList = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    // Connect to socket and emit user ID
    socket.emit("user-connected", currentUser._id);

    // Listen for online status updates
    socket.on("update-online-status", (onlineUserIds: string[]) => {
      setOnlineUsers(onlineUserIds);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axiosInstance.get(`/user/get-user-conversations/${currentUser._id}`);
        setConversations(response.data);
      } catch (error) {
        console.error('Failed to fetch conversations', error);
      }
    };

    fetchConversations();    
  }, [currentUser]);
  

const handleNavigate = (conId: string, provId: string, name: string)=>{
  navigate(`/chat?conId=${conId}&providerId=${provId}&providerName=${name}`);
}
  
// const handleNavigate = (conId: string, provId: string, name: string) => {
//   navigate('/chat', {
//     state: { conId, providerId: provId, providerName: name },
//   });
// };



  return (
    <div className="w-80 bg-gray-100 p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Messages</h2>
      <div>
        {conversations.length > 0 ? (
          conversations.map((conv) => {
            const partner = conv.members.find((member) => member._id !== currentUser._id);
            const isOnline = onlineUsers.includes(partner?._id || "");

            return (
              <div
                key={conv._id}
                onClick={() => {
                  handleNavigate(conv._id, partner?._id ?? '', partner?.name ?? '');

                }}
                className="flex items-center p-2 cursor-pointer rounded-md hover:bg-gray-200"
              >
                {/* Avatar with online indicator */}
                <div className="relative w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                  {partner?.avatar ? (
                    <img
                      src={partner.avatar}
                      alt={`${partner.name}'s avatar`}
                      className="rounded-full w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-bold text-gray-700">
                      {partner?.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                  
               
                    <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></div>
                </div>

                {/* Conversation details */}
                <div>
                  <p className="font-semibold">{partner?.name || 'Unknown User'}</p>
                  <p className="text-sm text-gray-600">
                    {conv.lastMessage || 'No messages yet'}
                  </p>
                  
                  <p className={`text-xs ${isOnline ? "text-green-500" : "text-gray-500"}`}>
                    {isOnline ? "Online" : "Offline"}
                  </p>

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
