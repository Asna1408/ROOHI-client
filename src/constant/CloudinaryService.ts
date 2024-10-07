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