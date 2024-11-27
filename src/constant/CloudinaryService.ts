import axios from 'axios';

export const uploadImage = async (file: File): Promise<string>  => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset','Roohi_preset'); // Your upload preset
  
      const response = await axios.post(`https://api.cloudinary.com/v1_1/dlu7r0cyv/image/upload`, 
          formData,
      );
  
      return response.data.secure_url;
     // Return the image URL
    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error('Image upload failed');
    }
  };


  export const uploadAudio = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file); // Append the audio file
      formData.append('upload_preset', 'Roohi_preset'); // Use your Cloudinary upload preset
      formData.append('resource_type', 'video'); // Specify the resource type as 'video' for audio
  
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dlu7r0cyv/video/upload`, // Use the "video/upload" endpoint
        formData
      );
  
      return response.data.secure_url; // Return the uploaded audio's URL
    } catch (error) {
      console.error('Audio upload failed:', error);
      throw new Error('Audio upload failed');
    }
  };