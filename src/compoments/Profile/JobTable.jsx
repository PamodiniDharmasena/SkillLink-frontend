import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

const JobTable = () => {
  const [jobs, setJobs] = useState([]);

 
  const getJobDtlUrl ='https://localhost:44334/api/v1.0/JobCard/GetJobDetailsHiringMode?';
  const userId = jwtDecode(localStorage.getItem('skillLinkJwtToken')).UserID;

  useEffect(() => {
    fetchJobData();
  }, []);

  const fetchJobData = async () => {
    try {
      const response = await axios.get(getJobDtlUrl,{
        params: { userId }
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  const handleAccept = async (jobId, workerId, IsAccept) => {
  

    try {
      const response = await axios.put('https://localhost:44334/api/v1.0/JobCard/ChangeAcceptancyForPostedJob', {
        jobId,
        workerId,
        IsAccept
      });
  
      if (response.data.success) {
        console.log('Acceptancy status updated successfully.');
      } else {
        console.error('Failed to update acceptancy status.');
      }
    } catch (error) {
      console.error('Error updating acceptancy status:', error);
    }
    
    fetchJobData();
    
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white dark:bg-gray-800 border-separate border-spacing-0 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
        <thead className="bg-gray-100 dark:bg-gray-700 rounded-t-lg">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-400 dark:border-gray-600">
              Posted Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-400 dark:border-gray-600">
              Deadline
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-400 dark:border-gray-600">
              Job Title
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-400 dark:border-gray-600">
              Worker
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-400 dark:border-gray-600">
              Budget
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-400 dark:border-gray-600">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b-2 border-gray-400 dark:border-gray-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            job.jobBeddingInfoList.map((worker, index) => (
              <tr
                key={`${job.jobId}-${worker.workerId}`}
                className={`hover:bg-gray-100 dark:hover:bg-gray-700 transition-all ${
                  index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
                }`}
              >
                {index === 0 && (
                  <>
                    <td
                      className={`px-6 py-4 text-gray-600 dark:text-gray-300 ${
                        'border-b-4 border-gray-700 dark:border-gray-500'
                      }`}
                      rowSpan={job.jobBeddingInfoList.length}
                    >
                      {job.postedDate}
                    </td>
                    <td
                      className={`px-6 py-4 text-gray-600 dark:text-gray-300 ${
                        'border-b-4 border-gray-700 dark:border-gray-500'
                      }`}
                      rowSpan={job.jobBeddingInfoList.length}
                    >
                      {job.deadline}
                    </td>
                    <td
                      className={`px-6 py-4 text-gray-600 dark:text-gray-300 ${
                        'border-b-4 border-gray-700 dark:border-gray-500'
                      }`}
                      rowSpan={job.jobBeddingInfoList.length}
                    >
                      {job.jobTitle}
                    </td>
                  </>
                )}
                <td className={`px-6 py-4 text-gray-600 dark:text-gray-300 ${
                  index === job.jobBeddingInfoList.length - 1
                    ? 'border-b-4 border-gray-700 dark:border-gray-500'
                    : 'border-b border-gray-300 dark:border-gray-700'
                }`}>
                  <Link to={`/${worker.workerId}`}><img src={worker.wokerProfileImageLink} alt={worker.workerName} className="inline-block w-8 h-8 rounded-full mr-2" /></Link>
                  {worker.workerName}
                </td>
                <td className={`px-6 py-4 text-gray-600 dark:text-gray-300 ${
                  index === job.jobBeddingInfoList.length - 1
                    ? 'border-b-4 border-gray-700 dark:border-gray-500'
                    : 'border-b border-gray-300 dark:border-gray-700'
                }`}>
                  ${worker.price}
                </td>
                <td className={`px-6 py-4 text-gray-600 dark:text-gray-300 ${
                  index === job.jobBeddingInfoList.length - 1
                    ? 'border-b-4 border-gray-700 dark:border-gray-500'
                    : 'border-b border-gray-300 dark:border-gray-700'
                }`}>
                  {job.status}
                </td>
                <td className={`px-6 py-4 text-center ${
                  index === job.jobBeddingInfoList.length - 1
                    ? 'border-b-4 border-gray-700 dark:border-gray-500'
                    : 'border-b border-gray-300 dark:border-gray-700'
                }`}>
                  {
                  
                  job.statusType != 1 && job.workerId != -1 ? (
                    <span className="text-gray-500">Can't Undo, Someone Accepted This Job</span>
                  ) :
                  job.workerId == -1 && job.statusType == 1 ? (
                    <button
                       className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      onClick={() => handleAccept(job.jobId, worker.workerId,true)}
                    >
                      Accept
                    </button>
                  ) : 
                  job.workerId != -1 && job.statusType == 1 ?(
                    <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={() => handleAccept(job.jobId, worker.workerId,false)}
                    >
                      Undo
                    </button>
                  ):<></>}
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
