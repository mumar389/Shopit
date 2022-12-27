import React,{useState,useEffect} from 'react'
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
      console.log(response);
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
    {items.map((data)=>{
     return <>
        <li>{data.title}</li>
        <li>{data.desc}</li>
        <li>{data.price}</li>
        <br/>
        </>
    })}
    </div>
  )
}

export default Home
