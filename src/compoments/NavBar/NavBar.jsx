import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBell, faUserCircle, faBriefcase, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [newJobCount, setNewJobCount] = useState(5); // Example count, replace with actual data
  const token = localStorage.getItem('skillLinkJwtToken');
  const navigate = useNavigate();
  let userId = null;

  if (token && typeof token === 'string') {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.UserID;
    } catch (error) {
      console.error('Error decoding token:', error);
      // Handle the error (e.g., logout the user or show a default UI)
      // logout(); // Optional: log the user out if the token is invalid
    }
  }

  const handleLogOut =()=>{
    localStorage.removeItem('skillLinkJwtToken');
  }

  const handleNavigationProfile=()=>{
    if(userId){
      navigate(`/${userId}`);
    }else{
      navigate("/");     
    }
  }

  const handleNavigationJobList=()=>{
    if(userId){
      navigate("/JobList");
    }else{
      navigate("/");     
    }
  }



  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gray-600 text-white flex items-center px-4 z-10">
      <div className="flex items-center">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKQMuE8V5Wjo5qddFXzr-JYwH7OgvtS4kMZQ&s" alt="Logo" className="h-8 w-auto" />
      <div className="ml-4 text-lg">SkillLink</div>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <button className="p-2 ml-4" onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
          <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} />
        </button>
        <button className="p-2 ml-4" aria-label="Notifications">
          <FontAwesomeIcon icon={faBell} />
        </button>
        
        <div className="relative p-2 ml-4 cursor-pointer" aria-label="New Jobs" onClick={()=>{handleNavigationJobList()}}>
          <FontAwesomeIcon icon={faBriefcase}/>
          {newJobCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              {newJobCount}
            </span>
          )}
         </div> 


          <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center cursor-pointer ml-4" onClick={()=>handleNavigationProfile()}>
            <FontAwesomeIcon icon={faUserCircle} className="text-white" />
          </div>

         <Link to="/">
          <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center ml-4" onClick={()=>handleLogOut()}>
            <FontAwesomeIcon icon={faSignOutAlt} className="text-white" />
          </div>
         </Link>
      </div>
    </header>
  );
};

export default NavBar;
