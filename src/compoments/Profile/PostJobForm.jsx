import React, { useState } from 'react';

// Post Job Form Implementation
const PostJobForm = ({ onSave }) => {
  const [jobData, setJobData] = useState({
    title: '',
    category: '',
    description: '',
    deadline: '',
    attachments: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleFileChange = (e) => {
    setJobData({ ...jobData, attachments: Array.from(e.target.files) });
  };

  const handleSave = () => {
    // You can add additional validation here if needed
    onSave(jobData);
  };

  return (
    <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-md mt-4">
      <h2 className="text-2xl font-semibold mb-4">Post a New Job</h2>

      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Job Title
        <input
          type="text"
          name="title"
          value={jobData.title}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </label>

      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Category
        <input
          type="text"
          name="category"
          value={jobData.category}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </label>

      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Description
        <textarea
          name="description"
          value={jobData.description}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </label>

      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Deadline
        <input
          type="date"
          name="deadline"
          value={jobData.deadline}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </label>

      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Attachments
        <input
          type="file"
          name="attachments"
          multiple
          onChange={handleFileChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </label>

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
      >
        Post Job
      </button>
    </div>
  );
};

export default PostJobForm;
