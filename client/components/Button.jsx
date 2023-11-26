import React from 'react'

const Button = (props) => {

  return (
    <>
        <button className='text-lg outline-none border-gray-600 text-white border p-2 w-24 rounded-lg hover:bg-slate-800'>
          {
            props.buttonName 
          }
        </button>

    </>
  )
}

export default Button