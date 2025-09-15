import React, { useState } from 'react';
import JobTable from './JobTable';


const HirerContent = ({ handlePostJob }) => {
    const [showPostJobForm, setShowPostJobForm] = useState(false);
    const [jobTitle, setJobTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [attachments, setAttachments] = useState(null);
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      // Create a new job object
      const newJob = {
        jobTitle,
        category,
        description,
        deadline,
        attachments,
      };
      // Pass the job data to the parent component to add it to the list of posted jobs
      handlePostJob(newJob);
      // Clear the form
      setJobTitle('');
      setCategory('');
      setDescription('');
      setDeadline('');
      setAttachments(null);
      // Hide the form after submission
      setShowPostJobForm(false);
    };
  
    return (
      <>
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-2 dark:text-white">
            <i className="fas fa-briefcase mr-2"></i> Posted Jobs
          </h4>
          {/* Display posted jobs */}
          <ul className="list-disc ml-6 text-lg text-gray-700 dark:text-gray-200">
            {/* Iterate through posted jobs here */}
          </ul>
        </div>

        <div className="overflow-x-auto">
          <JobTable/>
</div>

        <div className="flex justify-end">
          <button
            onClick={() => setShowPostJobForm(!showPostJobForm)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 flex items-center"
          >
            <i className="fas fa-plus mr-2"></i> Post a Job
          </button>
        </div>
  
        {showPostJobForm && (
          <div className="mt-6 p-4 bg-gray-200 dark:bg-gray-700 rounded-md">
            <h4 className="text-xl font-semibold mb-2 dark:text-white">
              <i className="fas fa-plus mr-2"></i> New Job Posting
            </h4>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">
                  Attachments
                </label>
                <input
                  type="file"
                  onChange={(e) => setAttachments(e.target.files[0])}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
              >
                Post Job
              </button>
            </form>
          </div>
        )}
      </>
    );
  };
  

  export default HirerContent;