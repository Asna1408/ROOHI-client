// import React, { useState } from 'react';
// import { uploadToCloudinary } from "../../constant/CloudinaryService"; // Import your Cloudinary function

// const UploadIMage = () => {
//   const [image, setImage] = useState<File | null>(null);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!image) return;
    
//     try {
//       const url = await uploadToCloudinary(image); // Call Cloudinary upload function
//       setImageUrl(url); // Set the returned Cloudinary URL
//       console.log('Image uploaded: ', url);
//     } catch (error) {
//       console.error('Error uploading image', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleImageChange} />
//       <button onClick={handleImageUpload}>Upload Image</button>
//       {imageUrl && <img src={imageUrl} alt="Uploaded" />}
//     </div>
//   );
// };

// export default UploadIMage;
