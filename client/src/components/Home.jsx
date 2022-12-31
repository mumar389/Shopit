import React,{useState,useEffect} from 'react'
import Item from './Item';
// import {useNavigate} from 'react-router-dom';

const Home = () => {
  // const navigate=useNavigate();
  const [items,setItem]=useState([])

  const fetchItem=async()=>{
    const res=await fetch('/items/fetch-items',{
      method:"GET",
      headers:{
        "Content-type":"Application/json"
      }
    });
    if(!(res.status)===200){
      console.log("error in fetching the items");
    }else{
      const response=await res.json();
      // console.log(response);
      setItem((prev)=>{
       return [
        ...response.data
       ]
      })
    }
  }

  useEffect(()=>{
      fetchItem();
    // eslint-disable-next-line
  },[])
  
  return (
    <div>
        <div className='container mt-2'>
        <div className='row'>
    {items.map((data)=>{
     return <>

        <Item key={data.id} id={data._id} title={data.title} desc={data.desc} price={data.price}  />
        </>
    })}
        </div>
        </div>
    </div>
  )
}

export default Home
