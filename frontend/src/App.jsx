import "./App.css";
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import PrivateRoute from './components/PrivateRoute'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Blog from "./components/CreateBlog";
import BlogList from './components/BlogList'
import Profile from './components/Profile'
import Footer from "./components/Footer";
import Update from "./components/Update";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<BlogList />} />

        {/* Private Components */}

          <Route element={<PrivateRoute/>}>
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/logout" element={<h1>Logout</h1>} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
