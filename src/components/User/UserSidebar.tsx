import { Link } from "react-router-dom";

const UserSidebar = () => {
  return (
    <div className="w-full">
      <aside className="flex flex-col space-y-4">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="rounded-full mx-auto w-28 h-28"
        />
        <Link to="/profile" className="bg-custom-gradient text-white py-2 px-4 text-center rounded">Profile</Link>
        <Link to="/dashboard" className="bg-custom-gradient text-white py-2 px-4 text-center rounded">Dashboard</Link>
        <Link to="/post" className="bg-custom-gradient text-white py-2 px-4 text-center rounded">Posts</Link>
        <Link to="/review" className="bg-custom-gradient text-white py-2 px-4 text-center rounded">Review</Link>
        <Link to="/notifications" className="bg-custom-gradient text-white py-2 px-4 text-center rounded">Notifications</Link>
        <Link to="/chat" className="bg-custom-gradient text-white py-2 px-4 text-center rounded">Chat</Link>
      </aside>
    </div>
  );
};

export default UserSidebar;
