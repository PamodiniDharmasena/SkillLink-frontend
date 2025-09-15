import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';


const WorkerContent = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [numberOfJobsCompleted, setNumberOfJobsCompleted] = useState(0);
  const [loading, setLoading] = useState(true);

  const workerId = jwtDecode(localStorage.getItem('skillLinkJwtToken')).UserID;


  const getJobDetailsAsWorkerUrl ="https://localhost:44334/api/v1.0/JobCard/GetJobDetailsAsWorker";

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(getJobDetailsAsWorkerUrl, {
          params: { workerId }
        });
        setJobDetails(response.data.jobDetailsForWorkerList);
        setNumberOfJobsCompleted(response.data.numberOfJobsCompleted);
        setTotalEarnings(response.data.totalEarnings);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [workerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

 


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h4 className="text-xl font-semibold mb-2 dark:text-white">
            <i className="fas fa-tasks mr-2"></i> Completed Jobs & Tasks
          </h4>
          <p className="text-lg text-gray-700 dark:text-gray-200">
            You have completed {numberOfJobsCompleted} jobs and tasks.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-200">
            <i className="fas fa-dollar-sign mr-2"></i> Total Earnings: $
            {totalEarnings}
          </p>
        </div>
        <Link to="/JobList">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Find New Job
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-700 rounded-t-lg">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                Posted Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                Client Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                Budget
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                Action
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                Add Submition
              </th>
            </tr>
          </thead>
          <tbody>
            {jobDetails.map((job, index) => (
              <tr
                key={job.ID}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                  {formatDate(job.postedDate)}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                  {formatDate(job.deadline)}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                  {job.jobTitle}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                  <Link to={`/${job.jobOwnerId}`}><div className="flex items-center space-x-2">
                    <img src={job.jobOwerProfilePicLink} alt="Client Profile" 
                         className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700" 
                    />
                    <span>{job.jobOwnerName}</span>
                  </div></Link>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                  ${job.budget}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                  {job.statusDescription}
                </td>
                <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                  <div className="flex justify-center space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      Accept
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                      Reject
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                  <div className="flex justify-center space-x-2">
                    <button className="text-blue-500 hover:text-blue-600">
                      <i className="fas fa-paper-plane text-xl"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WorkerContent;
