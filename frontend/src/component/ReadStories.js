import "../CSS Folder/main.css";
import React, { useEffect, useState, useContext } from 'react';
import "../CSS Folder/ReadStories.css"
import { UserContext } from "../context.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function ReadStories(){
    const [stories, setStories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const { userId } = useContext(UserContext); // Fetch userId from context
    const navigate = useNavigate(); // Define navigate function using useNavigate
    
    console.log(userId);
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleRatingChange = (event) => {
        setSelectedRating(event.target.value);
    };

    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedRating('');
    };

    
    useEffect(() => {
        fetch('http://localhost:5000/stories?origin=ReadStories')
        .then((response) => {
            if(!response.ok) throw new Error('Network responsewas not okay');
            return response.json();
        })
        .then((data) => setStories(data));
    }, []);



    const filteredMovies = stories.filter((story) => {
        const matchesCategory = selectedCategory === '' || story.category === selectedCategory;
        const matchRatings = selectedRating==='' || (story.rating === parseInt(selectedRating,10));
    
    return matchRatings && matchesCategory;
    });

    const handleTitleClick = (story) =>{
        navigate("/ReadStory", { state: story});
    }

    const handleEditClick = (storysent) => {
        console.log(storysent);
        navigate("/WriteStory",{ state: storysent});
    }

    console.log(filteredMovies)

    return (
        <div>
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor="categoryFilter">Filter By category: </label>
            <select id="categoryFilter" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Thriller">Thriller</option>
            </select>

            <label htmlFor="RatingFilter" style={{ marginLeft: '15px' }}>
                Filter by Status:
            </label>
            <select id="statusFilter" value={selectedRating} onChange={handleRatingChange}>
                <option value="">SELECT</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <button style={{ marginLeft: '15px', padding: '5px 10px', cursor: 'pointer' }} onClick={clearFilters}>
                clearFilters
            </button>
        </div><ul className="movie-list">
                {filteredMovies.map((story, index) => (
                    <li key={index} className="movie-item">
                        {story.coverImage ? (
                            <img src={`http://localhost:5000/${story.coverImage}`} alt={story.title} />
                        ): (
                            <div className="placeholder-image"></div> // Add a placeholder div when the image is missing
                        )}
                        <div className="movie-details">
                            {story.userId === userId &&(
                                <button className = "edit-button" onClick={() => handleEditClick(story)}> Edit</button>
                            )}

                            <span className="title" onClick={() => handleTitleClick(story)} style={{cursor: "pointer", color:"blue"}}>
                                <strong>Title:</strong> {story.title}
                            </span>
                            <span className="rating">Rating: {story.rating}</span>
                            <span className="category">
                                <strong>category:</strong> {story.category}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>

            <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                      <img src="your-logo-url-here" alt="Brand Logo" className="footer-logo" />
                      <p className="address">
                        Address:<br/>
                        123 Main Street, City<br/>
                        State Province, County
                      </p>
                      <div className="social-icons">
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                      </div>
                    </div>
                </div>
                <div className="footer-bottom">
                  <p>© 2024 Your Website. All rights reserved. <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
                </div>
            </div>
        </footer>
        </div>

      );
}

export default ReadStories;

