import React from 'react';
import { Link } from 'react-router-dom';

const PostTable: React.FC = () => {
  return (
    <div className="overflow-x-auto p-4">
      {/* Add Post Button */}
      <div className="mb-4">
        <Link to="/addpost"> {/* Wrap the button with Link */}
          <button className="bg-custom-gradient text-white px-4 py-2 font-semibold">
            Add Post
          </button>
        </Link>
      </div>
      
      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-custom-gradient text-customGray font-serif">
            <th className="py-2 px-4 border-b">Photo</th>
            <th className="py-2 px-4 border-b">Service Name</th>
            <th className="py-2 px-4 border-b">Service Type</th>
            <th className="py-2 px-4 border-b">Price (INR)</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="py-2 px-3 border-b"> {/* Adjusted px value */}
              <img
                src="https://via.placeholder.com/150" // Add a placeholder or real image URL
                alt="postname"
                className="h-16 w-16 object-cover"
              />
            </td>
            <td className="py-2 px-3 border-b">Name</td> {/* Adjusted px value */}
            <td className="py-2 px-3 border-b">Service Type</td> {/* Adjusted px value */}
            <td className="py-2 px-3 border-b">Price</td> {/* Adjusted px value */}
            <td className="py-2 px-3 border-b">Location</td> {/* Adjusted px value */}
            <td className="py-2 px-3 border-b"> {/* Adjusted px value */}
              <button
                className="mr-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
