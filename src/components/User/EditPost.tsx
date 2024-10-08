import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uploadImage } from "../../constant/CloudinaryService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface ServiceCategory {
  _id?: string;
  type_name: string;
  description?: string;
}

const EditPost = () => {
  const { postId } = useParams<{ postId: string }>(); // Get post ID from URL
  const [availability, setAvailability] = useState<Date[]>([]);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); 
  const { currentUser } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  const [serviceData, setServiceData] = useState({
    service_name: '',
    service_type: '',
    description: '',
    provider_id: currentUser._id,
    location: '',
    price: ''
  });

  // Fetch Service Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/admin/serviceList');
        if (!response.ok) {
          throw new Error('Failed to fetch service categories');
        }
        const data = await response.json();
        setServiceCategories(data);
      } catch (error) {
        console.error('Error fetching service categories:', error);
        toast.error('Error fetching service categories');
      }
    }
    fetchCategories();
  }, []); // Ensure this effect runs only once when the component mounts

  // Fetch Service Data for Edit
  useEffect(() => {
    const fetchServiceData = async () => {
      if (postId) {
        try {
          const response = await fetch(`/user/editpost/${postId}`);
          console.log(`Fetching service data from: /user/editpost/${postId}`);
          if (response.ok) {
            const data = await response.json();
            setServiceData(data);
            setAvailability(data.availability.map((dateStr: string) => new Date(dateStr)) || []);
            setImagePreviews(data.images || []);
            setImageFiles(data.images || []);
          } else {
            toast.error('Failed to fetch service data');
          }
        } catch (error) {
          console.error('Error fetching service data:', error);
          toast.error('Error fetching service data');
        }
      }
    };

    fetchServiceData();
  }, [postId]); // Dependency array ensures it runs only when postId changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setServiceData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    if (!availability.some(date => date.toDateString() === selectedDate.toDateString())) {
      setAvailability([...availability, selectedDate]);
    }
  };

  const handleRemoveDate = (dateToRemove: Date, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setAvailability(availability.filter(date => date.getTime() !== dateToRemove.getTime()));
  };
  

 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      // Create previews for the selected images
      const newImagePreviews = filesArray.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newImagePreviews]);

      // Store the files for future uploading
      setImageFiles(prevFiles => [...prevFiles, ...filesArray]);
    }
  };


  const handleRemoveImage = (index: number,e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const updatedImageFiles = [...imageFiles];
    const updatedImagePreviews = [...imagePreviews];
  
    updatedImageFiles.splice(index, 1);
    updatedImagePreviews.splice(index, 1);
  
    setImageFiles(updatedImageFiles);
    setImagePreviews(updatedImagePreviews);
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
    
    if (!serviceData.price.toString().trim()) {
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

      const updatedService = {
        ...serviceData,
        availability,
        images: imageUrls,
      };

      const response = await fetch(`/user/editpost/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedService),
      });

      if (response.ok) {
        toast.success('Service updated successfully');
        navigate("/post");
      } else {
        toast.error('Failed to update service');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Error updating service');
    }
  };

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6 mb-10 mt-10">
      <section className="flex-1 bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Other input fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="service_name"
                value={serviceData.service_name}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-customGold"
                placeholder="Service name"
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
              ))}
            </select>
            {/* Other fields */}

            
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
  min={new Date().toISOString().split("T")[0]} // Set min to today's date
/>
<div className="mt-2">
  <h3 className="text-sm font-medium text-gray-700">Selected Dates:</h3>
  <ul>
    {availability.map((date, index) => (
      <li key={index} className="flex justify-between items-center mt-1">
        <span>{date.toDateString()}</span>
        <button
          onClick={(e) => handleRemoveDate(date, e)}
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
 
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
  {imagePreviews.map((image, index) => (
      <div key={index} className="relative">
      <img src={image} alt={`Preview ${index}`} className="w-full h-32 object-cover rounded-lg" />
        <button
          onClick={(e) => handleRemoveImage(index,e)}
          className="text-red-500 hover:underline"
        >
          Remove
        </button>
     </div>
    ))}
    </div>
</div>
</div>
</div>



          <div className="flex justify-center mt-6">
            <button type="submit" className="bg-customGold text-white py-2 px-4 rounded-lg">Update Service</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditPost;



