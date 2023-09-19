
import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectManager.css'; 
import logoImage from '../../../img/projectmager.png'

const ProjectManager = () => {
  return (
    <div className="project-manager-container">
        <img src={logoImage} alt="Logo" className="logo" /> 
      {/* <h1>Project Manager Account</h1> */}
      <button className="assign-button">
        <Link to="/createCustomer">Project Manager Account</Link>
      </button>
    </div>
  );
};

export default ProjectManager;

