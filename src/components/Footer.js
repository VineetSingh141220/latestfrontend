import React from "react";
import { FaBookmark, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#8a4716] text-white pt-12 pb-4 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          {/* Logo & Desc */}
          <div className="mr-30">
            <div className="flex items-center mb-4">
              <FaBookmark size={32} className="mr-2" />
              <span className="text-2xl font-bold font-playfair">BookHive</span>
            </div>
            <p className="text-base text-white/90">
              Your university platform for book rentals,<br />
              mentorship, PYQs, and academic blogs.
            </p>
          </div>
          {/* Quick Links */}
          <div className="ml-10">
            <h3 className="text-xl font-bold mb-3 font-playfair">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Browse Books</a></li>
              <li><a href="#" className="hover:underline">Find Mentors</a></li>
              <li><a href="#" className="hover:underline">PYQ Archive</a></li>
              <li><a href="#" className="hover:underline">Read Blogs</a></li>
            </ul>
          </div>
          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-3 font-playfair">Contact Us</h3>
            <div className="flex items-center mb-2">
              <span className="mr-2">✉️</span>
              <span>support@bookhive.com</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">📞</span>
              <span>+91 1234567890</span>
            </div>
          </div>
          {/* Connect With Us */}
          <div>
            <h3 className="text-xl font-bold mb-3 font-playfair">Connect With Us</h3>
            <div className="flex space-x-4 mt-2">
              <span className="bg-white/20 rounded-full p-3 flex items-center justify-center">
                <FaInstagram size={22} />
              </span>
              <span className="bg-white/20 rounded-full p-3 flex items-center justify-center">
                <FaTwitter size={22} />
              </span>
            </div>
          </div>
        </div>
        {/* Divider */}
        <hr className="border-white/30 mb-4" />
        {/* Bottom Section */}
        <div className="text-center text-white/80 text-base">
          © 2025 BookHive. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;