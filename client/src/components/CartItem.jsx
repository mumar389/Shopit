import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

const CartItem = (props) => {
    const navigate=useNavigate();
  const [cookies]=useCookies();
    const handleRemove=async(e)=>{
        e.preventDefault();
        const res=await fetch(`/cart/remove-item/${props.id}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${cookies.jwt}`
            }
        });
        if(!(res.status===200)){
            window.alert("Failed to delete the item");
            navigate('/user-cart');
        }else{
            console.log("Item removed from cart🎉🎉🎉");
            window.alert("Item removed from cart🎉🎉🎉")
            window.open('http://localhost:3000/user-cart','_self')
        }
      }
  return (
    <div className="col-3 mt-2 border bg-light mx-2">
    {/* <img src="..." className="card-img-top" alt="..."/> */}
    <div className="card-body">
      <h5 className="card-title">{props.title}</h5>
      <p className="card-text">{props.desc}</p>
      <p className="card-text">Price-: <i className="fa-solid fa-indian-rupee-sign"></i>{props.price}</p>
      <NavLink onClick={handleRemove} className="card-text"><i className="fa-solid fa-trash"></i></NavLink>
    </div>
  </div>
  )
}

export default CartItem