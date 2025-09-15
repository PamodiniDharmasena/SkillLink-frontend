import React, { useEffect, useState } from 'react';
import { Range } from 'react-range';
import axios from 'axios';

const Sidebar = ({ filters, setFilters }) => {

  const [categoryOptions, setCategoryOptions] = useState([]);
  const getCategoryLink = 'https://localhost:44334/api/v1.0/JobCard/GetJobCategories';
  const categoryOptions1 = [
    'All',
    'Software Development',
    'UI/UX Design',
    'Design',
    'Marketing',
    'Sales',
    'Support'
  ];

  useEffect(()=>{
     fetchAllCategory();
  },[])



  const fetchAllCategory = async()=>{
    try {
      const response = await axios.get(getCategoryLink);
      setCategoryOptions(response.data);
    } catch (error) {
      console.error('Error fetching job categories:', error);
    }
  }

  const toggleCategoryVisibility = () => {
    setFilters(prevState => ({ ...prevState, categoriesVisible: !prevState.categoriesVisible }));
  };

    const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    if (value === 'All') {
      // If 'All' is selected, either select or deselect all categories
      setFilters(prevFilters => ({
        ...prevFilters,
        selectedCategories: checked ? ['All', ...categoryOptions] : []
      }));
    } else {
      // For other categories, update selected categories accordingly
      setFilters(prevFilters => {
        const updatedCategories = checked
          ? [...prevFilters.selectedCategories.filter(cat => cat !== 'All'), value]
          : prevFilters.selectedCategories.filter(category => category !== value);

        // If all categories except 'All' are selected, mark 'All' as selected too
        const allSelected = updatedCategories.length === categoryOptions.length;

        return {
          ...prevFilters,
          selectedCategories: allSelected ? ['All', ...categoryOptions] : updatedCategories
        };
      });
    }
  };

  return (
    <div className="sidebar">
      <aside className="fixed w-64 h-5/6 bg-gray-100 border-r border-gray-300 p-4 overflow-y-auto mt-20">
        <h2 className="text-xl font-semibold mb-4">Filter Jobs</h2>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search jobs..."
            value={filters.searchQuery}
            onChange={(e) => setFilters(prevState => ({ ...prevState, searchQuery: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <button
            onClick={toggleCategoryVisibility}
            className="w-full p-2 border border-gray-300 rounded bg-gray-200 text-left"
          >
            <span className="text-gray-700">Category</span>
            <i className={`fas fa-chevron-${filters.categoriesVisible ? 'up' : 'down'} float-right`}></i>
          </button>
          {filters.categoriesVisible && (
            <div className="mt-2 border border-gray-300 rounded p-2 bg-white">
              {/* Check if categoryOptions is null or empty */}
              {categoryOptions && categoryOptions.length > 0 ? (
                <>
                  <label className="block mb-1">
                    <input
                      type="checkbox"
                      value="All"
                      checked={filters.selectedCategories.includes('All')}
                      onChange={handleCategoryChange}
                      className="mr-2"
                    />
                    All
                  </label>
                  {categoryOptions.map((category) => (
                    <label key={category} className="block mb-1">
                      <input
                        type="checkbox"
                        value={category}
                        checked={filters.selectedCategories.includes(category)}
                        onChange={handleCategoryChange}
                        className="mr-2"
                      />
                      {category}
                    </label>
                  ))}
                </>
              ) : (
                // Show this message if there are no categories
                <p className="text-gray-500">No available categories</p>
              )}
            </div>
          )}
        </div>


        {/* Views Filter */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Number of Views</h3>
          <Range
            step={100}
            min={0}
            max={3000}
            values={filters.views}
            onChange={(values) => setFilters(prevState => ({ ...prevState, views: values }))}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 bg-gray-300 rounded"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="w-4 h-4 bg-blue-500 rounded-full"
              />
            )}
          />
          <div className="flex justify-between text-sm mt-2">
            <span>{filters.views[0]}</span>
            <span>{filters.views[1]}</span>
          </div>
        </div>

        {/* Budget Filter */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Budget Price</h3>
          <Range
            step={100}
            min={1000}
            max={200000}
            values={filters.budget}
            onChange={(values) => setFilters(prevState => ({ ...prevState, budget: values }))}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 bg-gray-300 rounded"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="w-4 h-4 bg-blue-500 rounded-full"
              />
            )}
          />
          <div className="flex justify-between text-sm mt-2">
            <span>${filters.budget[0]}</span>
            <span>${filters.budget[1]}</span>
          </div>
        </div>

        {/* Deadline Filter */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Deadline</h3>
          <input
            type="date"
            value={filters.deadline}
            onChange={(e) => setFilters(prevState => ({ ...prevState, deadline: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Level of Difficulty</h3>
          <Range
            step={1}
            min={1}
            max={10}
            values={filters.difficulty}
            onChange={(values) => setFilters(prevState => ({ ...prevState, difficulty: values }))}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 bg-gray-300 rounded"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="w-4 h-4 bg-blue-500 rounded-full"
              />
            )}
          />
          <div className="flex justify-between text-sm mt-2">
            <span>Easy</span>
            <span>Medium</span>
            <span>Hard</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
