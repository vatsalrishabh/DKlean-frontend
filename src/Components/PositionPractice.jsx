import React from 'react'

const PositionPractice = () => {
  return (
    <div className='Main-parentdiv bg-red-400 h-[100vh]'>
        <div className=' parentdiv bg-green-400 h-[20vh]'>
       <span className='bg-white absolute right-[50%] top-[50%]'>parent</span>
    </div>
    <div className='relative parentdiv bg-yellow-400 h-[20vh]'>
       parent
    </div>
    <div className='parentdiv bg-blue-400 h-[20vh]'>
       parent
    </div>
    <div className='parentdiv'>
       parent
    </div>
    </div>
  )
}

export default PositionPractice
