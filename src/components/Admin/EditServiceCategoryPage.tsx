import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 

interface EditServiceCategoryProps {
  categoryId: string;
}

const EditServiceCategoryPage: React.FC<EditServiceCategoryProps> = ({ categoryId }) => {
  const [typeName, setTypeName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 


  // Fetch the existing category details on component mount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`/admin/service-category/${categoryId}`);
        setTypeName(response.data.type_name);
        setDescription(response.data.description);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching category details');
        console.error('Error:', error);
      }
    };

    fetchCategory();
  }, [categoryId]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTypeName = typeName.trim();
    const trimmedDescription= description.trim();

    if (!trimmedTypeName || !trimmedDescription) {
      toast.error("Please fill out all fields without leading space");  
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `/admin/EditService-category/${categoryId}`, 
        {
          type_name: trimmedTypeName,
        description: trimmedDescription,
        }
      );

      toast.success('Category updated successfully!');
      console.log('Updated Category:', response.data);
      navigate('/Superadmin/ServiceList'); 

    } catch (error) {
      toast.error('Error updating category');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="text-2xl font-serif text-customGray font-bold mb-6">Edit Service Category</h1>
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Service Type Name</label>
                <input
                  type="text"
                  value={typeName}
                  onChange={(e) => setTypeName(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="Enter service type (e.g., Mehendi Artist)"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="Enter service description"
                  required
                />
              </div>
              <button
                type="submit"
                className={`${
                  loading ? 'bg-gray-400' : 'bg-custom-gradient'
                } text-white py-2 px-4 rounded hover:bg-custom-gradient`}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Category'}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default EditServiceCategoryPage;
