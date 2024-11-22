import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Message from './Message';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { uploadImage } from '../../constant/CloudinaryService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";  
import {faImage, faMicrophone } from '@fortawesome/free-solid-svg-icons';  

interface MessageType {
  _id: string;
  conversationId: string;  
  senderId: string;
  text: string;
  imageUrl?: string;
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [typing,setTyping] = useState(false)
  const [istyping,setisTyping] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null);


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

    socket.on("typing" , () => setisTyping(true))
    socket.on("stop typing" , () => setisTyping(false))


    return () => {
      socket.disconnect();
    };
  }, [conId, socket]);

  useEffect(() => {
    if (activeChatId !== 'null' && conId !== 'null' && name !== null) 
      fetchMessages();
  }, [conId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTyping = (e: { target: { value: React.SetStateAction<string> } }) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  
    if (inputValue === '') {
      if (typing) {
        socket.emit("stop typing", conId);
        setTyping(false);
      }
      return;
    }
  
    if (!typing) {
      setTyping(true);
      socket.emit("typing", conId);
    }
  
    let lastTypingTime = new Date().getTime();
    const timeLength = 3000;
  
    setTimeout(() => {
      const timenow = new Date().getTime();
      const timeDiff = timenow - lastTypingTime;
  
      if (timeDiff >= timeLength && typing) {
        socket.emit("stop typing", conId);
        setTyping(false);
      }
    }, timeLength);
  };


  const handleSend = async () => {
    if (inputValue.trim() ||  imageFile) {
      socket.emit('stop typing', conId)
      try {

let imageUrl ='';
let audioUrl ='';

if(imageFile) {
  imageUrl = await uploadImage(imageFile);
  setImageFile(null);
  setInputValue(imageUrl)
console.log(imageUrl + "👍👍👍👍👍")
console.log(inputValue + "👍👍👍👍👍 😂😂😂")
}
console.log(imageUrl)

     if(inputValue !== ''){
      const newMessage = { conversationId: conId, senderId: currentUser._id, text: inputValue,imageUrl,audioUrl };
      console.log(newMessage)
      const res = await axios.post('/user/send-message', newMessage);
      socket.emit('notify', activeChatId);
      socket.emit('send-message', conId);
      setMessages([...messages, res.data]);
      setInputValue('');
     }
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setImageFile(e.target.files[0]); // Store the image file to send later
    }
};


const openFilePicker = () => {
  if (fileInputRef.current) {
      fileInputRef.current.click();
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
          <div className="flex flex-col ">
          {istyping ? <div className="pl-4 pb-2 text-gray-500">typing ...</div> : (<></>)} 
          <div className="p-4 border-t border-gray-200 flex items-center">
       
            <input
              type="text"
              value={inputValue}
              onChange={handleTyping}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded-md mr-3"
            />
 {/* Hidden File Input */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                        />

                        {/* <button onClick={openFilePicker} className="mr-3 text-gray-500 hover:text-gray-700">
                            📎 
                        </button> */}

                        <button onClick={openFilePicker} className="relative focus:outline-none pr-2">
                           <FontAwesomeIcon icon={faImage} className="h-4 w-4 text-customGold" />
                               
                        </button>
                        <button  className="relative focus:outline-none pr-2">
                           <FontAwesomeIcon icon={faMicrophone} className="h-4 w-4 text-customGold" />
                               
                        </button>
            <button  onClick={handleSend} className="text-white bg-custom-gradient p-2 rounded-full">
              ➤
            </button>
           

          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MessageArea;


