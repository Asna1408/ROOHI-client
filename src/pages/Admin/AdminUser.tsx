import { useState } from "react";
import UserList from "../../components/Admin/UserList";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import AdminFooter from "../../components/Admin/AdminFooter";

function AdminUser() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className="flex flex-col h-screen">
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
          <Sidebar isOpen={isSidebarOpen} />
          <main
            className={`flex-1 p-6 bg-gray-100 overflow-y-auto transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-0"
            }`}
          >
            <UserList />
          </main>
        </div>
        <AdminFooter />
      </div>
    </div>
  );
}

export default AdminUser;
