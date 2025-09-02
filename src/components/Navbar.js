import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBookmark, FaSearch, FaUser, FaSignOutAlt, FaCheckCircle } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    year: "",
    phone: "",
    role: "student"
  });
  const [error, setError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if user is logged in on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const checkAuthStatus = async () => {
    try {
      // Simulated auth check - replace with actual API call
      const token = localStorage?.getItem?.("token");
      if (token) {
        // Simulate API response
        setIsLoggedIn(true);
        setUser({ name: "John Doe" });
      }
    } catch (error) {
      console.error("Auth check error:", error);
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
  };
const handleAuthSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    // Simulate authentication
    setTimeout(() => {
      setIsLoggedIn(true);
      setUser({ name: authData.name || "User" });
      setShowAuthModal(false);
      setAuthData({
        name: "",
        email: "",
        password: "",
        college: "",
        year: "",
        phone: "",
        role: "student"
      });
      
      const message = authMode === "login" 
        ? `Welcome back, ${authData.name || "User"}!`
        : `Account created successfully! Welcome, ${authData.name || "User"}!`;
      showSuccess(message);
    }, 1000);
  } catch (error) {
    setError("Network error. Please try again.");
    console.error("Auth error:", error);
  }
};


  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    showSuccess("Successfully logged out!");
  };

  const handleInputChange = (e) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value
    });
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
    setError("");
  };

  const handleBooksClick = (e) => {
    e.preventDefault();
    // Simulate scroll behavior
  };

  const handleTeachersClick = (e) => {
    e.preventDefault();
    // Simulate scroll behavior
  };

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-10px) rotateY(5deg); }
        }
        
        @keyframes pulse3d {
          0%, 100% { transform: scale(1) rotateX(0deg); }
          50% { transform: scale(1.05) rotateX(2deg); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(-100%) rotateY(-45deg); opacity: 0; }
          to { transform: translateX(0) rotateY(0deg); opacity: 1; }
        }
        
        @keyframes modalSlide {
          from { transform: translateY(-100%) rotateX(-30deg) scale(0.8); opacity: 0; }
          to { transform: translateY(0) rotateX(0deg) scale(1); opacity: 1; }
        }
        
        @keyframes successPop {
          0% { transform: scale(0) rotateY(180deg); opacity: 0; }
          50% { transform: scale(1.2) rotateY(0deg); opacity: 1; }
          100% { transform: scale(1) rotateY(0deg); opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .navbar-3d {
          perspective: 1000px;
          transform-style: preserve-3d;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .navbar-scrolled {
          backdrop-filter: blur(20px);
          background: rgba(250, 248, 245, 0.9);
          transform: translateZ(10px) rotateX(2deg);
          box-shadow: 0 20px 40px rgba(141, 85, 36, 0.15);
        }
        
        .logo-3d {
          animation: float 6s ease-in-out infinite;
          transform-style: preserve-3d;
          transition: all 0.4s ease;
        }
        
        .logo-3d:hover {
          transform: rotateY(15deg) rotateX(5deg) scale(1.1);
          text-shadow: 0 10px 20px rgba(141, 85, 36, 0.3);
        }
        
        .menu-item {
          position: relative;
          transform-style: preserve-3d;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .menu-item:hover {
          transform: translateY(-3px) rotateX(10deg) scale(1.05);
          color: #8d5524;
        }
        
        .menu-item::before {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          width: 0;
          height: 3px;
          background: linear-gradient(45deg, #8d5524, #d4af37);
          transform: translateX(-50%);
          transition: width 0.4s ease;
          border-radius: 2px;
        }
        
        .menu-item:hover::before {
          width: 100%;
        }
        
        .search-btn {
          transform-style: preserve-3d;
          transition: all 0.4s ease;
          background: linear-gradient(145deg, #ede6d1, #f5efe2);
          box-shadow: 5px 5px 15px rgba(141, 85, 36, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.7);
        }
        
        .search-btn:hover {
          transform: translateZ(10px) rotateY(10deg) scale(1.1);
          box-shadow: 10px 10px 25px rgba(141, 85, 36, 0.3), -10px -10px 25px rgba(255, 255, 255, 0.8);
        }
        
        .auth-btn {
          transform-style: preserve-3d;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(145deg, #ede6d1, #f5efe2);
          box-shadow: 8px 8px 20px rgba(141, 85, 36, 0.2), -8px -8px 20px rgba(255, 255, 255, 0.7);
          position: relative;
          overflow: hidden;
        }
        
        .auth-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -200%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.6s ease;
        }
        
        .auth-btn:hover::before {
          left: 200%;
        }
        
        .auth-btn:hover {
          transform: translateZ(15px) rotateY(-5deg) scale(1.05);
          box-shadow: 15px 15px 30px rgba(141, 85, 36, 0.3), -15px -15px 30px rgba(255, 255, 255, 0.8);
        }
        
        .modal-3d {
          animation: modalSlide 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          background: linear-gradient(145deg, #ffffff, #fafafa);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
        }
        
        .input-3d {
          transform-style: preserve-3d;
          transition: all 0.3s ease;
          box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px rgba(255, 255, 255, 0.8);
        }
        
        .input-3d:focus {
          transform: translateZ(5px);
          box-shadow: inset 3px 3px 8px rgba(0, 0, 0, 0.15), inset -3px -3px 8px rgba(255, 255, 255, 0.9), 0 0 20px rgba(141, 85, 36, 0.3);
        }
        
        .btn-3d {
          transform-style: preserve-3d;
          transition: all 0.3s ease;
          background: linear-gradient(145deg, #8d5524, #a66429);
          box-shadow: 5px 5px 15px rgba(141, 85, 36, 0.4), -2px -2px 8px rgba(255, 255, 255, 0.2);
        }
        
        .btn-3d:hover {
          transform: translateY(-2px) rotateX(5deg);
          box-shadow: 8px 8px 20px rgba(141, 85, 36, 0.5), -3px -3px 10px rgba(255, 255, 255, 0.3);
        }
        
        .btn-3d:active {
          transform: translateY(0) rotateX(0deg);
          box-shadow: 3px 3px 10px rgba(141, 85, 36, 0.3), -1px -1px 5px rgba(255, 255, 255, 0.1);
        }
        
        .success-popup {
          animation: successPop 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          background: linear-gradient(145deg, #10b981, #059669);
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        
        .slide-in {
          animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <nav className={`navbar-3d ${scrolled ? 'navbar-scrolled' : 'bg-creamy'} border-b border-[#f3e9e2] px-8 py-3 flex items-center justify-between fixed w-full top-0 z-40 transition-all duration-600`}>
        {/* Left: Logo */}
        <div className="flex items-center space-x-2 slide-in">
          <FaBookmark size={22} className="text-yellow-800 logo-3d"/>
          <span className="text-3xl font-bold font-playfair text-[#8d5524] logo-3d">BookHive</span>
        </div>

        {/* Center: Menu */}
        <ul className="flex space-x-8 font-medium text-[#4b2e05] slide-in" style={{animationDelay: '0.2s'}}>
          <li><a href="#" onClick={handleBooksClick} className="menu-item">Books</a></li>
          <li><a href="#" className="menu-item hover:underline">Mentors</a></li>
          <li><a href="#" className="menu-item hover:underline">PYQs</a></li>
          <li><a href="#" className="menu-item hover:underline">Blogs</a></li>
        </ul>

        {/* Right: Search + Sign In */}
        <div className="flex items-center space-x-4 slide-in" style={{animationDelay: '0.4s'}}>
          {/* Search Icon */}
          <button className="search-btn rounded-full border border-[#8d5524] w-10 h-10 flex items-center justify-center">
            <FaSearch size={20} className="text-yellow-950"/>
          </button>
          
          {/* Auth Button */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span className="text-[#8d5524] font-medium animate-pulse">Hello, {user?.name}</span>
              <button 
                onClick={handleLogout}
                className="auth-btn flex items-center rounded-full px-4 py-2 space-x-2"
              >
                <FaSignOutAlt size={18} className="text-yellow-800"/>
                <span className="text-[#8d5524] font-medium">Logout</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)}
              className="auth-btn flex items-center rounded-full px-4 py-2 space-x-2"
            >
              <FaUser size={22} className="text-yellow-800"/>
              <span className="text-[#8d5524] font-medium">Sign In</span>
            </button>
          )}
        </div>
      </nav>

      {/* Success Message Popup */}
      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="success-popup text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
            <FaCheckCircle size={24} className="animate-spin" style={{animationDuration: '2s'}} />
            <span className="text-lg font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{backdropFilter: 'blur(8px)'}}>
          <div className="modal-3d rounded-lg p-6 w-full max-w-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-[#8d5524] text-center">
              {authMode === "login" ? "Sign In" : "Create Account"}
            </h2>
            
            {error && <div className="text-red-500 mb-4 text-center animate-pulse">{error}</div>}
            
            <form onSubmit={handleAuthSubmit}>
              {authMode === "register" && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={authData.name}
                      onChange={handleInputChange}
                      className="input-3d w-full px-3 py-2 border rounded-md focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">College</label>
                    <input
                      type="text"
                      name="college"
                      value={authData.college}
                      onChange={handleInputChange}
                      className="input-3d w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Year</label>
                    <input
                      type="text"
                      name="year"
                      value={authData.year}
                      onChange={handleInputChange}
                      className="input-3d w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={authData.phone}
                      onChange={handleInputChange}
                      className="input-3d w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                  </div>
                </>
              )}
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={authData.email}
                  onChange={handleInputChange}
                  className="input-3d w-full px-3 py-2 border rounded-md focus:outline-none"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={authData.password}
                  onChange={handleInputChange}
                  className="input-3d w-full px-3 py-2 border rounded-md focus:outline-none"
                  required
                />
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <button
                  type="submit"
                  className="btn-3d text-white px-6 py-2 rounded-md font-medium"
                >
                  {authMode === "login" ? "Sign In" : "Create Account"}
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
            
            <div className="text-center">
              <button
                type="button"
                onClick={toggleAuthMode}
                className="text-[#8d5524] underline hover:no-underline transition-all duration-300 transform hover:scale-105"
              >
                {authMode === "login" 
                  ? "Need an account? Sign up" 
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;