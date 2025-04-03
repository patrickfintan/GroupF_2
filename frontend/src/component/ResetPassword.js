import React, { useState } from "react":
import {useNavigate, useSearchParams } from "react-router-dom";

function ResetPassword(){
    const [password, setpassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password != confirmPassword) {
            setError("Password do not match");
            return;
        }

        try{
            const response = await fetch("http://localhost:5000/reset-password",{
                method :"POST",
                headers: {"content-Type" : "application/json"},
                body: JSON.stringify({ token, password}),
            } );

            if (response.ok){
                alert("Password reset successfully! Please log in.");
                navigate("/");
            } else{
                alert("Invalid token or error resetting password. Please try again");
            }
        }catch (err){
            console.error("Error", err);
            alert("An error occurred. PLease try again.");
        }
    };

    return(
        <div className="container">
            <h2>Reset Password</h2>
            {error && <p style={{ color: "red"}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label hrmlFor = "password">New Password</label>
                    <input type = "password" id="password" className="form-control" placeholder="Enter your new password" value = {password} onChange={(e) => setpassword(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
        </div>
    );

}

export default ResetPassword;