import React from 'react';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import {Route,Routes} from "react-router-dom";
import Logout from './Logout';
import Navbar from './Navbar';
function App() {
 
  return (
    <div className="App">
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sign-in" element={<Login />} />
    <Route path="/sign-up" element={<Register />} />
    <Route path="/log-out" element={<Logout />} />
    </Routes>

    </div>
  );
}

export default App;
