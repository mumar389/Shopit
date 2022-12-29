import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

const Cart = () => {
  const [cookies]=useCookies();
  let [totalPrice,setTotalPrice]=useState(0);
  const navigate=useNavigate();
    const [cart,setCart]=useState([]);
    const getCart=async ()=>{
      const res=await fetch('/cart/get-cart',{
        method:"GET",
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${cookies.jwt}`
        }
      });
      if(!(res.status===200)){
        window.alert("Error");
        console.log("Error|| user not logged in");
        navigate('/sign-in');
      }else{
        const response=await res.json();
        setCart((prev)=>{
          return [
           ...response.data.cart
          ]
        });
        setTotalPrice(()=>{
          return response.totalPrice
        })
      }
    }
    useEffect(()=>{
      getCart();
      // eslint-disable-next-line
  },[])
  return (
    <>
    <div>
    <div className='container mt-2'>
        <div className='row'>
    {cart.map((c)=>{
      return  <>
      <div className="col-3 mt-2 border bg-light mx-2">
  {/* <img src="..." className="card-img-top" alt="..."/> */}
  <div className="card-body">
    <h5 className="card-title">{c.title}</h5>
    <p className="card-text">{c.desc}</p>
    <p className="card-text">Price-: <i className="fa-solid fa-indian-rupee-sign"></i>{c.price}</p>
  </div>
</div>
      </>
    })}
    <h4 className='card-text mt-5'>Total Price is-:{totalPrice}</h4>
    </div>
        </div>
    </div>
    </>
  )
}

export default Cart