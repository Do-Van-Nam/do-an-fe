import './App.css'
import { useState, useEffect, useContext } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import LoginRegister from './pages/LoginRegister'
import Home from './pages/Home/Home'
import Marketplace from './pages/Marketplace/Marketplace'
import ProductDetail from './pages/Marketplace/ProductDetail'
import Favourite from './pages/Favourite'
import Profile from './pages/Profile'
import Rooms from './pages/Rooms/Rooms'
import Problems from './pages/Problems/Problems'
import Statistics from './pages/Statistics/Statistics'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Checklist from './pages/Checklist'
import Message from './pages/Message'
import Budget from './pages/Budget'
import Guests from './pages/Guests'
import CartPage from "./pages/Cart/cart-page"
import OrderTrackingPage from "./pages/Cart/order-tracking-page"
import api from './api'
import PrivateRoute from './PrivateRoute'

import AppProvider from './AppContext'
import { AppContext } from './AppContext'

function App() {
  const location = useLocation()

  return (
    <AppProvider>
      {location.pathname !== '/' && <Header />}
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manager/rooms" element={<Rooms />} />
        <Route path="/manager/problems" element={<Problems />} />
        <Route path="/manager/statistics" element={<Statistics />} />
        // marketplace
        <Route path="/marketplace/*" element={<Marketplace />} />
        <Route path="/marketplace/:id/detail" element={<ProductDetail />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/cart" element={<CartPage />} /> 
        <Route path="/order-tracking" element={<OrderTrackingPage />} /> 
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Message />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </AppProvider>
  )
}

export default App
