// // src/components/BannerForm.tsx
// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { uploadImage } from "../../constant/CloudinaryService";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from 'axios';


// const AddBanner: React.FC = () => {
  
//     const [imageFiles, setImageFiles] = useState<File[]>([]); 
//     const [imagePreview, setImagePreview] = useState<string>('');
//   const navigate = useNavigate();


//   const [bannerData, setBannerData] = useState({
//     title: '',
//     description: '',
//     isActive: false,
    
//   });


//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setBannerData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const filesArray = Array.from(e.target.files);
//       setImageFiles(prevFiles => [...prevFiles, ...filesArray]); // Add new images to the state
//     }
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBannerData(prevState => ({ ...prevState, isActive: e.target.checked }));
// };


//   const validateFields = (): boolean => {
//     if (!bannerData.title.trim()) {
//       toast.error('Banner name is required');
//       return false;
//     }
    
//     if (!bannerData.description.trim()) {
//       toast.error('Description is required');
//       return false;
//     }

//     if (!bannerData.isActive) {
//         toast.error('IsActive is required');
//         return false;
//       }
    
//     if (imageFiles.length === 0) {
//       toast.error('At least one image is required');
//       return false;
//     }
//     return true;
//   };


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateFields()) {
//       return; 
//     }

//     try {
//       // Upload all images and collect their URLs
//       const uploadPromises = imageFiles.map(file => uploadImage(file));
//       const imageUrls = await Promise.all(uploadPromises);
      
//       const newBanner = {
//         ...bannerData,
//         images: imageUrls, 
//       };

//       // Make a POST request to your backend API to save the service
//       const response = await axios.post('/admin/banner/addBanner', newBanner, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log(response, "Banner response");
//         toast.success('Banner added successfully');
//         navigate("/Superadmin/banner")
     
//     } catch (error) {
//         toast.error('failed to add Banner');
//       console.error('Error adding Banner:', error);
//     }
//   };



//   return (
//     <div className="overflow-x-auto">
//       <h1 className="text-2xl font-serif text-customGray font-bold mb-6">Add Banner</h1>
//     <div className="max-w-md mx-auto pt-2 pb-3 pr-6 pl-6 bg-white rounded-lg shadow-md">

     

//       <form onSubmit={handleSubmit}>
//         {/* Title Field */}
//         <div className="mb-4">
//           <label  className="block text-gray-700 mb-2">
//             Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             className="w-full px-3 py-2 border rounded-md focus:outline-none  border-gray-300"
//             value={bannerData.title}
//             onChange={handleInputChange}
//             required
//             placeholder="Enter banner title"
//           />
//         </div>

//         {/* Description Field */}
//         <div className="mb-4">
//           <label  className="block text-gray-700 mb-2">
//             Description
//           </label>
//           <textarea
//             name="description"
//             className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300 "
//             value={bannerData.description}
//             onChange={handleInputChange}
//             required
//             placeholder="Enter banner description"
//           ></textarea>
//         </div>

//         <div className="mb-4 flex items-center">
//                         <label className="block text-gray-700 mr-4">IsActive</label>
//                         <input
//                             type="checkbox"
//                             name="isActive"
//                             className="form-checkbox"
//                             checked={bannerData.isActive}
//                             onChange={handleCheckboxChange} // Handle checkbox change
//                         />
//                     </div>


//         {/* Image Upload Field */}
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             className="w-full px-3 py-2 border rounded-md focus:outline-none "
//             onChange={handleImageChange}
//           />
//         </div>

//         {/* Image Preview */}
//         {imagePreview && (
//           <div className="mb-4">
//             <p className="text-gray-700 mb-2">Image Preview:</p>
//             <img src={imagePreview} alt="Image Preview" className="w-full h-32 object-cover rounded-md" />
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className='w-full py-2 px-4 bg-custom-gradient text-white font-semibold rounded-md  focus:outline-none'
      
//         >
//             Add Baanner
//         </button>
//       </form>
//     </div>
//     </div>

//   );
// };

// export default AddBanner;

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { uploadImage } from "../../constant/CloudinaryService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

const AddBanner: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null); 
  const [imagePreview, setImagePreview] = useState<string>(''); 
  const navigate = useNavigate();

  const [bannerData, setBannerData] = useState({
    title: '',
    description: '',
    isActive: false,
    images: [], 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBannerData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file); 

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBannerData(prevState => ({ ...prevState, isActive: e.target.checked }));
  };

  const validateFields = (): boolean => {
    if (!bannerData.title.trim()) {
      toast.error('Banner name is required');
      return false;
    }

    if (!bannerData.description.trim()) {
      toast.error('Description is required');
      return false;
    }

    if (!imageFile) {
      toast.error('An image is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields() || !imageFile) {
      return;
    }

    try {
      const imageUrl = await uploadImage(imageFile);
      
      const newBanner = {
        ...bannerData,
        images: [imageUrl], 
      };

      const response = await axios.post('/admin/banner/addBanner', newBanner, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success('Banner added successfully');
      navigate("/Superadmin/banner");

    } catch (error) {
      toast.error('Failed to add Banner');
      console.error('Error adding Banner:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-serif text-customGray font-bold mb-6">Add Banner</h1>
      <div className="max-w-md mx-auto pt-2 pb-3 pr-6 pl-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300"
              value={bannerData.title}
              onChange={handleInputChange}
              placeholder="Enter banner title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300"
              value={bannerData.description}
              onChange={handleInputChange}
              placeholder="Enter banner description"
            ></textarea>
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-4">IsActive</label>
            <input
              type="checkbox"
              name="isActive"
              className="form-checkbox"
              checked={bannerData.isActive}
              onChange={handleCheckboxChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
              onChange={handleImageChange}
            />
          </div>

          {imagePreview && (
            <div className="mb-4">
              <p className="text-gray-700 mb-2">Image Preview:</p>
              <img src={imagePreview} alt="Image Preview" className="w-full h-32 object-cover rounded-md" />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-custom-gradient text-white font-semibold rounded-md focus:outline-none"
          >
            Add Banner
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;
