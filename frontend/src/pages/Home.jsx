import React, {useEffect, useState} from 'react'

import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  
  return (

    <div class="homePage">
      <div className="container-fluid p-5 bg-primary text-white text-center">
      <h1>Home Page</h1>
      </div>
      <br></br>
      <div>
        <Link type="button" className="btn btn-success" to='/users/create'>
          Create User
        </Link>
        <p1> </p1>
        <Link type="button" className="btn btn-primary" to='/users/show'>
          Show All Users
        </Link>
      </div>
      <br></br>
    </div>
  )
}

export default Home