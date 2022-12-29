import React from 'react';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import {Route,Routes} from "react-router-dom";
import Navbar from './Navbar';
import Cart from './Cart';
function App() {
 
  return (
    <div className="App">
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sign-in" element={<Login />} />
    <Route path="/sign-up" element={<Register />} />
    <Route path="/user-cart" element={<Cart />} />
    </Routes>

    </div>
  );
}

export default App;
