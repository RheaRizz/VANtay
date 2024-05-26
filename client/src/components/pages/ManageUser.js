import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../services/userService';
import '../styles/ManageUser.css';

const ManageUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers(); 
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  

  return (
    <div className="manage-user-page">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Manage Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id}  className="user-box">
              <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <p className="text-gray-600 mb-4">{user.role}</p>
              <Link to={`/admin/update-user/${user.id}`}>
                <button className="btn-user-update">
                  Update
                </button>
              </Link>
              <button className="btn-delete-user" onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUser;