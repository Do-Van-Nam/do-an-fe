import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../AppContext'
import api from '../api'

export default function Profile() {
  const { acc, setAcc } = useContext(AppContext)
  const [user, setUser] = useState(acc || {})
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (acc && acc._id) setUser(acc)
  }, [acc])

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    api
      .put(`/acc/id/${user._id}`, {
        name: user.name,
        phone: user.phone,
        mail: user.mail,
        password: user.password,
      })
      .then((res) => {
        const updatedUser = res.data
        setUser(updatedUser)
        setAcc(updatedUser)
        setIsEditing(false)
        alert('Cập nhật thông tin thành công!')
      })
      .catch((err) => {
        console.error(err)
        alert('Lưu thất bại!')
      })
  }

  // 👇 HÀM MỚI: ĐĂNG KÝ LÊN SELLER
  const handleUpgradeToSeller = () => {
    if (!window.confirm('Bạn có chắc muốn đăng ký trở thành Seller?')) return

    api
      .put(`/acc/id/${user._id}`, { role: 'seller' })
      .then((res) => {
        const updatedUser = res.data
        setUser(updatedUser)
        setAcc(updatedUser)
        alert('Chúc mừng! Bạn đã trở thành Seller thành công! 🎉')
      })
      .catch((err) => {
        console.error(err)
        alert('Đăng ký Seller thất bại! Hãy thử lại.')
      })
  }

  const handleDelete = () => {
    if (
      !window.confirm('Bạn có chắc muốn xoá tài khoản này không? Hành động này không thể hoàn tác!')
    )
      return

    api
      .delete(`/acc/${user._id}`)
      .then(() => {
        alert('Xoá tài khoản thành công!')
        setAcc(null)
        window.location.href = '/'
      })
      .catch((err) => {
        console.error(err)
        alert('Xoá thất bại!')
      })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl p-8">
        <div className="text-center mb-8">
          <img
            src={user.avatar || '/logo.png'}
            alt="avatar"
            className="w-32 h-32 rounded-full mx-auto border-4 border-pink-200 shadow-md"
          />
          <h2 className="text-2xl font-bold mt-4">{user.name || 'User'}</h2>
          <p className="text-gray-600 capitalize">{user.role || 'user'}</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700">Họ và tên</label>
            <input
              type="text"
              name="name"
              value={user.name || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={user.phone || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="mail"
              value={user.mail || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Vai trò</label>
            <div className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 mt-1 capitalize font-semibold text-pink-600">
              {user.role || 'user'}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition"
              >
                Lưu thay đổi
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded-lg transition"
              >
                Hủy
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg transition"
            >
              Chỉnh sửa thông tin
            </button>
          )}

          {/* 👇 NÚT ĐĂNG KÝ LÊN SELLER – CHỈ HIỆN KHI LÀ USER */}
          {user.role === 'user' && (
            <button
              onClick={handleUpgradeToSeller}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-lg transition shadow-md"
            >
              Trở thành Seller
            </button>
          )}

          {/* Nút xóa tài khoản */}
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg transition"
          >
            Xoá tài khoản
          </button>
        </div>

        {/* Gợi ý khi là Seller */}
        {user.role === 'seller' && (
          <div className="text-center mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-800 font-medium">
              Chúc mừng! Bạn đã là Seller 🎉 Bây giờ bạn có thể vào <strong>Trang sản phẩm</strong>{' '}
              để quản lý sản phẩm!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
