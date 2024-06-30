import React from 'react'
import allData from './dummydata'
import Star from './Star'
function Productcard({product}) {
  return (
    <div className='h-[280px] w-[200px] flex flex-col space-y-[2px]  '>
    <img src={product.photo} alt=""  className='h-[70%] w-full object-cover object-center'/>
    <h1 className='text-gray-400 text-sm'>{product.item}</h1>
    <h1 className='text-sm font-semibold'>{product.description}</h1>
    

    <Star styles={{height:14, width:14}}/>
    <div className='text-xs font-semibold'>${product.price}</div>

  
    </div>
  )
}

export default Productcard