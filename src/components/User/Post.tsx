import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../constant/CloudinaryService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

interface ServiceCategory {
  _id?: string;
  type_name: string;
  description?: string;
}


const Post = () => {
  const [availability, setAvailability] = useState<Date[]>([]);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]); 
  const { currentUser } = useSelector((state: any) => state.user )
  const navigate = useNavigate();

  const [serviceData, setServiceData] = useState({
    service_name: '',
    service_type: '',
    description: '',
    provider_id: currentUser._id,
    location: '',
    price: ''
  });

  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/admin/serviceList');
  
        if (response.data && Array.isArray(response.data.categories)) {
          setServiceCategories(response.data.categories); 
        } else {
          console.error('Unexpected response structure:', response.data);
          setServiceCategories([]); 
        }
      } catch (error) {
        console.error('Error fetching service categories:', error);
        setServiceCategories([]); 
      }
    };
  
    fetchCategories();
  }, []);
  
  
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setServiceData(prevState => ({ ...prevState, [name]: value }));
  };
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minDate = tomorrow.toISOString().split('T')[0];


  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    // Check if the date is already in the array
    if (!availability.some(date => date.toDateString() === selectedDate.toDateString())) {
      setAvailability([...availability, selectedDate]);
    }
  };

  const handleRemoveDate = (dateToRemove: Date) => {
    setAvailability(availability.filter(date => date.toDateString() !== dateToRemove.toDateString()));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles(prevFiles => [...prevFiles, ...filesArray]); 
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };


  const validateFields = (): boolean => {
    if (!serviceData.service_name.trim()) {
      toast.error('Service name is required');
      return false;
    }
    if (!serviceData.service_type) {
      toast.error('Service type is required');
      return false;
    }
    if (!serviceData.description.trim()) {
      toast.error('Description is required');
      return false;
    }
    if (!serviceData.location.trim()) {
      toast.error('Location is required');
      return false;
    }
    if (!serviceData.price.trim() || isNaN(Number(serviceData.price))) {
      toast.error('A valid price is required');
      return false;
    }
    if (availability.length === 0) {
      toast.error('At least one availability date is required');
      return false;
    }
    if (imageFiles.length === 0) {
      toast.error('At least one image is required');
      return false;
    }
    return true;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateFields()) {
      return;
    }
  
    try {
      const uploadPromises = imageFiles.map(file => uploadImage(file));
      const imageUrls = await Promise.all(uploadPromises);
  
      const newService = {
        ...serviceData,
        availability,
        images: imageUrls,
      };
  
      const response = await axios.post('/user/uploadpost', newService, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        toast.success('Service added successfully');
        console.log("Service added");
        navigate("/post");
      } else {
        console.error('Failed to add service:', response.data);
        toast.error('Failed to add service');
      }
    } catch (error) {
      console.error('Error adding service:', error);
      toast.error('Error adding service');
    }
  };
  
  

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6 mb-10 mt-10">
      
      <section className="flex-1 bg-white p-6 rounded-lg shadow-lg">

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
<div>
  <label className="block text-sm font-medium text-gray-700">Name</label>
  <input
    type="text"
    name="service_name"
    value={serviceData.service_name} 
    onChange={handleInputChange} 
    className="mt-1 block w-full p-2 border border-customGold"
    placeholder="Provider name"
  />
</div>




<select
  name="service_type"
  value={serviceData.service_type} 
  onChange={handleInputChange}
  className="mt-1 block w-full p-2 border border-customGold"
>
  <option value="" disabled>Select Service Type</option>
  
  {serviceCategories.map(category => (
    <option key={category._id} value={category._id}> 
      {category.type_name}
    </option>
  ))
}


</select>




<div>
  <label className="block text-sm font-medium text-gray-700">About</label>
  <textarea
    name="description"
    value={serviceData.description} 
    onChange={handleInputChange} 
    className="mt-1 block w-full p-2 border border-customGold"
    placeholder="Enter details about your service"
  />
</div>


<div>
  <label className="block text-sm font-medium text-gray-700">Location</label>
  <input
    type="text"
    name="location"
    value={serviceData.location} 
    onChange={handleInputChange} 
    className="mt-1 block w-full p-2 border border-customGold"
    placeholder="Enter location"
  />
</div>


<div>
  <label className="block text-sm font-medium text-gray-700">Starting Price</label>
  <input
    type="text"
    name="price"
    value={serviceData.price} 
    onChange={handleInputChange} 
    className="mt-1 block w-full p-2 border border-customGold"
    placeholder="Enter starting price"
  />
</div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700">Availability</label>
            <input
              type="date"
              className="mt-1 block w-full p-2 border border-customGold"
            
              onChange={handleDateChange}
              min={minDate} 
            />
           
            <div className="mt-2">
              <h3 className="text-sm font-medium text-gray-700">Selected Dates:</h3>
              <ul>
                {availability.map((date, index) => (
                  <li key={index} className="flex justify-between items-center mt-1">
                    <span>{date.toDateString()}</span>
                    <button
                      onClick={() => handleRemoveDate(date)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700">Images</label>
            <div className="mt-1 flex items-center justify-center w-full">
              <label className="cursor-pointer bg-gray-100 rounded-lg p-6 border border-customGold text-red-500">
                <input type="file" className="hidden" multiple onChange={handleImageChange} /> 
                <span className="text-center">+</span>
              </label>
            </div>
            <div className="mt-2">
              <h3 className="text-sm font-medium text-gray-700">Selected Images:</h3>
              <ul>
                {imageFiles.map((file, index) => (
                  <li key={index} className="flex justify-between items-center mt-1">
                    <span>{file.name}</span>
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>
    
        <button className="bg-custom-gradient text-white mt-6 py-2 px-4 w-full md:w-1/2">
          Add Post
        </button>
      </form>
      </section>
    </div>
  );
};

export default Post;
