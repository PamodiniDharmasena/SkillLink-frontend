import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBell, faUserCircle, faTimes, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const ControlButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    document.body.classList.toggle('dark-mode');
  };

  const closeModal = () => setIsModalOpen(false);

  // Close modal when clicking outside of it
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    closeModal();
  };

 

  return (
    <>
      {/* Control Button */}
      <button
        className="fixed top-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none z-50 mt-20"
        onClick={toggleModal}
        aria-label="Control Panel"
      >
        <FontAwesomeIcon icon={faCog} />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50 "
          onClick={handleOverlayClick}
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-80 relative transition-transform transform scale-100 hover:scale-105  border-red-600">
          
            {/* Modal Content */}
            <div className="flex flex-col gap-4">
              <button
                className="w-full p-3 flex items-center justify-between text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                onClick={toggleDarkMode}
                aria-label="Toggle Dark Mode"
              >
                <span>Dark Mode</span>
                <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} />
              </button>
              <button
                className="w-full p-3 flex items-center justify-between text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                aria-label="Notifications"
              >
                <span>Notifications</span>
                <FontAwesomeIcon icon={faBell} />
              </button>
              <button
                className="w-full p-3 flex items-center justify-between text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                aria-label="Profile"
              >
                <span>Profile</span>
                <FontAwesomeIcon icon={faUserCircle} />
              </button>
              <div className="flex gap-4 ">
                <button
                  className=" w-1/2 p-3 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-red-300 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span className="ml-2">Logout</span>
                </button>
                <button
                  className="w-1/2 p-3 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faTimes} />
                  <span className="ml-2">Close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ControlButton;
