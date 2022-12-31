import React from 'react'

const OrderItem = (props) => {
  return (
    <div className="col-3 mt-2 border bg-light mx-2">
    {/* <img src="..." className="card-img-top" alt="..."/> */}
    <div className="card-body">
      <h5 className="card-title">Your Order Number is-: {props.no}</h5>
      <br/>
      {props.items.map((it)=>{
        return <>
            <h5 className='card-text'>{it.title}</h5>
            <h5 className='card-text'>{it.desc}</h5>
            <h5 className='card-text'><i className="fa-solid fa-indian-rupee-sign"></i>{it.price}</h5>
        </>
      })}
    </div>
      <h2 className="card-text">please pay <i className="fa-solid fa-indian-rupee-sign"></i>{props.total}</h2>
  </div>
  )
}

export default OrderItem