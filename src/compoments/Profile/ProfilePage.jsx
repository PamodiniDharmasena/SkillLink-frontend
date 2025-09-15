import React, { useState,useEffect } from 'react';
import axios from 'axios';
import EditForm from './EditForm'
import HirerContent from './HirerContent'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import WorkerContent from './WorkerContent';


const ProfilePage = () => {
  const { userId } = useParams();
  const [role, setRole] = useState('worker'); // 'worker' or 'hirer'
  const [profileBasicDetails, setProfileBasicDetails] = useState({});
  const [profilePhotoLinks, setProfilePhotoLinks] =useState({});
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isPostingJob, setIsPostingJob] = useState(false);
  const [postedJobs, setPostedJobs] = useState([]);
  const [isEditing, setIsEditing] = useState(false); 
  //const [userId, setUserId] = useState(1);


  const [error, setError] = useState(null);

  const getUrlBasicInfo = `https://localhost:44334/api/v1.0/Profile/GetProfileDetails?UserId=${userId}`
  const getUrlPhoto = `https://localhost:44334/api/v1.0/Profile/GetProfilePhoto?UserId=${userId}` 

  const fetchProfilePhotoLinks = async (userId) => {
    try {
        const response = await axios.get(getUrlPhoto);
        setProfilePhotoLinks(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching profile details:', error);
        throw error;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [userId]);

  const fetchProfileBasicDetails = async (userId) => {
    try {
        const response = await axios.get(getUrlBasicInfo);
        setProfileBasicDetails(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching profile details:', error);
        throw error;
    }
  };

   useEffect(() => {
       fetchProfileBasicDetails(userId);
    }, [userId]);

    useEffect(() => {
      fetchProfilePhotoLinks(userId);
   }, [userId]);

  const handleEditProfile = () => {
    setIsEditing(!isEditing); // Toggle the edit form visibility
  };

  const handleSave = () => {
    setIsEditing(false); // Close the edit form after saving
  };

  const handleRoleToggle = () => {
    setRole(role === 'worker' ? 'hirer' : 'worker');
  };

  const handlePostJob = (jobData) => {
    // Add the new job to the list of posted jobs
    setPostedJobs([...postedJobs, jobData]);
    // Hide the form after posting
    setIsPostingJob(false);
  };


 

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 pt-12">
      <div className="flex flex-col items-center w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        {/* Cover Photo */}
        <div
          className="w-full h-52 bg-cover bg-center relative mb-6"
          style={{ backgroundImage: `url(${profilePhotoLinks.coverImageLink})` }}
        >
          <div className="absolute bottom-0 left-4">
            {/* Profile Photo */}
            <img
              src={profilePhotoLinks.profileImageLink}
              alt="Profile"
              className="w-48 h-48 rounded-full border-4 border-white -mb-24"
            />
          </div>
        </div>

        {/* Bio and Edit Button */}
        <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-lg mb-4 relative mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {profileBasicDetails.fullName} <i className="fas fa-user-circle ml-2"></i>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            <i className="fas fa-briefcase mr-2"></i>
            {profileBasicDetails.title}
          </p>

          {/* Edit Button */}


          { jwtDecode(localStorage.getItem('skillLinkJwtToken').toString()).UserID == userId && (
               <button
               onClick={handleEditProfile}
               className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 flex items-center"
             >
               <i className="fas fa-edit mr-2"></i> Edit Profile
             </button>
          )}
          
        </div>

         {/* Edit Form - Conditionally render based on isEditing */}
      {isEditing && (
        <EditForm
          profileDetails={profileBasicDetails}
          setProfileDetails={setProfileBasicDetails}
          onSave={handleSave}
        />
      )}

     

        {/* Basic Details, Education, and Professional Experience */}
        <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              <i className="fas fa-info-circle mr-2"></i> Basic Details
            </h3>
            <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded">
              <p className="text-lg font-semibold">
                <i className="fas fa-user mr-2"></i> Name: {profileBasicDetails.fullName}
              </p>
              <p className="text-lg">
                <i className="fas fa-map-marker-alt mr-2"></i> Location: {profileBasicDetails.location}
              </p>
              <p className="text-lg">
                <i className="fas fa-id-badge mr-2"></i> Title: {profileBasicDetails.title}
              </p>
            </div>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              <i className="fas fa-graduation-cap mr-2"></i> Education
            </h3>
            <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded">
              <p className="text-lg font-semibold">
                <i className="fas fa-school mr-2"></i> School: {profileBasicDetails.school}
              </p>
              <div>
                {profileBasicDetails?.university?.length > 0 ? (
                  profileBasicDetails.university.map((university, index) => (
                    <p key={index} className="text-lg">
                      <i className="fas fa-university mr-2"></i> University: {university}
                    </p>
                  ))
                ) : (
                  <p>
                     <i className="fas fa-university mr-2"></i> University: No universities listed
                  </p>
                )}
              </div>
              <div>
                {profileBasicDetails?.degree?.length > 0 ? (
                  profileBasicDetails.degree.map((degree, index) => (
                    <p key={index} className="text-lg">
                      <i className="fas fa-certificate mr-2"></i> Degree: {degree}
                    </p>
                  ))
                ) : (
                  <p>
                     <i className="fas fa-certificate mr-2"></i> Degree: No degrees listed
                  </p>
                )}
              </div>

              <div>
                {profileBasicDetails?.diploma?.length > 0 ? (
                  profileBasicDetails.diploma.map((diploma, index) => (
                    <p key={index} className="text-lg">
                      <i className="fas fa-certificate mr-2"></i> Diploma: {diploma}
                    </p>
                  ))
                ) : (
                  <p>
                     <i className="fas fa-certificate mr-2"></i> Diploma: No diplomas listed
                  </p>
                )}
              </div>

              <div>
                {profileBasicDetails?.certificate?.length > 0 ? (
                  profileBasicDetails.certificate.map((certificate, index) => (
                    <p key={index} className="text-lg">
                      <i className="fas fa-award mr-2"></i> Certificates: {certificate}
                    </p>
                  ))
                ) : (
                  <p>
                     <i className="fas fa-award mr-2"></i> Certificates: No certificates listed
                  </p>
                )}
              </div>
             
 
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              <i className="fas fa-briefcase mr-2"></i> Professional Experience
            </h3>
            <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded">
              <p className="text-lg font-semibold">
                <i className="fas fa-briefcase mr-2"></i> Job: {profileBasicDetails.job}
              </p>
              <p className="text-lg">
                <i className="fas fa-clock mr-2"></i> Experience: {profileBasicDetails.experience} years
              </p>
            </div>
          </section>
        </div>

        {/* Role Toggle */}
        {jwtDecode(localStorage.getItem('skillLinkJwtToken').toString()).UserID == userId && (
          
               <div className="mt-4">
               <button
                 onClick={handleRoleToggle}
                 className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center"
               >
                 <i className="fas fa-exchange-alt mr-2"></i> Switch to {role === 'worker' ? 'Hiring' : 'Worker'} Mode
               </button>
             </div>
          )}
            
          {jwtDecode(localStorage.getItem('skillLinkJwtToken').toString()).UserID == userId && (
             <div className="w-full p-4 mt-4 bg-gray-100 dark:bg-gray-800 rounded-md">
               {role === 'worker' ? (
                 <WorkerContent/>
               ) : (
                 <HirerContent handlePostJob={handlePostJob} />
               )}
             </div>
          )}
        
   
       
      </div>


    </div>
  );
};

// const WorkerContent = () => (
//   <>
//     <div className="mb-6 flex items-center justify-between">
//       <div>
//         <h4 className="text-xl font-semibold mb-2 dark:text-white">
//           <i className="fas fa-tasks mr-2"></i> Completed Jobs & Tasks
//         </h4>
//         <p className="text-lg text-gray-700 dark:text-gray-200">
//           You have completed 10 jobs and tasks.
//         </p>
//         <p className="text-lg text-gray-700 dark:text-gray-200">
//           <i className="fas fa-dollar-sign mr-2"></i> Total Earnings: $5000
//         </p>
//       </div>
//       <Link to="/JobList">
//         <button className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
//           Find New Job
//         </button>
//       </Link>

//     </div>
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
//         <thead className="bg-gray-100 dark:bg-gray-700 rounded-t-lg">
//           <tr>
//             <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               Date
//             </th>
//             <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               Job Title
//             </th>
//             <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               Client Name
//             </th>
//             <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               Budget
//             </th>
//             <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               Status
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
//             <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               2024-08-25
//             </td>
//             <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               Website Development
//             </td>
//             <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               Client A
//             </td>
//             <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               $200
//             </td>
//             <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               Completed
//             </td>
//           </tr>
//           <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
//             <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               2024-08-20
//             </td>
//             <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               Logo Design
//             </td>
//             <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               Client B
//             </td>
//             <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               $150
//             </td>
//             <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               In Progress
//             </td>
//           </tr>
//           <tr className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
//             <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               2024-08-15
//             </td>
//             <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               SEO Optimization
//             </td>
//             <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               Client C
//             </td>
//             <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               $300
//             </td>
//             <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
//               Pending
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   </>
// );









export default ProfilePage;
