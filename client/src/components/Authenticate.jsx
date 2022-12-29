import React,{useEffect} from 'react'
// import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';
const Authenticate = (props) => {
    const [cookies]=useCookies();
    // const navigate=useNavigate();

const setUser=async ()=>{
    const res=await fetch("/users/verify-user",{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${cookies.jwt}`
        }
    });
    if(!(res.status===200)){
        console.log("Unauthorized Access");
        window.open('http://localhost:3000/sign-in','_self')
    }
    else{
        const response=await res.json();
        props.onLogin(response)
        console.log("Authorization success");
    }

}
useEffect(()=>{
        setUser();
        // eslint-disable-next-line
    },[])
    return (
        <>
       
        {}

    </>
  )
}

export default Authenticate