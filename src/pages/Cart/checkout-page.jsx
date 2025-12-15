"use client"

import { useContext, useState } from "react"
import { ArrowLeft, Banknote, Building2, CheckCircle2 } from "lucide-react"
import api from "../../api"
import { AppContext } from "../../AppContext"

export default function CheckoutPage({ items, totalPrice, onBack }) {
  const { acc } = useContext(AppContext)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên"
    }

    if (!phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
    } else if (!/^[0-9]{10,11}$/.test(phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ"
    }

    if (!address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ nhận hàng"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const payload = {
        accId: acc?._id,
        items: items.map((item) => ({
          itemId: item.vendorId,
          quantity: item.quantity,
          price: item.vendorDetail.priceSell,
        })),
        paymentStatus: paymentMethod,
        totalAmount: totalPrice,
        customerName: name,
        phone,
        address,
      }

      await api.post("/order/add-many", payload)

      alert("Đặt hàng thành công!")
      onBack()
    } catch (error) {
      console.error("Order failed:", error)
      alert("Đặt hàng thất bại. Vui lòng thử lại.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Quay lại">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">Thông tin đặt hàng</h1>
        </div>

        {/* Order summary */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <h2 className="font-semibold text-foreground mb-3">Đơn hàng của bạn ({items.length} sản phẩm)</h2>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {items.map((item) => (
              <div key={item.vendorId} className="flex items-center gap-3">
                <img
                  src={item.vendorDetail.image || "/placeholder.svg?height=48&width=48&query=product"}
                  alt={item.vendorDetail.name}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.vendorDetail.name}</p>
                  <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                </div>
                <p className="text-sm font-medium text-foreground">
                  {(item.vendorDetail.priceSell * item.quantity).toLocaleString("vi-VN")}đ
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-4 flex justify-between items-center">
            <span className="font-semibold text-foreground">Tổng cộng:</span>
            <span className="text-xl font-bold text-blue-600">{totalPrice.toLocaleString("vi-VN")}đ</span>
          </div>
        </div>

        {/* Customer info form */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <h2 className="font-semibold text-foreground mb-4">Thông tin người nhận</h2>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập họ và tên"
                className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.name ? "border-red-500" : "border-border"
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
                className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.phone ? "border-red-500" : "border-border"
                }`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1">
                Địa chỉ nhận hàng <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nhập địa chỉ nhận hàng đầy đủ"
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                  errors.address ? "border-red-500" : "border-border"
                }`}
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>
          </div>
        </div>

        {/* Payment method */}
        <div className="bg-card rounded-lg border border-border p-4">
          <h2 className="font-semibold text-foreground mb-4">Phương thức thanh toán</h2>

          <div className="space-y-3">
            {/* Cash on delivery */}
            <label
              className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                paymentMethod === "cash"
                  ? "border-blue-500 bg-blue-500"
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="sr-only"
              />
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  paymentMethod === "cash" ? "bg-blue-500 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                <Banknote className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className={`font-medium ${paymentMethod === "cash" ? "text-white" : "text-foreground"}`}>Tiền mặt khi nhận hàng</p>
                <p className={`text-sm ${paymentMethod === "cash" ? "text-white/90" : "text-muted-foreground"}`}>Thanh toán khi nhận được hàng</p>
              </div>
              {paymentMethod === "cash" && <CheckCircle2 className="w-6 h-6 text-white" />}
            </label>

            {/* Bank transfer */}
            <label
              className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                paymentMethod === "bank"
                  ? "border-blue-500 bg-blue-500"
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
                className="sr-only"
              />
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  paymentMethod === "bank" ? "bg-blue-500 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className={`font-medium ${paymentMethod === "bank" ? "text-white" : "text-foreground"}`}>Chuyển khoản ngân hàng</p>
                <p className={`text-sm ${paymentMethod === "bank" ? "text-white/90" : "text-muted-foreground"}`}>Thanh toán qua chuyển khoản</p>
              </div>
              {paymentMethod === "bank" && <CheckCircle2 className="w-6 h-6 text-white" />}
            </label>
          </div>

          {/* Bank info if bank transfer selected */}
          {paymentMethod === "bank" && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">Thông tin chuyển khoản:</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  Ngân hàng: <span className="text-foreground font-medium">Vietcombank</span>
                </p>
                <p>
                  Số tài khoản: <span className="text-foreground font-medium">1234567890</span>
                </p>
                <p>
                  Chủ tài khoản: <span className="text-foreground font-medium">CONG TY ABC</span>
                </p>
                <p>
                  Nội dung: <span className="text-foreground font-medium">SDT + Tên người nhận</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-card bg-white border-t border-border shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
              isSubmitting
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? "Đang xử lý..." : `Xác nhận đặt hàng - ${totalPrice.toLocaleString("vi-VN")}đ`}
          </button>
        </div>
      </div>
    </div>
  )
}
