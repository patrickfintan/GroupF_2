import React , { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RegistrationNavbar from "./RegistrationNavBar.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context.js";
import axios from 'axios';

function Registration(){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(""); // New state for email
    const [password, setpassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const { setUserId } = useContext(UserContext); // Access setUserId from Context
    const isPasswordMatch = password && confirmPassword && password===confirmPassword;

    const handleRegistration = async (e) =>{
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/register", { username, email,password});
            const { userId } = response.data;

            setUserId(userId);
            navigate('/HomePage');
        }catch (error) {
            console.error("Registration Error:", error);
            alert("Failed to register. Please try again.");
        }
    };
    return(
        <div>
            <RegistrationNavbar />
            <div className="container mt-5">
            <div className="row justify-content-center"></div>
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Sign Up</h3>
                            <form onSubmit={handleRegistration}>

                                <div className="form-group">
                                    <label htmlFor = "email">Email</label>
                                    <input type = "email" className="form-control" id="email" placeholder="Enter youe email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor = "password">Password</label>
                                    <input type = "password" className="form-control" id="password" placeholder="Enter you new password" value={password} onChange={(e) => setpassword(e.target.value)} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor = "confirmPassword">confirm Password</label>
                                    <input type="password" className="form-control" id="confirmPassword" placeholder = "Confirm your new password" value = {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                                    {password && confirmPassword && password !== confirmPassword && (
                                    <small className="text-danger">Passwords do not match</small>)}
                                </div>

                                <button type="submit" className="btn btn-primary btn-block" disabled={!isPasswordMatch}>Register</button>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    );
}

export default Registration;