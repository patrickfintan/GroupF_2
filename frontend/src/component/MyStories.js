import "../CSS Folder/main.css";
import "../CSS Folder/ReadStories.css";
import React, { useState } from 'react';


function MyStories({movies}){

    console.log(movies);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [enteredText, setenteredText] = useState('');

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

    

    const filteredMovies = movies.filter((movie) => {
        const matchesCategory = selectedCategory === '' || movie.category === selectedCategory;
        const matchTitle = enteredText ==='' || (movie.title.includes(enteredText));
    
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
                {filteredMovies.map((movie, index) => (
                    <li key={index} className="movie-item">
                        <img src={movie.image} alt={movie.title} />
                        <div className="movie-details">
                            <span>
                                <strong>Title:</strong> {movie.title}
                            </span>
                            <span className={movie.Rating}>Rating</span>
                            <span>
                                <strong>category:</strong> {movie.category}
                            </span>
                            <span>
                                <strong>Autohr:</strong> {movie.author.name} ({movie.author.email})
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

export default MyStories;

