import React, { useEffect, useState } from 'react'
import  { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Authenticate from './Authenticate';
import OrderItem from './OrderItem';
const Order = () => {
    const [cookies]=useCookies();
    const [order,setOrder]=useState([]);
    const navigate=useNavigate();
    const handleOrders=async()=>{
        const res=await fetch('/order/fetch-order',{
            method:"GET",
            headers:{
              "Content-type":"Application/json",
              "Authorization":`Bearer ${cookies.jwt}`
            }
        });

        if(!(res.status===200)){
            console.log("Error in fetching the order");
            navigate('/');
        }else{
            const response=await res.json();
            setOrder((prev)=>{
            return[...prev,...response.data]
            })
        }
    }
    const handleUser=(data)=>{
    }

    useEffect(()=>{
        handleOrders();
        // eslint-disable-next-line
    },[])
  return (
    <>
    <Authenticate onLogin={handleUser}/>
    <h1 className='mx-3'>Your Orders-:</h1>
    <div className='container mt-2'>
        <div className='row'>
    {order.map((o)=>{
       return <OrderItem key={o.id} no={o.orderno} total={o.totalAmount} items={o.items}/>
    })}
    </div>
        </div>
    </>
  )
}

export default Order