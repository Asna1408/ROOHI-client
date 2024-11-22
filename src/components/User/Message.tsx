// // Message.tsx
// import React from 'react';
// import { useSelector } from 'react-redux';

// interface MessageProps {
//   message: {
//     _id: string;
//     conversationId: string;
//     senderId: string;
//     text: string;
//     imageUrl ?: string;
//     createdAt: string;
//     updatedAt?: string;
//   };
// }

// const Message: React.FC<MessageProps> = ({ message }) => {
//   const { currentUser } = useSelector((state: any) => state.user);

//   const isCurrentUser = message.senderId === currentUser._id;


//   return (
//     <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
//       <div
//         className={`p-3 border border-gray-300 rounded-lg ${
//           isCurrentUser ? 'bg-gray-200 text-right' : 'bg-white'
//         } max-w-xs`}
//       >
        
      
//       {
//         message.text.startsWith("https://res.cloudinary.com/") ? (
//           <img src={message.text} alt="" />
//         ):(
//           <p>{message.text}</p>
//         )
//       }
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
    imageUrl?: string;  
    createdAt: string;  
    updatedAt?: string;  
  };  
}  

const Message: React.FC<MessageProps> = ({ message }) => {  
  const { currentUser } = useSelector((state: any) => state.user);  

  const isCurrentUser = message.senderId === currentUser._id;  
  const isImageMessage = message.text.startsWith("https://res.cloudinary.com/");  

  return (  
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-2`}>  
      <div className={`p-3 ${isImageMessage ? '' : 'border border-gray-300 bg-gray rounded-lg'} ${isCurrentUser ? ' text-right' : 'bg-white'} max-w-xs`}>  
        {isImageMessage ? (  
          <img  
            src={message.text}  
            alt="Message Attachment"  
            className="max-w-full h-auto rounded-lg" // Responsive image  
          />  
        ) : (  
          <p className="text-sm">{message.text}</p>  
        )}  
      </div>  
    </div>  
  );  
};  

export default Message;