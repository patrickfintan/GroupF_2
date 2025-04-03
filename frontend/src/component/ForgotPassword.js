import React, { useState } from "react";

function ForgotPassword(){
    console.log("ForgotPassword rendered");
    const [email, setEmail] = useState("");
    const handleSubmit = async(event) => {
        event.preventDefault();

        try{
            const response = await fetch("http://localhost:5000/forgot-password", {
                method : "POST",
                headers: {"content-Type": "application/json"},
                body: JSON.stringify({email}),
            });

            if(response.ok){
                alert("Password reset email sent! Please check your inbox.");
            }
            else {
                alert("Enter sending reset email. Please try again.");
            }
        }catch (error){
            console.error("Error:", error);
            alert("An error occured. Please try again.");
        }
    };

    return(
        <div className="container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Send Reset Link</button>
        </form>
      </div> 
    );
}

export default ForgotPassword;