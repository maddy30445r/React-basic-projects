import React, { useState } from "react";
import Productcard from "./Productcard";
import allData from "./dummydata";

function Products() {
  const[sort,setsort]=useState("default");
  let sorted=allData.slice();
if(sort=="price"){
  sorted.sort((a,b)=>a.price-b.price);
}
if(sort=="name"){
  sorted.sort((a,b)=>a.description.localeCompare(b.description));
  console.log(sorted);
}

  return (
    
    <div className="flex flex-col bg-gray-100 px-16   w-full py-8 min-h-[calc(100vh-6.4rem)]" >
      
    <div className=" bg-white self-center relative ">
      <select value={sort} onChange={(e)=>setsort(e.target.value)} className="absolute text-sm border border-gray-300 mt-2 right-12" name="" id="">
        <option value="default">Default Sort</option>
        <option value="name">Sort By Name</option>
        <option value="price">Sort By Price</option>
      </select>
     <div className="flex flex-wrap gap-5 px-6 items-center  py-4 my-6">
      {sorted.map((product) => (
        <Productcard product={product} key={product.id} />
      ))}
      </div>
      
      
    </div>
      </div>
      
  );
}

export default Products;
