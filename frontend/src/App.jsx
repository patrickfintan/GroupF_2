import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import {Routes, Route} from 'react-router-dom'

import Home from './pages/Home';

import CreateUser from './pages/CreateUser';
import ShowUsers from './pages/ShowUsers';
import UpdateUser from './pages/UpdateUser';
import DeleteUser from './pages/DeleteUser';

const App = () => {
  return(

    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/users/create' element={<CreateUser/>} />
      <Route path='/users/show' element={<ShowUsers/>} />
      <Route path='/users/update/:id' element={<UpdateUser/>} />
      <Route path='/users/delete/:id' element={<DeleteUser/>} />
      
      
    </Routes>
  )
}

export default App;