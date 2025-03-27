import React from "react";
import "../../css/AdminPanel.css";
import { FaHome, FaBox, FaTags, FaUsers, FaEnvelope } from "react-icons/fa";

const Sidebar = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => onSelect("Products")} className="active">
          <FaTags className="icon" /> <span>Products</span>
        </li>
        <li onClick={() => onSelect("Users")}>
          <FaUsers className="icon" /> <span>Customers</span>
        </li>
        <li onClick={() => onSelect("Logout")}>
          <FaEnvelope className="icon" /> <span>Log Out</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
