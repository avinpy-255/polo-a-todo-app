import React from 'react'

const StyleTodo = () => {
  return (
    <div>
        <div className='bg-green-500 rounded-lg py-2 px-2 mt-6'>
            <p className='font-mono font-bold text-2xl'>Task Title</p>
            <p className='font-mono text-lg '>Description</p>
            <button className='btn btn-primary'>✏️</button>
            <button className='btn btn-danger'>💣</button>
        </div>
        
    </div>
  )
}

export default StyleTodo