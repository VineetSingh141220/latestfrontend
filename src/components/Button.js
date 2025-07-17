import React from "react";

const Button = ({ children, onClick, type = "button", className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`py-2 px-5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold text-lg shadow hover:from-blue-700 hover:to-blue-500 transition ${className}`}
  >
    {children}
  </button>
);

export default Button;