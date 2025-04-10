import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateUser = () => {
  //declare data for new CustomerAcc

  const [firstName, setFirstName] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



  //runs when save button is clicked
  //posts new phone to database
  const handleSaveReview = () => {
    console.log("button clicked 1");
    const data = {
        firstName,
        mobile
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/users', data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('Sadly an error has occurred :(');
        console.log(error);
      });
      console.log("button clicked 2");
  };

  return (
    <div>
      <h1 class="container-fluid p-5 bg-primary text-white text-center">Create New User</h1>
      <div>
        <div>
          <label>First Name: </label>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Mobile: </label>
          <input
            type='number'
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        {/* Conditional Rendering to ensure that user cannot sumbit a user unless all mandatory fields are filled */}
        {/* Note: routes in backend also ensure you are sending the required fields */}
        {
        firstName !="" &&
        mobile != ""
        ? (
        <div>
        <button onClick={handleSaveReview}>
          Save
        </button>
        </div>
        ) : (
          <p>Please fill all mandatory fields before sumbiting</p>
        )
        }
      </div>
    </div>
  )
}

export default CreateUser