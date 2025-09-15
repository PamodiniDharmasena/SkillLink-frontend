import React, { useState } from 'react';
import JobCard from '../JobCard/JobCard';
import Footer from '../Footer/Footer';
import { FaSearch } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

const Pagination = ({ jobsData = [], searchQuery, setSearchQuery }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage, setJobsPerPage] = useState(5);
    //const [searchQuery, setSearchQuery] = useState('');

    // Calculate the indices for slicing the jobs array
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;

    // Filter and slice jobs based on search query
    const filteredJobs = (jobsData || []).filter(job =>
        (job.jobTitle && job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.jobDescription && job.jobDescription.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

    // Calculate total pages
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle jobs per page change
    const handleJobsPerPageChange = (e) => {
        setJobsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing jobs per page
    };

    // Highlight matching text function
    const highlightText = (text, query) => {
        if (!text || !query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.split(regex).map((part, index) =>
            regex.test(part) ? <span key={index} className="bg-yellow-200">{part}</span> : part
        );
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    // Calculate page numbers to display
    const maxPageNumbers = 4;
    const halfRange = Math.floor(maxPageNumbers / 2);
    
    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);

    if (currentPage - halfRange < 1) {
        endPage = Math.min(totalPages, endPage + (1 - (currentPage - halfRange)));
    }

    if (currentPage + halfRange > totalPages) {
        startPage = Math.max(1, startPage - (currentPage + halfRange - totalPages));
    }

    return (
        <div className="Pagination p-4 mt-16">
            {/* Search Bar */}
            {/* <div className="mb-4 relative">
                <FaSearch className="absolute left-3 top-3 text-gray-500" />
                <input
                    type="text"
                    className="border border-gray-300 rounded p-2 pl-10 w-full"
                    placeholder="Search for jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                        onClick={clearSearch}
                    />
                )}
            </div> */}

            {/* Display Job Cards */}
            <div className="space-y-4">
                {currentJobs.map(job => (
                    <div key={job.id} className="w-full">
                        <JobCard
                            job={{
                                ...job,
                                jobTitle: highlightText(job.jobTitle, searchQuery),
                                jobDescription: highlightText(job.jobDescription, searchQuery),
                                keywords: job.keywords ? job.keywords.map(keyword => highlightText(keyword, searchQuery)) : [] // Apply highlightText to each keyword
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col items-center mt-6 space-y-4">
                {/* Jobs Per Page Selector */}
                <div className="flex items-center space-x-2">
                    <span className="text-gray-700">Jobs Per Page:</span>
                    <select
                        className="border border-gray-300 rounded p-2"
                        value={jobsPerPage}
                        onChange={handleJobsPerPageChange}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                </div>

                {/* Pagination Buttons */}
                <div className="flex items-center space-x-2">
                    <button
                        className={`border rounded p-2 ${currentPage === 1 ? 'bg-gray-300 text-gray-600' : 'bg-white text-blue-500'}`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {startPage > 1 && (
                        <>
                            <button
                                className="border rounded p-2 bg-white text-blue-500"
                                onClick={() => handlePageChange(1)}
                            >
                                1
                            </button>
                            {startPage > 2 && <span className="text-gray-500">...</span>}
                        </>
                    )}

                    {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((number) => (
                        <button
                            key={number}
                            className={`border rounded p-2 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                            onClick={() => handlePageChange(number)}
                        >
                            {number}
                        </button>
                    ))}

                    {endPage < totalPages && (
                        <>
                            {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
                            <button
                                className="border rounded p-2 bg-white text-blue-500"
                                onClick={() => handlePageChange(totalPages)}
                            >
                                {totalPages}
                            </button>
                        </>
                    )}

                    <button
                        className={`border rounded p-2 ${currentPage === totalPages ? 'bg-gray-300 text-gray-600' : 'bg-white text-blue-500'}`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Pagination;
