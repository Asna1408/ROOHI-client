
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableComponent from '../Common/TableComponent'; 
import Pagination from '../Common/Pagination'; 

interface User {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`/admin/UserList?page=${page}&limit=10`); 
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleBlock = async (userId: string) => {
    try {
      await axios.post(`/admin/block/${userId}`);
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isBlocked: true } : user
      ));
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleUnblock = async (userId: string) => {
    try {
      await axios.post(`/admin/unblock/${userId}`);
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isBlocked: false } : user
      ));
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const columns = [
    { field: 'index', headerName: 'NO' },
    { field: 'name', headerName: 'NAME' },
    { field: 'email', headerName: 'EMAIL' },
  ];

  const actions = (row: User) => (
    <span className="flex items-center">
      {row.isBlocked ? (
        <button
          onClick={() => handleUnblock(row._id)}
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-opacity-75"
        >
          Unblock
        </button>
      ) : (
        <button
          onClick={() => handleBlock(row._id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-opacity-75"
        >
          Block
        </button>
      )}
    </span>
  );

  const userData = users.map((user, index) => ({
    ...user,
    index: (currentPage - 1) * 10 + (index + 1), // Add index for the NO column
  }));

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-serif text-customGray font-bold mb-6">Users</h1>
      <TableComponent columns={columns} data={userData} actions={actions} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default UserList;

