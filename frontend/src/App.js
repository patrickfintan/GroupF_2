import { BrowserRouter as Router, Routes, Route, useLocation, useNavigation, useNavigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import React, { useEffect,useContext } from "react";

import WriteStory from './component/WriteStory';
import ReadStories from './component/ReadStories';
import FeedBack from './component/FeedBack';
import Contact from './component/contact';
import HomePage from './component/HomePage';
import ReadStory from './component/ReadStory';
import MyStories from './component/MyStories';
import SignIn from './component/SignIn';
import { UserProvider } from "./context";
import Registration from './component/Registration';
import ForgotPassword from './component/ForgotPassword';
import { UserContext } from "../src/context.js";

function App() {



 
  

  return (
    <UserProvider>
      <Router>
      <ConditionalNavbar/>
      <Routes>
        <Route path='/' element={<SignIn/>} />
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        <Route path='/Registration' element={<Registration/>} />
        <Route path='/WriteStory' element = {<WriteStory/>} />
        <Route path="/WriteStory/:storyId" element={<WriteStory />} /> {/* For editing an existing story */}
        <Route path = "/HomePage" element={<HomePage/>} />
        <Route path="/ReadStory" element={<ReadStory/>} />
        <Route path="/ReadStories" element={<ReadStories/>} />
        <Route path="/MyStories" element={<MyStories />} />
        <Route path="/FeedBack" element = {<FeedBack/>}/>
        <Route path="/Contact" element = {<Contact/>}/>
      </Routes>
      </Router>
    </UserProvider>
  );
}


function ConditionalNavbar() {
  const location = useLocation(); // Get the current path
  const navigate = useNavigate();
  const { setFromComponent } = useContext(UserContext);

  const routeToComponentMap = {
    "/HomePage": "HomePage",
    "/MyStories": "MyStories",
    "/ReadStories": "ReadStories",
    "/WriteStory" : "WriteStory",
};

const handleNavigation = (path) => {
  const componentName = routeToComponentMap[location.pathname] || "Unknown"; // Get the originating component dynamically
  setFromComponent(componentName); // Set the originating component dynamically
  navigate(path); // Navigate to the target path
};

if (location.pathname === "/" || location.pathname === "/signIn" || location.pathname === "/Registration" || location.pathname === "/ForgotPassword") {
  return null;
}
return <Navbar onNavigate={handleNavigation}/>;
}


export default App;
