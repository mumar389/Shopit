import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom';  
import  { useCookies } from 'react-cookie';

const Navbar = () => {
  const navigate=useNavigate();
  const [cookies]=useCookies();
  const handleClick=async(e)=>{
    e.preventDefault();
    const res=await fetch('/users/sign-out',{
      method:"GET",
      headers:{
        "Content-type":"Application/json",
        "Authorization":`Bearer ${cookies.jwt}`
      }
    });
    if(!(res.status)===200){
      console.log("Error in logging out");
      navigate('back');
    }else{
      console.log("Logout Successfull");
      window.alert("Logout Sucessfull");
      window.open('/','_self')
    }
  }



  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-warning-subtle">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">Navbar</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        {cookies.jwt ?
        <>
          <li className="nav-item">
          <NavLink className="nav-link" to="/sign-in">Profile</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" onClick={handleClick}>SignOut</NavLink>
        </li>
        </>:
        <>
        <li className="nav-item">
          <NavLink className="nav-link" to="/sign-in">Signin</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/sign-up">Signup</NavLink>
        </li>
        </>}
       
      </ul>
    </div>
  </div>
</nav>
{/* Bootstrap DropDown 
 <li className="nav-item dropdown">
          <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </NavLink>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" href="#">Action</NavLink></li>
            <li><NavLink className="dropdown-item" href="#">Another action</NavLink></li>
            <li><hr className="dropdown-divider"/></li>
            <li><NavLink className="dropdown-item" href="#">Something else here</NavLink></li>
          </ul>
        </li>       
 */}


    </div>
  )
}

export default Navbar