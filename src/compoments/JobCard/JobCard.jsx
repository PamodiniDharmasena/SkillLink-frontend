import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FaThumbsUp, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Import star icons
import { Link } from 'react-router-dom';
import './JobCard.css';
import { useNavigate } from 'react-router-dom';


const JobCard = ({ job }) => {
  const [showModal, setShowModal] = useState(false);
  const [budget, setBudget] = useState('');
  const [userComment, setUserComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [timeLeftPercent, setTimeLeftPercent] = useState(100);
  const [showEmojiBar, setShowEmojiBar] = useState(false);
  const [reactions, setReactions] = useState({
    '👍': 0,
    '❤️': 0,
    '😄': 0,
    '😢': 0,
    '😮': 0,
  });
  const [userReaction, setUserReaction] = useState(null);
  const [visibleKeywords, setVisibleKeywords] = useState([]);

  useEffect(() => {
    const calculateTimeLeftPercent = () => {
      const totalDuration = moment(job.deadline).diff(moment(job.startDate), 'seconds');
      const timeLeft = moment(job.deadline).diff(moment(), 'seconds');
      const percentLeft = (timeLeft / totalDuration) * 100;
      setTimeLeftPercent(percentLeft > 0 ? percentLeft : 0);
    };

    calculateTimeLeftPercent();
    const interval = setInterval(calculateTimeLeftPercent, 1000);

    return () => clearInterval(interval);
  }, [job.deadline, job.startDate]);


  const navigate = useNavigate();
  const handleLoadUserProfile = (userId) => {
    navigate(`/${userId}`);
  };


  const handleAddBudget = () => {
    setShowModal(false);
    console.log(`Budget submitted: ${budget}`);
  };

  const handleReaction = (emoji) => {
    if (userReaction) {
      setReactions((prevReactions) => ({
        ...prevReactions,
        [userReaction]: (prevReactions[userReaction] || 1) - 1,
      }));
    }
    setReactions((prevReactions) => ({
      ...prevReactions,
      [emoji]: (prevReactions[emoji] || 0) + 1,
    }));
    setUserReaction(emoji);
    setShowEmojiBar(false);
  };

  const handleSaveComment = () => {
    setUserComment(userComment);
    setIsEditing(false);
  };

  const getBarColor = () => {
    const thresholds = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0];
    const colors = [
      'bg-green-500',
      'bg-green-400',
      'bg-light-green-500',
      'bg-light-green-400',
      'bg-yellow-500',
      'bg-yellow-600',
      'bg-orange-500',
      'bg-orange-600',
      'bg-red-500',
      'bg-red-600',
      'bg-dark-red-500',
    ];

    for (let i = 0; i < thresholds.length; i++) {
      if (timeLeftPercent >= thresholds[i]) {
        return colors[i];
      }
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i - rating < 1) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="relative max-w-4xl mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden my-4 border border-gray-400">
      {/* Category Tag */}
      <span className="absolute top-0 right-0 bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-bl-lg">
        {job.jobCategory}
      </span>

      <div className="flex flex-col md:flex-row">
        {/* Left Side: Client Photo and Title */}
        <div className="md:w-1/3 w-full bg-gray-800 text-white p-6 flex flex-col items-center md:items-start">
          <div className="flex items-center justify-center md:justify-start w-full mt-20">

            <div className="flex-shrink-0 w-16 h-16 mr-3">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={job.profileImageLink}
                  alt="Client"
                  onClick={()=>handleLoadUserProfile(job.userId)}
                />     
            </div>
            
            <h3 className="text-lg font-semibold text-center md:text-left">{job.jobTitle}</h3>
          </div>
          
          <div className="bg-white border border-indigo-300 text-indigo-800 rounded-lg p-4 mb-6 flex items-center mt-12">
            <span className="font-semibold mr-2">Loyalty Rate:</span>
            <div className="flex space-x-1">
              {renderStars(job.loyaltyRatingAsClient)} {/* Render the stars */}
            </div>
          </div>


          {/* <div className="flex flex-wrap gap-2 mt-32">
            {job.keywords?.map((keyword, index) => (
              <span key={index} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">
                {keyword}
              </span>
            ))}
          </div> */}

      

        </div>

        {/* Right Side: Content */}
        <div className="md:w-2/3 w-full p-6">
          <p className="text-gray-700 mb-2">Deadline: {moment(job.deadline).format('YYYY-MM-DD HH:mm:ss')}</p>
          
          <div className="bg-gray-300 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${getBarColor()}`}
              style={{ width: `${timeLeftPercent}%` }}
            ></div>
          </div>

          {/* Description */}
          <div className="mt-4 h-32 overflow-hidden relative">
            <p className="text-gray-600">
              {job.jobDescription}
            </p>
            <div className="absolute bottom-0 right-0 bg-gradient-to-t from-gray-100 to-transparent h-16 w-full"></div>
          </div>

          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowModal(true)}
          >
            Add Budget
          </button>

          <div>
            <span className="text-xs text-gray-700 hover:underline hover:text-blue-500 cursor-pointer">
              Viraj Kumarage and 202 others added their price
            </span>        
          </div>

          <div className="mt-4 relative group">
            <button
              className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:border-blue-500 focus:outline-none transition-colors duration-300"
            >
              <FaThumbsUp size={24} className="mr-2" />
              <span className="text-gray-700">Like</span>
            </button>
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-2">
                {Object.keys(reactions).map((emoji) => (
                  <div key={emoji} className="flex items-center cursor-pointer" onClick={() => handleReaction(emoji)}>
                    <span className="text-lg">{emoji}</span>
                    <span className="ml-1 text-xs text-gray-600">{reactions[emoji]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="text-gray-800 font-semibold mb-2">Comments</h5>
            {userComment && !isEditing ? (
              <div className="bg-gray-200 p-2 rounded mb-2 flex justify-between items-center border border-gray-400">
                <p>{userComment}</p>
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="Add a comment..."
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                />
                <button
                  className="mt-2 bg-gray-800 text-white py-2 px-4 rounded"
                  onClick={handleSaveComment}
                >
                  {isEditing ? 'Save' : 'Comment'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add Your Budget</h2>
            <input
              type="number"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
              placeholder="Enter your budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleAddBudget}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
