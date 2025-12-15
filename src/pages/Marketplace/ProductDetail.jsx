"use client"

import { useState,useEffect, useContext } from "react"
import { Star, ShoppingCart, Home, X, Calendar } from "lucide-react"
import ProductImages from "./product-images"
import ShopInfo from "./shop-info"
import ReviewsSection from "./reviews-section"
import SimilarProducts from "./similar-products"
import api from "../../api"
import type from "../../utils"
import { useParams } from "react-router-dom";
import { AppContext } from "../../AppContext"
import  CheckoutPage  from "../Cart/checkout-page"

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showRentPopup, setShowRentPopup] = useState(false)
  const [vendorItem, setVendorItem] = useState()
  const [shop, setShop] = useState()
  const { id } = useParams();
  const { acc } = useContext(AppContext)
  const [items,setItems] = useState([])
  const [reviews,setReviews] = useState([])
  const [rentData, setRentData] = useState({
    startDate: "",
    endDate: "",
    name: "",
    phone: "",
    address: "",
    quantity: 1,
  })
    

  useEffect(()=>{
    try {
      api.get(`/vendoritem/type/${vendorItem.type}`)
          .then(response =>{
            setItems(response.data.vendoritem.slice(0,4))
            console.log(response.data.vendoritem)
          }
          )
          .catch(error=>
            console.log(error)
          )
  
    } catch (error) {
      console.log(error)
    }
  },[vendorItem?.type])
  useEffect(() => {
  const fetchData = async () => {
    try {
      // 1️⃣ Gọi API đầu tiên
      const resItem = await api.get(`/vendoritem/id/${id}`);
      console.log(resItem.data.vendoritem);
      setVendorItem(resItem.data.vendoritem);

      // 2️⃣ Lấy accId từ kết quả API đầu tiên
      const accId = resItem.data.vendoritem.accId;

      // 3️⃣ Gọi API tiếp theo
      const resShop = await api.get(`/acc/id/${accId}`);
      console.log(resShop.data.user);
      setShop(resShop.data.user);

   const res = await   api.get(`/review/${id}`)
  setReviews(res.data.reviews)
  console.log(res.data.reviews)
    } catch (error) {
      console.log("Error:", error);
    }
  };

  fetchData();
}, [id]);
  const handleBuyNow = () => {
    alert(`Added ${quantity} item(s) to cart!`)
  }
  const handleAddToCart = async () => {
    if (!acc?._id) {
      alert("Vui lòng đăng nhập để thêm vào giỏ hàng")
      return
    }
    try {
      await api.post('/cart/add', {
        accId: acc._id,
        vendorId: vendorItem?._id,
        quantity,
      })
      alert("Đã thêm vào giỏ hàng")
    } catch (error) {
      console.log(error)
      alert("Thêm vào giỏ hàng thất bại")
    }
  }
  const handleRent = () => {
    setRentData({ ...rentData, quantity })
    setShowRentPopup(true)
  }

  const handleRentSubmit = async () => {
    if (!rentData.startDate || !rentData.endDate || !rentData.name || !rentData.phone || !rentData.address) {
      alert("Vui lòng điền đầy đủ thông tin")
      return
    }

    if (new Date(rentData.startDate) >= new Date(rentData.endDate)) {
      alert("Ngày kết thúc phải sau ngày bắt đầu")
      return
    }

    try {
      // TODO: Gọi API để tạo đơn thuê
      console.log("Rent data:", rentData)
      alert("Yêu cầu thuê đã được gửi thành công!")
      setShowRentPopup(false)
      setRentData({
        startDate: "",
        endDate: "",
        name: "",
        phone: "",
        address: "",
        quantity: 1,
      })
    } catch (error) {
      console.log(error)
      alert("Gửi yêu cầu thuê thất bại")
    }
  }

  const handleContactSeller = () => {
    alert("Opening contact form...")
  }
  if (!vendorItem) return <p>Loading...</p>
  const handleCheckout = () => {
      setShowCheckout(true)
  }

  const handleBackFromCheckout = () => {
    setShowCheckout(false)
  }

  if (showCheckout) {
    return <CheckoutPage items={[{
      vendorId: vendorItem._id,
      quantity : quantity,
      vendorDetail: vendorItem
    }]} totalPrice={vendorItem.priceSell*quantity} onBack={handleBackFromCheckout} />
  }
  return (
    <main className="min-h-screen bg-background">
      {/* Rent Popup */}
      {showRentPopup && (
        <div className="mt-16 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white bg-card rounded-lg border border-border shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="bg-white sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Thuê Sản Phẩm</h2>
              <button
                onClick={() => setShowRentPopup(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Product Info */}
              <div className="pb-4 border-b border-border">
                <h3 className="font-semibold text-foreground mb-2">{vendorItem.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Giá thuê: <span className="font-semibold text-foreground">{vendorItem.priceRent?.toLocaleString()} đ/{vendorItem.periodRent}</span>
                </p>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Ngày Bắt Đầu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="date"
                    value={rentData.startDate}
                    onChange={(e) => setRentData({ ...rentData, startDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Ngày Kết Thúc <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="date"
                    value={rentData.endDate}
                    onChange={(e) => setRentData({ ...rentData, endDate: e.target.value })}
                    min={rentData.startDate || new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Số Lượng <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRentData({ ...rentData, quantity: Math.max(1, rentData.quantity - 1) })}
                    className="rounded border border-border px-3 py-2 hover:bg-muted"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={rentData.quantity}
                    onChange={(e) => setRentData({ ...rentData, quantity: Math.max(1, Number.parseInt(e.target.value) || 1) })}
                    className="w-16 rounded border border-border px-3 py-2 text-center"
                    min="1"
                  />
                  <button
                    type="button"
                    onClick={() => setRentData({ ...rentData, quantity: rentData.quantity + 1 })}
                    className="rounded border border-border px-3 py-2 hover:bg-muted"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Họ và Tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={rentData.name}
                  onChange={(e) => setRentData({ ...rentData, name: e.target.value })}
                  placeholder="Nhập họ và tên"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Số Điện Thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={rentData.phone}
                  onChange={(e) => setRentData({ ...rentData, phone: e.target.value })}
                  placeholder="Nhập số điện thoại"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Địa Chỉ Nhận Hàng <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rentData.address}
                  onChange={(e) => setRentData({ ...rentData, address: e.target.value })}
                  placeholder="Nhập địa chỉ nhận hàng"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Total Price Calculation */}
              {rentData.startDate && rentData.endDate && (
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Tổng tiền thuê:</span>
                    <span className="text-xl font-bold text-blue-600">
                      {(() => {
                        const start = new Date(rentData.startDate)
                        const end = new Date(rentData.endDate)
                        const diffTime = Math.abs(end - start)
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                        const months = Math.ceil(diffDays / 30)
                        return (vendorItem.priceRent * months * rentData.quantity).toLocaleString()
                      })()} đ
                    </span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowRentPopup(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleRentSubmit}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-semibold"
                >
                  Gửi Yêu Cầu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Product Marketplace</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Left Column - Product Images */}
          <div className="lg:col-span-2">
            <ProductImages
              image={vendorItem.imgLink}
              thumbnails={[]}
              productName={vendorItem.name}
            />
          </div>

          {/* Right Column - Product Info & Actions */}
          <div className="space-y-6 lg:col-span-2">
            {/* Product Header */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-block rounded-full bg-pink-200 px-3 py-1 text-sm font-medium text-primary-foreground">
                  {type[vendorItem.type] ?? ""}
                </span>
                <span className="inline-block rounded-full bg-pink-200 px-3 py-1 text-sm font-medium text-accent-foreground">
                  {vendorItem.typeVendor === "both"
                    ? "Bán & Cho Thuê"
                    : vendorItem.typeVendor === "sell"
                      ? "Bán"
                      : "Cho Thuê"}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">{vendorItem.name}</h1>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(vendorItem.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {Math.floor(vendorItem.rate*10)/10} ({vendorItem.noReview} đánh giá)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2 rounded-lg border border-border bg-card p-4">
              {(vendorItem.typeVendor === "sell" || vendorItem.typeVendor === "both") && (
                <div>
                  <p className="text-sm text-muted-foreground">Giá Bán</p>
                  <p className="text-2xl font-bold text-foreground">{vendorItem.priceSell.toLocaleString()} đ</p>
                </div>
              )}
              {(vendorItem.typeVendor === "rent" || vendorItem.typeVendor === "both") && (
                <div>
                  <p className="text-sm text-muted-foreground">Giá Thuê</p>
                  <p className="text-xl font-semibold text-foreground">{vendorItem.priceRent.toLocaleString()} đ/tháng</p>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Số Lượng</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded border border-border px-3 py-2 hover:bg-muted"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-16 rounded border border-border px-3 py-2 text-center"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded border border-border px-3 py-2 hover:bg-muted"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
            <button
                  onClick={handleAddToCart}
                  style={{ backgroundColor: '#ff44cb' }}
                  className="w-full rounded-lg  px-4 py-3 font-semibold text-primary-foreground hover:opacity-90"
                >
                  <ShoppingCart className="mr-2 inline h-5 w-5" />
                  Thêm Vào Giỏ Hàng
                </button>
              {(vendorItem.typeVendor === "sell" || vendorItem.typeVendor === "both") && (
                <button
                  onClick={handleCheckout}
                  style={{ backgroundColor: '#ff44cb' }}
                  className="w-full rounded-lg  px-4 py-3 font-semibold text-primary-foreground hover:opacity-90"
                >
                  <ShoppingCart className="mr-2 inline h-5 w-5" />
                  Mua Ngay
                </button>
              )}
              {(vendorItem.typeVendor === "rent" || vendorItem.typeVendor === "both") && (
                <button
                  onClick={handleRent}
                  className="w-full rounded-lg border-2 border-pink-300 px-4 py-3 font-semibold  hover:bg-primary hover:text-primary-foreground"
                >
                  Thuê Ngay
                </button>
              )}
              <button
                onClick={handleContactSeller}
                className="w-full rounded-lg border border-border px-4 py-3 font-semibold text-foreground hover:bg-muted"
              >
                Liên Hệ Người Bán
              </button>
            </div>

            {/* Specifications */}
            {/* <div className="space-y-3 rounded-lg border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground">Specifications</h3>
              <div className="space-y-2">
                {mockProduct.specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Mô tả sản phẩm</h2>
          <p className="text-foreground">{vendorItem.description}</p>
        </div>

        {/* Shop Info */}
        <ShopInfo shop={shop} />

        {/* Reviews Section */}
        <ReviewsSection reviews={reviews} product={vendorItem} />

        {/* Similar Products */}
        <SimilarProducts items={items} />
      </div>
    </main>
  )
}
