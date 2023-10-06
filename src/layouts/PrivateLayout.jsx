import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateLayout = ({user}) => {

  return (
    <div className="bg-black">
      <Outlet />
    </div>
  )
}

export default PrivateLayout