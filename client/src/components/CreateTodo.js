import React from 'react'

const CreateTodo = () => {
  return (
    <div className="bg-green-700 shadow-md  px-3 py-3">
    <h2 className="text-xl text-lime-200 font-bold ">Task name</h2>
    <h2 className="text-sm text-lime-200  ">Description</h2>
     <div className="flex justify-between items-center mt-1.5">
       <button className="btn btn-primary font-mono bg-green-300 rounded-lg px-1 font-bold italic py-1">Add</button>
     </div>
    </div>
  )
}

export default CreateTodo