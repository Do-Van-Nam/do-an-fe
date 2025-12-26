import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'

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
import Checklist from './pages/Checklist'
import RecommendPage from './pages/RecommendPage'
import Message from './pages/Message'
import Budget from './pages/Budget'
import Guests from './pages/Guests'

// Các import mới từ main branch
import CartPage from './pages/Cart/cart-page'
import OrderTrackingPage from './pages/Cart/order-tracking-page'

// Các import Seller của bạn
import SellerDashboard from './pages/Seller/SellerDashboard'
import ProductForm from './pages/Seller/ProductForm'
import SellerOrders from './pages/Seller/SellerOrders'
import SellerRoute from './components/SellerRoute'

// Admin pages
import ManagerOrderPage from './pages/Admin/ManageOder'
import ManagerUser from './pages/Admin/ManageUser'
import ManageVendorItem from './pages/Admin/ManageVendorItem'

// Private routes
import PrivateRoute from './PrivateRoute'

// Context
import AppProvider from './AppContext' // sửa thành AppProvider (đúng tên component)

function App() {
  const location = useLocation()

  return (
    <AppProvider>
      {location.pathname !== '/' && <Header />}
      <Routes>
        {/* Trang login – KHÔNG bọc PrivateRoute */}
        <Route path="/" element={<LoginRegister />} />

        {/* Tất cả các trang cần login – bọc bằng PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/manager/rooms" element={<Rooms />} />
          <Route path="/manager/problems" element={<Problems />} />
          <Route path="/manager/statistics" element={<Statistics />} />

          {/* Marketplace */}
          <Route path="/marketplace/*" element={<Marketplace />} />
          <Route path="/marketplace/:id/detail" element={<ProductDetail />} />

          <Route path="/checklist" element={<Checklist />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Message />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/budget" element={<Budget />} />

          {/* Cart & Order */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-tracking" element={<OrderTrackingPage />} />

          {/* Recommend */}
          <Route path="/recommend" element={<RecommendPage />} />
        </Route>

        {/* Admin routes – tạm không bọc PrivateRoute (nếu cần thì bọc sau) */}
        <Route path="/admin/manage-order/*" element={<ManagerOrderPage />} />
        <Route path="/admin/manage-user" element={<ManagerUser />} />
        <Route path="/admin/manage-vendor-item" element={<ManageVendorItem />} />

        {/* Seller routes – dùng SellerRoute riêng */}
        <Route
          path="/seller"
          element={
            <SellerRoute>
              <SellerDashboard />
            </SellerRoute>
          }
        />
        <Route
          path="/seller/add"
          element={
            <SellerRoute>
              <ProductForm />
            </SellerRoute>
          }
        />
        <Route
          path="/seller/edit/:id"
          element={
            <SellerRoute>
              <ProductForm />
            </SellerRoute>
          }
        />
        <Route
          path="/seller/orders"
          element={
            <SellerRoute>
              <SellerOrders />
            </SellerRoute>
          }
        />
      </Routes>
    </AppProvider>
  )
}

export default App
