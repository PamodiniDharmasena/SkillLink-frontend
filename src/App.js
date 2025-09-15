import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import PrivateRoute from './contexts/PrivateRoute';

// Import components
import NavBar from './compoments/NavBar/NavBar';
import LoginForm from './compoments/LoginForm/Login';
import JobList from './compoments/JobList/JobList';
import ProfilePage from './compoments/Profile/ProfilePage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </Router>
  );
};

const Main = () => {
  const location = useLocation(); 
  const isLoginPage = location.pathname === '/';
  
  return (
    <>
      {!isLoginPage && <NavBar />}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/jobList" element={<PrivateRoute><JobList /></PrivateRoute>}/>
        <Route path="/:userId" element={<PrivateRoute><ProfilePage /></PrivateRoute>}/>
      </Routes>
    </>
  );
};

export default App;
