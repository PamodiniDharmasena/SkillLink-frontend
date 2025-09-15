import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Pagination from '../Pagination/Pagination';
import NavBar from '../NavBar/NavBar';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const JobList = () => {
  const [filters, setFilters] = useState({
    selectedCategories: [],
    views: [0, 3000], // Ensure this is within the valid range
    budget: [1000, 200000], // Ensure this is within the valid range
    deadline: '',
    difficulty: [1, 5],
    searchQuery: ''
  });
 
  const [jobsData, setJobsData] = useState([]);

  const fetchJobs = async () => {
    const { searchQuery, selectedCategories, views, budget, deadline, difficulty } = filters;
    const jobFilterObj = {
      category: selectedCategories.length > 0 ? selectedCategories : null,
      deadline: deadline || null,
      budgetStart: budget[0] || null,
      budgetEnd: budget[1] || null,
      difficultyStart: difficulty[0] || null,
      difficultyEnd: difficulty[1] || null,
      numberOfViewsStart: views[0] || null,
      numberOfViewsEnd: views[1] || null,
      userId: jwtDecode(localStorage.getItem('skillLinkJwtToken')).UserID
    };
 
    try {
      setJobsData([])
      const response = await axios.post('https://localhost:44334/api/v1.0/JobCard/GetJobCardDetails', jobFilterObj);
      setJobsData(response.data);
    } catch (error) {
      console.error('Error fetching job cards:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return (
    <div className="flex h-screen">
      <div className="w-64">
        <Sidebar
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      <div className="flex-1">
        <Pagination
          jobsData={jobsData}
          searchQuery={filters.searchQuery} // Pass searchQuery to Pagination
          setSearchQuery={(query) => setFilters(prevState => ({ ...prevState, searchQuery: query }))} // Pass setter function to Pagination
        />
      </div>
    </div>
  );
};

export default JobList;
