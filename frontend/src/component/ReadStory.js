import React, { useState,useEffect,useContext } from "react";
import "../../src/CSS Folder/ReadStory.css";
import "../../src/CSS Folder/HomePage.css";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context.js";
import axios from "axios";
import jsPDF from "jspdf"; // Import jspdf for download pdf



function ReadStory(){

    const location = useLocation();
    const movie = location.state || {};
    const [storyData, setStoryData] = useState(null); // State to store the story data
    const { userId } = useContext(UserContext); // Get the userId from context
    console.log(userId);
    useEffect(() => {
        const fetchStoryData = async () =>{
            try {
                const response = await axios.get(`http://localhost:5000/api/story/${movie.storyId}`);
                setStoryData(response.data);
            } catch (error){
                console.error("Enter fetching story data:", error);
            }
        };

        fetchStoryData();

        const logStoryView = async () => {
            const viewLog = {
                userIdViewed: userId || "guest",
                storyId: movie.storyId,
                viewedAt: new Date().toISOString()
            };
            console.log(viewLog);
            try{
                await axios.post("http://localhost:5000/api/story-view-log",viewLog);
            }catch (error) {
                console.error("Error logging story view:", error);
            }
        };

        logStoryView();
    }, [userId, movie.storyId]);

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        try {     
          // Basic text addition
          doc.setFontSize(18);
          doc.text(movie.title || "Story Title", 10, 10);          doc.save("test.pdf");
      
          doc.setFontSize(12);
          const storyContent = storyData?.story || "Story content is loading...";
          const lines = doc.splitTextToSize(storyContent, 180); // Wrap text
          doc.text(lines, 10, 20);

          doc.save(`${movie.title || "story"}.pdf`);

          console.log("PDF generated successfully!");
        } catch (error) {
          console.error("PDF generation error:", error);
        }
      };


      const handleSubmitRating = async (event) => {
        event.preventDefault();

        const ratingData = {
            storyId : movie.storyId,
            userId: userId || "guest",
            name: event.target.name.value,
            email: event.target.email.value,
            review: event.target.review.value,
            rating: parseInt(event.target.rating.value, 10),
        };

        console.log(ratingData);
        try{
            await axios.post("http://localhost:5000/api/save-rating", ratingData);

            await axios.post("http://localhost:5000/api/update-story-rating", {storyId: movie.storyId});

            alert("Rating saved and story rating updated successfully.");
        }catch (error) {
            console.error("Error saving the rating:", error);
        }
      };


    return(
        <><div className="print-container">
            <header className="print-header">
                <h1>{movie.title}</h1>
                <h2>{movie.storyType}</h2>
            </header>

            <div className="image-container">
                {movie.coverImage ? (
                    <img src={`http://localhost:5000/${movie.coverImage}`} alt="Story Illustration" className="header-image" />
                ) : null}
            </div>
            <div className="print-contain">
                <main className="print-content">
                    <p>{storyData?.story || "Loading content..."}</p>
                </main>

                <div className="button-container">
                    <button className="download-button" onClick={handleDownloadPDF}>Download PDF</button>
                </div>
            </div>
            
        </div>
        

        <div className="rate-story-container">
            <form className="rate-story-form" onSubmit={handleSubmitRating}>
                <h2>Rate the story</h2>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Please Enter your Email!"/>
                </div>
                <div className="form-group">
                    <label htmlFor = "review">Rebiew</label>
                    <textarea id = "review" name="review" placeholder="Write you review regarding the stroy read" />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <select id="rating" name="rating">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button type="submit" className="send-button">Send</button>
            </form>
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
        
        </>
    );
}

export default ReadStory;