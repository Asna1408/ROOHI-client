import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { uploadAudio, uploadImage } from '../../constant/CloudinaryService';
import InputEmoji from 'react-input-emoji'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";  
import { faImage, faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import Message from './Message';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../constant/axiosInstance';

interface MessageType {
  _id: string;
  conversationId: string;  
  senderId: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
}


const MessageArea = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  
  const [chatId, setChatId] = useState<string>();
  const [provId, setProvId] = useState<string>();
  const [userName, setUserName] = useState<string>()

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const conversationId = query.get('conId') ?? '';
  const providerId = query.get('providerId') ?? '';
  const providerName = query.get('providerName') ?? '';

  useEffect(() => {
 
     
        setChatId(conversationId);
        setProvId(providerId);
        setUserName(providerName);
    
  
  }, [conversationId, providerName, providerId]);

  // Log the updated state after useEffect runs
  useEffect(() => {
    console.log('Updated Values:', provId, chatId, userName);
  }, [provId, chatId, userName]); // Log whenever state changes

  console.log("👍👍👍👍👍👍👍👍👍👍👍", provId, chatId, userName);

  const socket = io('http://localhost:7000');

  const fetchMessages = async () => {
    try {
      const res = await axiosInstance.get(`/user/get-messages/${chatId}`);
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
    socket.emit('join room', chatId);
    socket.on('join room', (data) => {
      console.log("Joined room:", data);
    });

    socket.on('send-message', (data) => {
      if (data === chatId) {
        fetchMessages();
      }
    });

    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));

    return () => {
      socket.disconnect();
    };
  }, [chatId, socket]);

  useEffect(() => {
    if (provId && chatId && userName) {
      fetchMessages();
    }
  }, [chatId]);

  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioBlob(event.data);
        }
      };

      recorder.start();
      setIsRecording(true);
      recorderRef.current = recorder;
    }
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
      recorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const handleTyping = (e: { target: { value: React.SetStateAction<string> } }) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);

    if (inputValue === '') {
      if (typing) {
        socket.emit('stop typing', chatId);
        setTyping(false);
      }
      return;
    }

    if (!typing) {
      setTyping(true);
      socket.emit('typing', chatId);
    }

    let lastTypingTime = new Date().getTime();
    const timeLength = 3000;

    setTimeout(() => {
      const timenow = new Date().getTime();
      const timeDiff = timenow - lastTypingTime;

      if (timeDiff >= timeLength && typing) {
        socket.emit('stop typing', chatId);
        setTyping(false);
      }
    }, timeLength);
  };

  const handleSend = async () => {
    if (inputValue.trim() || imageFile || audioBlob) {
      socket.emit('stop typing', chatId);
      try {
        let imageUrl = '';

        if (imageFile) {
          imageUrl = await uploadImage(imageFile);
          setImageFile(null);
          setInputValue(imageUrl);
        }

        let audioUrl ='';
        if(audioBlob){
          const audioFile = new File([audioBlob], `audio_${Date.now()}.webm`, { type: 'audio/webm' });
          audioUrl = await uploadAudio(audioFile);
          setAudioBlob(null);
          setInputValue(audioUrl);
        }

        if (inputValue !== '') {
          const newMessage = { conversationId: chatId, senderId: currentUser._id, text: inputValue, imageUrl, audioUrl };
          const res = await axios.post('/user/send-message', newMessage);
          socket.emit('notify', provId);
          socket.emit('send-message', chatId);
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
      setImageFile(e.target.files[0]);
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {provId && chatId  && userName  && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: '80vh' }}>
            {messages.map((message) => (
              <Message key={message._id} message={message} />
            ))}
            <div ref={messageEndRef} />
          </div>

          <div className="flex flex-col ">
            {/* {isTyping && <div className="pl-4 pb-2 text-gray-500">typing ...</div>} */}
            <div className="p-4 border-t border-gray-200 flex items-center">
            <InputEmoji
  value={inputValue}
  onChange={setInputValue}  // Ensure real-time updates to inputValue
  cleanOnEnter
  placeholder="Type a message..."
  onEnter={handleSend}
  shouldReturn={false}
  shouldConvertEmojiToImage={false}
/>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />

              <button onClick={openFilePicker} className="relative focus:outline-none pr-2">
                <FontAwesomeIcon icon={faImage} className="h-4 w-4 text-customGold" />
              </button>
              <button onClick={startRecording} className="relative focus:outline-none pr-2">
                {!isRecording ? (
                  <FontAwesomeIcon icon={faMicrophone} className="h-4 w-4 text-customGold" />
                ) : (
                  <FontAwesomeIcon icon={faStop} className="h-4 w-4 text-customGold" />
                )}
              </button>

              {isRecording && (
                <button onClick={stopRecording} className="relative focus:outline-none pr-2">
                  Stop
                </button>
              )}

              <button onClick={handleSend} className="text-white bg-custom-gradient p-2 rounded-full">
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

