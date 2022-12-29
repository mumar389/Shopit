import React from 'react'
import {NavLink} from "react-router-dom";
import { useCookies } from 'react-cookie';
const Item = (props) => {
    const [cookie]=useCookies();
    const handleClick=async(e)=>{
        e.preventDefault();
        if(!(cookie.jwt)){
            window.alert("Please Login to add item to your cart😤")
        }else{
            const res=await fetch(`/cart/add-cart/${props.id}`,{
                method:"POST",
                headers:{
                    "Content-type":"Application/json",
                    "Authorization":`Bearer ${cookie.jwt}`
                  }
            });
            if(!(res.status===200)){
                console.log("Error in adding to cart");
                window.alert("Failed to add item to cart,, please retry😢😢")
            }else{
                // const response=await res.json();
                // console.log(response.message);
                window.alert("Item added to cart");
            }
        }

    }
  return (
    <>
    <div className="col-3 mt-2 border bg-light mx-2">
  {/* <img src="..." className="card-img-top" alt="..."/> */}
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text">{props.desc}</p>
    <p className="card-text">Only at <i className="fa-solid fa-indian-rupee-sign"></i>{props.price}</p>
    <NavLink onClick={handleClick} className="btn btn-light">Add to Cart</NavLink>
  </div>
</div>
</>
  )
}

export default Item