import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users from backend API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/admin/UserList'); // Ensure the URL is correct
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlock = async (userId: string) => {
    try {
      const response = await axios.post(`/admin/block/${userId}`);
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isBlocked: true } : user
      ));
      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error('Error blocking user:');
    }
  };

  const handleUnblock = async (userId: string) => {
    try {
      const response = await axios.post(`/admin/unblock/${userId}`);
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isBlocked: false } : user
      ));
      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error('Error unblocking user:');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-serif text-customGray font-bold mb-6">Users</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-custom-gradient">
            <th className="py-2 px-4 text-left text-white font-bold">NO</th>
            <th className="py-2 px-4 text-left text-white font-bold">NAME</th>
            <th className="py-2 px-4 text-left text-white font-bold">EMAIL</th>
            <th className="py-2 px-4 text-left text-white font-bold">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="bg-white-100">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">
                <span className="flex items-center">
                  {user.isBlocked ? (
                    <button
                      onClick={() => handleUnblock(user._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-opacity-75"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlock(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-opacity-75"
                    >
                      Block
                    </button>
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
