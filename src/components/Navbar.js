import React, { useState } from "react";
import { Link , useLocation , useNavigate} from "react-router-dom";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaBookmark, FaSearch, FaUser } from "react-icons/fa";


const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBooksClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById("gallery-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // 100ms delay for navigation
    } else {
      const section = document.getElementById("gallery-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleTeachersClick = (e) => {
    e.preventDefault();

    if(location.pathname!=="/"){
      navigate("/");
      setTimeout(()=>{
        const section = document.getElementById("teachers-section");
        if(section){
          section.scrollIntoView({ behavior: "smooth"});
        }
      },100);
    }
    else{
      const section = document.getElementById("teachers-section");
      if(section){
        section.scrollIntoView({ behavior: "smooth"});
      }
    }
  }

  const handleContactClick = (e) => {
    e.preventDefault();

    if(location.pathname!=="/"){
      navigate("/");
      setTimeout(()=>{
        const section = document.getElementById("contact-section");
        if(section){
          section.scrollIntoView({ behavior: "smooth"});
        }
      },100);
    }
    else{
      const section = document.getElementById("contact-section");
      if(section){
        section.scrollIntoView({ behavior: "smooth"});
      }
    }
  }

  return (
    <nav className="bg-creamy border-b border-[#f3e9e2] px-8 py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        {/* <span className="material-symbols-outlined text-2xl text-[#8d5524]">menu_book</span> */}
        <FaBookmark size={22} className="text-yellow-800"/>
        <span className="text-3xl font-bold font-playfair text-[#8d5524]">BookHive</span>
      </div>

      {/* Center: Menu */}
      <ul className="flex space-x-8 font-medium text-[#4b2e05]">
        <li><Link href="#">Books</Link></li>
        <li><a href="#">Mentors</a></li>
        <li><Link to="/PYQs" className="hover:underline">PYQs</Link></li>
        <li><a href="#">Blogs</a></li>
      </ul>

      {/* Right: Search + Sign In */}
      <div className="flex items-center space-x-4">
        {/* Search Icon */}
        <button className="rounded-full border border-[#8d5524] w-10 h-10 flex items-center justify-center">
          <FaSearch size={20} className="text-yellow-950"/>
          {/* <span className="material-symbols-outlined text-[#8d5524]">search</span> */}
        </button>
        {/* Sign In */}
        <button className="flex items-center bg-[#ede6d1] rounded-full px-4 py-2 space-x-2">
          <FaUser size={22}  className="text-yellow-800"/>
          {/* <span className="material-symbols-outlined text-[#8d5524]">person</span> */}
          <span className="text-[#8d5524] font-medium">Sign In</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;