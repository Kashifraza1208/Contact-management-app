import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Import the CSS file

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul className="lists">
        <li>
          <Link to="/contacts">Contacts</Link>
        </li>
        <li>
          <Link to="/chartsmap">ChartsMap</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
