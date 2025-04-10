import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
  const [firstName, setFirstName] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();


  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/users/${id}`)
    .then((response) => {
        setFirstName(response.data.firstName)
        setMobile(response.data.mobile);
        setLoading(false)
      }).catch((error) => {
        setLoading(false);
        alert('An error occured');
        console.log(error);
      });
  }, [])



  const handleEditUser = () => {
    const data = {
        firstName,
        mobile
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/users/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
    <div>
        <h1 class="container-fluid p-5 bg-primary text-white text-center">Update User</h1>

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
        <button onClick={handleEditUser}>
          Save
        </button>
        </div>
        ) : (
          <p>Please fill all mandatory fields before sumbiting</p>
        )
        }
    </div>
    </>
  )
}

export default UpdateUser;