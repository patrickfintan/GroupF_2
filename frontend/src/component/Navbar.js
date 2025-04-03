import { Link } from 'react-router-dom';
import '../CSS Folder/navbar.css';
import { useState } from 'react'; // To handle toggler state
function Navbar() {
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
            <a className="nav-link" href="/HomePage">Home Page</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/WriteStory">Write Story</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/ReadStories">Read Stories</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/MyStories'>My Stories</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/FeedBack">Feed Back</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


