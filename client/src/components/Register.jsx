import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate=useNavigate();
  const [data,setData]=useState({
    name:"",
    email:"",
    password:"",
    cp:"",
    phone:"",
    address:"",
  }) ;
  function handleChange(event){
    const name=event.target.name;
    const value=event.target.value;
    setData((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }
  let addData=async(e)=>{
    e.preventDefault();
    const {name,email,password,cp,phone,address}=data;
   //Using fetch api
   const res=await fetch("/users/create-user",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name:name,
      email:email,
      password:password,
      cp:cp,
      phone,
      address
    })
   });
   const dataBack=await res.json();
   if(!dataBack){
    window.alert("Error");
   }
   else{
    window.alert("Registration Successfull");
    navigate("/sign-in");
   }

  }
  return (
    <div className="login">
    <div className="container ">
      <main className="form-signin">
        <form method='POST'>
          <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>

          <div className="form-floating">
            <input
            value={data.name}
            onChange={handleChange}
              type="text"
              name="name"
              className="form-control"
              id="floatingInput"
              placeholder="Enter Name"
              required
            />
            <label htmlFor="floatingInput">Name-:</label>
          </div>
          <div className="form-floating">
            <input
            value={data.email}
            onChange={handleChange}
              type="email"
              name="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
            value={data.name}
            onChange={handleChange}
              type="number"
              name="phone"
              className="form-control"
              id="floatingInput"
              placeholder="Enter Phone"
              required
            />
            <label htmlFor="floatingInput">Phone-:</label>
          </div>
          <div className="form-floating">
            <textarea rows={5} cols={10} onChange={handleChange} name="address" value={data.address}         className="form-control"
              id="floatingInput" ></textarea>
            <label htmlFor="floatingInput">Address:-</label>
          </div>
          <div className="form-floating">
            <input
            value={data.password}
            onChange={handleChange}
              type="password"
              name="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating">
            <input
            value={data.cp}
            onChange={handleChange}
              type="password"
              name="cp"
              className="form-control"
              id="floatingPassword"
              placeholder="Re Enter Password"
              required
            />
            <label htmlFor="floatingPassword">Confirm Password-:</label>
          </div>
          <button onClick={addData} className="w-100 btn btn-lg btn-primary" type="submit">
            Sign Up
          </button>
        </form>
          <NavLink className="mt-5 btn btn-dark btn-lg" to="/sign-in">Already registered? click here to login.</NavLink>
      </main>
    </div>
    </div>
  )
}

export default Register