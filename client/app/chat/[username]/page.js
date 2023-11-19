import React from 'react'

const page = ({params}) => {
  return (
    <>
      <p> {params.username} </p>
    </>
  )
}

export default page