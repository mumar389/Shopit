import React,{useState,useEffect} from 'react'
import {useCookies} from 'react-cookie';
import { useNavigate,NavLink} from 'react-router-dom';
import CartItem from './CartItem';
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
    {cart.length===0?<>
      <h3>Please add items in your cart</h3>
    </>:
    <>{cart.map((c)=>{
      return  <>
      <CartItem key={c._id} title={c.title} desc={c.desc} id={c._id} price={c.price}/>
      </>
    })
    }
    <h4 className='card-text mt-5'>Total Price is-:{totalPrice}</h4>
    <NavLink className='card-text mt-15' to='/confirm-order'>Confirm Your Order</NavLink>
    </>}
    </div>
        </div>
    </div>
    </>
  )
}

export default Cart