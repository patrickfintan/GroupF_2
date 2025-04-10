import { Link } from 'react-router-dom';
import '../CSS Folder/navbar.css';
import { useState } from 'react'; // To handle toggler state
function Navbar({ onNavigate }) {

  const handleNavigation = (path, componentName) => {
    if (onNavigate) {
      onNavigate(path, componentName); // Call the navigation handler passed as a prop
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
      <a className="navbar-brand" href="#"> <img
            src="../../download.jpeg"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />BrandName</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
            <li className='nav-item'>
            <button className="nav-link btn btn-link"   onClick={() => handleNavigation("/HomePage", "Navbar")}>Home Page</button>           
            </li>
            <li className="nav-item">
            <button className="nav-link btn btn-link"   onClick={() => handleNavigation("/WriteStory", "Navbar")}>Write Story</button>
            </li>
            <li className="nav-item">
            <button className="nav-link btn btn-link"   onClick={() => handleNavigation("/ReadStories", "Navbar")}>Read Story</button>
            </li>
            <li className='nav-item'>
            <button className="nav-link btn btn-link"   onClick={() => handleNavigation("/MyStories", "Navbar")}>My Story</button>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


