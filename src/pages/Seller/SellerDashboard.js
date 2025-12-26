import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import api from '../../api'

export default function SellerDashboard() {
  const { acc } = useContext(AppContext)
  const accId = acc?.id || acc?._id

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!accId) return
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accId])

  const fetchItems = async () => {
    try {
      const res = await api.get(`/vendoritem/accId/${accId}`, {
        withCredentials: true,
      })
      setItems(res.data.vendoritems || [])
    } catch (err) {
      console.error(err)
      alert('Không load được sản phẩm')
    } finally {
      setLoading(false)
    }
  }
  const handleDelete = async (id) => {
    if (!window.confirm('Xóa sản phẩm này?')) return
    try {
      await api.delete(`/vendoritem/${id}`, { withCredentials: true })
      setItems(items.filter((item) => item._id !== id))
    } catch (err) {
      alert('Xóa thất bại')
    }
  }

  if (loading) return <h3>Đang tải...</h3>

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      {' '}
      {/* Giữ pt-20 để tránh header che */}
      <div className="max-w-6xl mx-auto">
        {/* Tiêu đề + Nút thêm */}
        <div className="pt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Quản lý sản phẩm</h2>
          <Link to="/seller/add">
            <button className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition shadow-md">
              + Thêm sản phẩm mới
            </button>
          </Link>
        </div>

        {/* Chưa có sản phẩm */}
        {items.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <p className="text-xl text-gray-500">Chưa có sản phẩm nào</p>
            <p className="mt-4 text-gray-400">Hãy bắt đầu bằng cách thêm sản phẩm đầu tiên!</p>
          </div>
        )}

        {/* Danh sách sản phẩm dưới dạng card */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                {/* Ảnh sản phẩm */}
                {item.imgLink ? (
                  <img
                    src={item.imgLink}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Chưa có ảnh</span>
                  </div>
                )}

                {/* Nội dung card */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>

                  <p className="text-sm text-gray-500 capitalize mb-3">Loại: {item.type}</p>

                  {/* 👇 Thêm phần mô tả 👇 */}
                  {item.description ? (
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{item.description}</p>
                  ) : (
                    <p className="text-gray-400 text-sm italic mb-4">Chưa có mô tả</p>
                  )}

                  {/* Giá bán / thuê */}
                  <div className="space-y-2 mb-6 mt-auto">
                    {item.priceSell && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Giá bán:</span>
                        <span className="font-semibold text-green-600">
                          {Number(item.priceSell).toLocaleString('vi-VN')} ₫
                        </span>
                      </div>
                    )}
                    {item.priceRent && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Giá thuê:</span>
                        <span className="font-semibold text-orange-600">
                          {Number(item.priceRent).toLocaleString('vi-VN')} ₫
                          {item.periodRent &&
                            ` / ${
                              item.periodRent === 'day'
                                ? 'ngày'
                                : item.periodRent === 'week'
                                ? 'tuần'
                                : 'tháng'
                            }`}
                        </span>
                      </div>
                    )}
                    {!item.priceSell && !item.priceRent && (
                      <p className="text-gray-500 text-sm">Chưa thiết lập giá</p>
                    )}
                  </div>

                  {/* Nút hành động */}
                  <div className="flex gap-3">
                    <Link to={`/seller/edit/${item._id}`} className="flex-1">
                      <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                        Sửa
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="w-full px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
                    >
                      Xóa
                    </button>
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
