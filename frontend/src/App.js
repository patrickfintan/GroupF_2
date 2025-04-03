import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
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

function App() {

const movies = [{
  title: "Movie Title 3",
  category: "Action",
  summary: "First Story",
  image: "https://via.placeholder.com/80x120",
  Rating: "1"
}]

 
  

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
        <Route path="/MyStories" element={<MyStories movies={movies} />} />
        <Route path="/FeedBack" element = {<FeedBack/>}/>
        <Route path="/Contact" element = {<Contact/>}/>
      </Routes>
      </Router>
    </UserProvider>
  );
}


function ConditionalNavbar() {
  const location = useLocation(); // Get the current path

  // Don't show Navbar for the Registration page("/") and SignIn Page("/SignIn")
  if (location.pathname === "/" || location.pathname === "/signIn" || location.pathname === "/Registration" || location.pathname === "/ForgotPassword") {
      return null;
  }
  console.log("Hi");
  return <Navbar />;
}


export default App;
