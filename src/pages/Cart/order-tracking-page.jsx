"use client"

import { useState, useEffect, useContext } from "react"
import { Loader2, Package, ChevronRight } from "lucide-react"
import api from "../../api"
import { AppContext } from "../../AppContext"



const tabs = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: "Chờ xác nhận" },
  { key: "delivering", label: "Đang giao" },
  { key: "completed", label: "Hoàn thành" },
]

const statusConfig = {
  pending: {
    label: "Chờ xác nhận",
    className: "bg-amber-100 text-amber-700",
  },
  delivering: {
    label: "Đang giao",
    className: "bg-blue-100 text-blue-700",
  },
  completed: {
    label: "Hoàn thành",
    className: "bg-green-100 text-green-700",
  },
}

// Mock data for demonstration
    const mockOrders = [
  {
    orderId: "ORD001",
    status: "pending",
    items: [
      { vendorId: "1", name: "Bánh mì thịt nướng", image: "/delicious-banh-mi.png", price: 25000, quantity: 2 },
      { vendorId: "2", name: "Trà sữa trân châu", image: "/tra-sua.jpg", price: 35000, quantity: 1 },
    ],
    totalPrice: 85000,
    createdAt: "2024-01-15T10:30:00",
    customerName: "Nguyễn Văn A",
    address: "123 Nguyễn Huệ, Q.1, TP.HCM",
  },
  {
    orderId: "ORD002",
    status: "delivering",
    items: [{ vendorId: "3", name: "Cơm tấm sườn bì", image: "/com-tam.png", price: 45000, quantity: 1 }],
    totalPrice: 45000,
    createdAt: "2024-01-14T14:20:00",
    customerName: "Nguyễn Văn A",
    address: "123 Nguyễn Huệ, Q.1, TP.HCM",
  },
  {
    orderId: "ORD003",
    status: "completed",
    items: [
      { vendorId: "4", name: "Phở bò tái", image: "/pho-bo.jpg", price: 55000, quantity: 2 },
      { vendorId: "5", name: "Nước mía", image: "/nuoc-mia.jpg", price: 15000, quantity: 2 },
    ],
    totalPrice: 140000,
    createdAt: "2024-01-10T09:15:00",
    customerName: "Nguyễn Văn A",
    address: "123 Nguyễn Huệ, Q.1, TP.HCM",
  },
  {
    orderId: "ORD004",
    status: "completed",
    items: [{ vendorId: "6", name: "Bún chả Hà Nội", image: "/bun-cha.jpg", price: 50000, quantity: 1 }],
    totalPrice: 50000,
    createdAt: "2024-01-08T12:00:00",
    customerName: "Nguyễn Văn A",
    address: "456 Lê Lợi, Q.3, TP.HCM",
  },
]

export default function OrderTrackingPage() {
  const { acc } = useContext(AppContext)
  const accId = acc._id
  const [activeTab, setActiveTab] = useState("all")
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await api.get(`/order/${accId}`)
        const orderData = response.data.order

        if (!orderData || !orderData.items) {
          setOrders([])
          return
        }

        const itemsWithDetails = await Promise.all(
          orderData.items.map(async (item) => {
            try {
              const vendorResponse = await api.get(`/vendorItem/id/${item.itemId}`)
              const detail = vendorResponse.data.vendoritem
              return {
                ...item,
                name: detail?.name,
                image: detail?.imgLink,
                price: detail?.priceSell ?? item.price ?? 0,
              }
            } catch (err) {
              console.error(`Lỗi khi lấy vendorItem ${item.itemId}:`, err)
              return {
                ...item,
                price: item.price ?? 0,
              }
            }
          })
        )

        const totalPrice = itemsWithDetails.reduce(
          (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
          0
        )

        const normalizedOrders = itemsWithDetails.map((item, idx) => ({
          orderId: `${orderData._id}-${idx}`,
          status: item.status || "pending",
          items: [item],
          totalPrice: (item.price || 0) * (item.quantity || 1),
          createdAt: orderData.orderDate || new Date(),
        }))

        setOrders(normalizedOrders)
      } catch (err) {
        setError("Không thể tải danh sách đơn hàng. Vui lòng thử lại.")
        console.error("Error fetching orders:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [accId])

  const filteredOrders = activeTab === "all" ? orders : orders.filter((order) => order.status === activeTab)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">Đơn hàng của tôi</h1>
        </div>

        {/* Tab Bar */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex border-b bg-white border-border">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.key ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Đang tải đơn hàng...</p>
            </div>
          </div>
        ) : error ? (
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Không có đơn hàng nào</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.orderId} className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">#{order.orderId}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${statusConfig[order.status].className}`}
                    >
                      {statusConfig[order.status].label}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</span>
                </div>

                {/* Order Items */}
                <div className="p-4 space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md bg-muted flex-shrink-0"
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="font-medium text-foreground text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">x{item.quantity}</p>
                        <p className="text-sm font-medium text-primary mt-1">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="px-4 py-3 border-t border-border bg-muted/30 flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">Thành tiền: </span>
                    <span className="text-base font-semibold text-primary">{formatPrice(order.totalPrice)}</span>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
