import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../services/userService';
import '../styles/UpdateUser.css';

const UpdateUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (error) {
        setError('Error fetching user details');
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userId, user);
      navigate('/admin/manage-users');
    } catch (error) {
      setError('Error updating user');
      console.error('Error updating user:', error);
    }
  };

  const handleCancel = () => {
    navigate('/admin/manage-users');
  };

  return (
    <div className="update-user-page">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Update User</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form className="update-user-2" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="transparent-input"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="transparent-input"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={user.role}
              onChange={handleChange}
              className="transparent-input"
              required
            >
              <option value="CASHIER">CASHIER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="submit-user"
            >
              Update User
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-user"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
