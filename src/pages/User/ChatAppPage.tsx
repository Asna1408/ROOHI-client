// ChatApp.tsx
import React, { useEffect, useState } from 'react';
import ConversationList from '../../components/User/ConversationList';
import MessageArea from '../../components/User/MessageArea';
import Header from '../../components/User/Header';
import Footer from '../../components/User/Footer';
import { useLocation } from 'react-router-dom';

const ChatApp: React.FC = () => {
  const [userName, setUserName] = useState<string>()

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const providerName = query.get('providerName') ?? '';

  useEffect(() => {
 
        setUserName(providerName);
    
  
  }, [providerName]);

  console.log("provider name in chat header ")

  return (
<>
<Header />
    <div className="flex h-screen">
      <ConversationList />
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 text-lg font-semibold">
          {userName}
        </div>
        <MessageArea    />
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ChatApp;
