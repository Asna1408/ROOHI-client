import React, { useState, useEffect } from "react";
import { uploadImage } from "../../constant/CloudinaryService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../constant/axiosInstanceAdmin";

const EditBanner: React.FC = () => {
  const { BannerId } = useParams<{ BannerId: string }>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const navigate = useNavigate();

  const [bannerData, setBannerData] = useState({
    title: "",
    description: "",
    isActive: false,
    images: [], // Store the current image URL if loaded
  });

  useEffect(() => {
    const fetchBannerData = async () => {
      if (BannerId) {
        try {
          const response = await axiosInstance.get(`/admin/banner/${BannerId}`);
          setBannerData(response.data);
          if (response.data.images && response.data.images[0]) {
            setImagePreview(response.data.images[0]); // Show the existing image preview
          }
        } catch (error) {
          console.error("Error fetching banner data:", error);
          toast.error("Error fetching banner data");
        }
      }
    };

    fetchBannerData();
  }, [BannerId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setBannerData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Generate a preview of the new image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBannerData((prevState) => ({
      ...prevState,
      isActive: e.target.checked,
    }));
  };

  const validateFields = (): boolean => {
    if (!bannerData.title.trim()) {
      toast.error("Banner name is required");
      return false;
    }

    if (!bannerData.description.trim()) {
      toast.error("Description is required");
      return false;
    }

    if (!imageFile && !imagePreview) {
      toast.error("An image is required");
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
      let imageUrl = imagePreview;

      // Upload the new image if it's been updated
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const updatedBanner = {
        ...bannerData,
        images: [imageUrl], // Replace the current image URL
      };

      await axiosInstance.post(
        `/admin/banner/updateBanner/${BannerId}`,
        updatedBanner,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Banner updated successfully");
      navigate("/Superadmin/banner");
    } catch (error) {
      toast.error("Failed to edit Banner");
      console.error("Error updating Banner:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-serif text-customGray font-bold mb-6">
        Edit Banner
      </h1>
      <div className="max-w-md mx-auto pt-2 pb-3 pr-6 pl-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300"
              value={bannerData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter banner title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300"
              value={bannerData.description}
              onChange={handleInputChange}
              required
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
            <label className="block text-gray-700 mb-2">Upload Image</label>
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
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-full h-32 object-cover rounded-md"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-custom-gradient text-white font-semibold rounded-md focus:outline-none"
          >
            Update Banner
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBanner;
