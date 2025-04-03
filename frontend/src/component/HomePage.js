import '../CSS Folder/HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import React, { useState,useEffect } from "react";
import axios from 'axios';

function HomePage(){

  const[movies, setMovies] = useState([]);
  const navigate = useNavigate();

  console.log(movies);
  useEffect(() => {
    const fetchMovies = async () => {
      try{
        const response = await axios.get("http://localhost:5000/api/movies");
        setMovies(response.data);
      }catch (error){
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleReadMore = (movie) =>{
    navigate("/ReadStory", { state: movie});
  };
  
    return(
    <div className="about-section">
      <div className="content">
        <h1>Welcome to BrandName</h1>
        <p>
          BrandName is dedicated to providing exceptional services and solutions tailored to your needs. Our website serves as a gateway to explore our offerings and discover more about us.
        </p>
      </div>
      
      <div className="video-container">
        <video autoPlay muted controls className="centered-video">
          <source src="..\..\Circuit design Smashing Waasa-Turing _ Tinkercad - Google Chrome 2022-05-08 20-17-52.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      <div className="features-section container">
        {movies.map((categoryItem, index) =>(
          <div key = {index}>
            <h2 className="feature-header">Top Rated {categoryItem.category} Strories</h2>  
            <div className="row">
            {categoryItem.movies.map((movie) => (
              <div className="col-md-4 feature-item">
              {movie.coverImage && (
              <img
                  src={`http://localhost:5000/${movie.coverImage}`}
                      alt={movie.title}
                        className="img-fluid rounded"
                        />
              )}
            <h3>{movie.title}</h3>
            <p>{movie.summary}</p>
            <button
              className="btn btn-primary"
              onClick={() => handleReadMore(movie)}>Read more</button>
            </div>
            ))}
            </div>
          </div>
        ))}
        </div>

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

export default HomePage;