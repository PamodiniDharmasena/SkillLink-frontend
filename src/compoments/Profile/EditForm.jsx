import React, { useState } from 'react';

// Edit Form Implementation
const EditForm = ({ profileDetails, setProfileDetails, onSave }) => {
  const [editMode, setEditMode] = useState('basic'); // 'basic' or 'security'
  const [formData, setFormData] = useState({
    name: profileDetails.name,
    bio: profileDetails.bio,
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Save logic for basic info
    if (editMode === 'basic') {
      setProfileDetails({ ...profileDetails, name: formData.name, bio: formData.bio });
    }
    // Save logic for security settings
    // Here you can add validation and logic for password changes if needed
    onSave();
  };

  return (
    <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-md mt-4 mb-10">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setEditMode('basic')}
          className={`px-4 py-2 rounded-md ${editMode === 'basic' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Basic Info
        </button>
        <button
          onClick={() => setEditMode('security')}
          className={`px-4 py-2 rounded-md ${editMode === 'security' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Security
        </button>
      </div>
      {editMode === 'basic' ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4"><i className="fas fa-info-circle mr-2"></i>Edit Basic Info</h2>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
            <input
              type="text"
              name="name"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Country
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            City
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            School
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Bio
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4"><i className="fas fa-shield-alt mr-2"></i>Edit Security Settings</h2>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            New Password
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>
        </div>
      )}
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default EditForm;
