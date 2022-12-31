import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';

import Authenticate from './Authenticate'
import {useCookies} from 'react-cookie';

const ConfirmOrderPage = () => {
    const navigate=useNavigate();
    const [cookies]=useCookies();
    const [mode,setMode]=useState("");

        function handleChange(e){
            const {value}=e.target;
            setMode(value);
        }
        const handleSubmit=async(e)=>{
            e.preventDefault();
            const res=await fetch('/order/confirm-order',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${cookies.jwt}`
                },
                body:JSON.stringify({
                    payment:mode
                })
            });
            if(!(res.status===200)){
                console.log("Error");
                window.alert("Failed To place your order, please try again later")
                navigate('/user-cart');
                // window.open("http://localhost:3000/user-cart",)
            }else{
                    const response=await res.json();
                    window.alert(`Your order has been confirmed and Order id is-:${response.data}`);
                    navigate('/')
            }
        }
  return (
    <>
    <Authenticate />
    <div className='container'>
    <h1>Confirm Your Order by entering details-:</h1>
    <h4 className='mx-5'>Payment Mode-:</h4> 
    <div className='mx-5'>
    <input required className='' type="radio" name="payment" value={`online`} onChange={handleChange} />Online
    <br/>
    <input required className='' type="radio" name="payment" value={`cash`} onChange={handleChange} />Offline
    </div>
    <button className='mx-5 mt-10 btn btn-danger' type='submit' onClick={handleSubmit}>Confirm Order</button>
    </div>
    </>
  )
}

export default ConfirmOrderPage