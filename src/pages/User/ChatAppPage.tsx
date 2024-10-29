// ChatApp.tsx
import React, { useState } from 'react';
import ConversationList from '../../components/User/ConversationList';
import MessageArea from '../../components/User/MessageArea';
import Header from '../../components/User/Header';
import Footer from '../../components/User/Footer';

const ChatApp: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string>('null');
  const [activeChatId, setActiveChatId] = useState<string>("null")
  const [conId, setConId] = useState<string>("null")
  console.log(activeChat, activeChatId, conId);

  return (
<>
<Header />
    <div className="flex h-screen">
      <ConversationList setActiveChat={setActiveChat} setActiveChatId={setActiveChatId} setConId={setConId}/>
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 text-lg font-semibold">
          {activeChat}
        </div>
        <MessageArea name={activeChat} activeChatId={activeChatId} conId={conId}  />
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ChatApp;
