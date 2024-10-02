import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AdminFooter from "../../components/Admin/AdminFooter";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import EditServiceCategoryPage from "../../components/Admin/EditServiceCategoryPage";

const EditServiceCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the id from the URL
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} />
        <main
          className={`flex-1 p-6 bg-gray-100 overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {/* Pass the id as categoryId */}
          {id ? <EditServiceCategoryPage categoryId={id} /> : <div>Error: Category ID not found</div>}
        </main>
      </div>
      <AdminFooter />
    </div>
  );
};

export default EditServiceCategory;
