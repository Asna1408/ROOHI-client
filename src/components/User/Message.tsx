

// import React from 'react';  
// import { useSelector } from 'react-redux';  

// interface MessageProps {  
//   message: {  
//     _id: string;  
//     conversationId: string;  
//     senderId: string;  
//     text: string;  
//     imageUrl?: string;  
//     createdAt: string;  
//     updatedAt?: string;  
//   };  
// }  

// const Message: React.FC<MessageProps> = ({ message }) => {  
//   const { currentUser } = useSelector((state: any) => state.user);  

//   const isCurrentUser = message.senderId === currentUser._id;  
//   const isImageMessage = message.text.startsWith("https://res.cloudinary.com/dlu7r0cyv/image/upload/");  


//   return (  
//     <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-2`}>  
//       <div className={`p-3 ${isImageMessage ? '' : 'border border-gray-300 bg-gray rounded-lg'} ${isCurrentUser ? ' text-right' : 'bg-white'} max-w-xs`}>  
//         {isImageMessage ? (  
//           <img  
//             src={message.text}  
//             alt="Message Attachment"  
//             className="max-w-full h-auto rounded-lg" // Responsive image  
//           />  
//         ) : (  
//           <p className="text-sm">{message.text}</p>  
//         )}  
//       </div>  
//     </div>  
//   );  
// };  

// export default Message;



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
  const isImageMessage = message.text.startsWith("https://res.cloudinary.com/dlu7r0cyv/image/upload/");  
  const isAudioMessage = message.text.startsWith("https://res.cloudinary.com/dlu7r0cyv/video/upload/");  

  console.log("Message text:", message.text); // Debugging check

  return (  
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-2`}>  
      <div  
        className={`p-3 ${!isImageMessage && !isAudioMessage ? 'border border-gray-300 bg-gray rounded-lg' : ''}  
          ${isCurrentUser ? 'text-right' : 'bg-white'} max-w-xs`}  
      >  
        {isImageMessage ? (  
          <img  
            src={message.text}  
            alt="Message Attachment"  
            className="max-w-full h-auto rounded-lg" // Responsive image  
          />  
        ) : isAudioMessage ? (  
          <div style={{ overflow: 'visible' }}>
  <audio
    controls
    src={message.text}
    className="w-[200px] h-[60px] md:w-[200px]"
  >
    Your browser does not support the audio element.
  </audio>
</div>
        ) : (  
          <p className="text-sm">{message.text || "Invalid message content"}</p>  
        )}  
      </div>  
    </div>  
  );  
};  

export default Message;
