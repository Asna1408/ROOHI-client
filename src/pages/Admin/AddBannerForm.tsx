import React, { useState } from "react";
import AdminFooter from "../../components/Admin/AdminFooter";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import AddBanner from "../../components/Admin/AddBanner";

const AddBannerForm: React.FC = () => {
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
          <AddBanner />
        </main>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AddBannerForm;
