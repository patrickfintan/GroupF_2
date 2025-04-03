import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context.js";
import "../CSS Folder/SignIn.css";

function SignIn(){

    const navigate = useNavigate();
    const { setUserId } = useContext(UserContext); // Access setUserId from context

    const handleRegistration = () => {
        navigate('/Registration');        
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;
        const email = event.target.email.value;

        try{
            const response = await fetch("http://localhost:5000/signIn", {
                method: "POST",
                headers: {"content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            });

            if (response.ok){
                const data = await response.json();
                const { userId } = data;
                console.log(userId)
                setUserId(userId);
                navigate('/HomePage');
            } else{
                alert("Invalid username or password. Please try again.");
            }
        } catch (error){
            console.error("Sign In Error:", error);
            alert("An error occured. Please try again later");
        }
    };

    return (
        <>
        <div className="about-section">
            <div className="content">
                <h1>Welcome to BrandName</h1>
                <p>
                    BrandName is dedicated to providing exceptional services and solutions tailored to your needs. Our website serves as a gateway to explore our offerings and discover more about us.
                </p>
            </div>
        </div>
        <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="form-container shadow p-4 rounded bg-white mt-5">
                            <h2 className="text-center mb-4">Sign Up Form</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="username" placeholder="Enter your username" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter your password" required />
                                </div>

                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="terms" required />
                                    <label className="form-check-label" htmlFor="terms">
                                        I agree to the Terms of Service and Privacy Policy
                                    </label>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block">
                                    Sign Up
                                </button>

                                <button type="button" className="btn btn-secondary btn-block mt-3" onClick={handleRegistration}>Registration</button>
                                <div className="alert alert-info mt-3" role="alert">
                                    Please register if you are a new user.
                                </div>

                                <div className="text-center mt-3">
                                    <a href="/ForgotPassword" className="btn btn-link">Forgot Password?</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div></>
    );
}

export default SignIn;