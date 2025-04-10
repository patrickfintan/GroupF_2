import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ShowUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/users')
        .then((response) => {
          setUsers(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
       }, []);


    return (
        <div>
            <h1 class="container-fluid p-5 bg-primary text-white text-center">Show User Accounts</h1>

            {loading ? (
        <p>Loading...</p>
      ) : (
        <p>Number of accounts: {users.length}</p>
      )}
        
        <table class="table table-hover">
              <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Mobile</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
              </thead>
              <tbody>
                {
                  users.map((user, index) => (
                    <tr key={user._id}>
                      <td>
                        {user.firstName}
                      </td>
                      <td>
                        {user.mobile}
                      </td>
                      <td>
                        <Link to={`/users/update/${user._id}`}>
                          Update Account
                        </Link>
                      </td>
                      <td>
                      <Link to={`/users/delete/${user._id}`}>
                          Delete Account
                        </Link>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        </div>

        
        
    );
};

export default ShowUsers;