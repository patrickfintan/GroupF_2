import "../CSS Folder/main.css";
import "../CSS Folder/MyStories.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; // Import useNavigate


function MyStories(){

    const [selectedCategory, setSelectedCategory] = useState('');
    const [enteredText, setenteredText] = useState('');
    const [stories, setStories] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() => {
            fetch('http://localhost:5000/stories?origin=MyStories')
            .then((response) => {
                if(!response.ok) throw new Error('Network responsewas not okay');
                return response.json();
            })
            .then((data) => setStories(data));

        }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handletitleChange = (event) => {
        setenteredText(event.target.value);
    };

    const clearFilters = () => {
        setSelectedCategory('');
        setenteredText('');
    };

    const handleEdit = (storysent) => {
        console.log("Entering the editing part");
        navigate("/WriteStory",{ state: storysent});
    };

    

    const filteredMovies = stories.filter((story) => {
        const matchesCategory = selectedCategory === '' || story.category === selectedCategory;
        const matchTitle = enteredText ==='' || (story.title.includes(enteredText));
    
    return matchTitle && matchesCategory;
    });

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
                Filter by Title:
            </label>
            <input
                    type="text"
                    id="ratingFilter"
                    value={enteredText}
                    onChange={handletitleChange}
                    placeholder="Enter rating..."
                    style={{ marginLeft: '15px', padding: '5px' }}
                />

            <button style={{ marginLeft: '15px', padding: '5px 10px', cursor: 'pointer' }} onClick={clearFilters}>
                clearFilters
            </button>
        </div><ul className="movie-list">
                {filteredMovies.map((story, index) => (
                    <li key={index} className="movie-item">
                        {(story.coverImage || story.coverImage == null)? (
                            <img src={`http://localhost:5000/${story.coverImage}`} alt={story.title} />
                        ): (
                            <div className="placeholder-image"></div> 
                        )}                        
                            <div className="movie-details">
                            <span>
                                <strong className="title">Title:</strong> {story.title}
                            </span>
                            <span>
                                <strong className="rating">Rating:</strong> {story.rating}
                            </span> 
                            <span>
                                <strong className="category">Category:</strong> {story.category}
                            </span>

                            <div className = "story-buttons">
                                <button className="edit-button" onClick = {() => handleEdit(story)} >Edit</button>
                                <button className={story.isPublished ? "unpublish-button" : "publish-button"} onClick={() => handlePublishToggle(story.id, story.isPublished)}>
                                    {story.isPublished ? "Unpublish" : "Publish"}
                                </button>
                                <button className="delete-button" onClick={() => handleDelete(story.id)}>Delete</button>
                            </div>
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

export default MyStories;

