import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AppContext } from './AppContext' // 👈 SỬA ĐƯỜNG DẪN Ở ĐÂY

const PrivateRoute = () => {
  const { acc } = useContext(AppContext)
  const location = useLocation()

  if (!acc) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default PrivateRoute
