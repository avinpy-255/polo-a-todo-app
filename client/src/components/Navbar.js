import React from 'react'

const Navbar = () => {
  return (
  <div className=" mx-auto bg-green-200 w-full ">
    <div className="flex justify-between items-center ">
      <h1 className="text-3xl font-bold px-1 py-1">Polo</h1>
      <div className="flex items-center space-x-4">
        <button className="btn btn-primary">➕</button>
        <button className="btn btn-primary">🏠</button>
        <button className="btn btn-primary">🔍</button>
      </div>
    </div>
   </div> 
  )
}

export default Navbar