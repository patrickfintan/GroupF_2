import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteUser = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteUser = () => {

    axios
      .delete(`http://localhost:5555/users/${id}`)
      .then(() => {

        navigate('/');
      })
      .catch((error) => {

        console.log(error);
      });
  };
  
  return (
    <div>
      <h1 class="container-fluid p-5 bg-primary text-white text-center">Delete User Account</h1>
      <div>
        <h3 >Are You Sure You want to delete this Account?</h3>
        <h2>{}</h2>

        <button
          type="button" class="btn btn-warning"
          onClick={handleDeleteUser}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteUser;