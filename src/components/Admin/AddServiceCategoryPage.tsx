import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddServiceCategory: React.FC = () => {
  const [typeName, setTypeName] = useState('');  // State for type_name
  const [description, setDescription] = useState('');  // State for description
  const [loading, setLoading] = useState(false);  // State to handle loading
  const [existingTypes, setExistingTypes] = useState<string[]>([]); 
  const navigate = useNavigate()

  useEffect(() => {

    const fetchExistingTypes = async () => {
      try {
        const response = await axios.get('/admin/ServiceList'); 
        setExistingTypes(response.data.map((item: { type_name: string }) => item.type_name.trim().toLowerCase())); // Store types in lower case
      } catch (error) {
        console.error('Error fetching existing service types:', error);
      }
    };
    
    fetchExistingTypes();
  }, []);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const trimmedTypeName = typeName.trim();
    const trimmedDescription= description.trim();

    if (!trimmedTypeName || !trimmedDescription) {
      toast.error("Please fill out all fields without leading space");  
      return;
    }

    if (existingTypes.includes(trimmedTypeName.toLowerCase())) {
      toast.error("Service type name already exists. Please choose a different name.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/admin/AddServiceCategory', {
        type_name: trimmedTypeName,
        description: trimmedDescription,
      });

      if (response.status === 201) {
        toast.success('Service category added successfully!');
        navigate('/Superadmin/ServiceList');
      } else {
        toast.error('Failed to add service category.');
      }
    } catch (error) {
      toast.error('Error adding service category. Please try again.');
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-serif text-customGray font-bold mb-6">Add Service Category</h1>
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
     
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block   text-gray-700">Service Type Name</label>
          <input
            type="text"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            placeholder="Enter service type (e.g., Mehendi Artist)"
           
          />
        </div>
        <div className="mb-4">
          <label className="block   text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            placeholder="Enter service description"
           
          />
        </div>
        <button
          type="submit"
          className={`${
            loading ? 'bg-custom-gradient' : 'bg-custom-gradient'
          } text-white  py-2 px-4 rounded hover:bg-custom-gradient`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Category'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddServiceCategory;
