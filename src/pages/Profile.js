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
        id: user._id,
        name: user.name,
        phone: user.phone,
        mail: user.mail,
        password: user.password,
        role: user.role,
      })
      .then((res) => {
        setUser(res.data)
        setAcc(res.data)
        setIsEditing(false)
        alert('Cập nhật thành công!')
      })
      .catch((err) => {
        console.error(err)
        alert('Lưu thất bại!')
      })
  }

  const handleDelete = () => {
    if (!window.confirm('Bạn có chắc muốn xoá tài khoản này không?')) return

    api
      .delete(`/acc/${user._id}`)
      .then(() => {
        alert('Xoá tài khoản thành công!')
        setAcc(null)
        window.location.href = '/login'
      })
      .catch((err) => {
        console.error(err)
        alert('Xoá thất bại!')
      })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full bg-white shadow p-6 rounded-lg">
        <div className="text-center mb-6">
          <img
            src={user.avatar || '/logo.png'}
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto border shadow-sm"
          />
        </div>

        <div className="space-y-4">
          {/* Họ tên */}
          <div>
            <label className="block font-medium">Họ và tên</label>
            <input
              type="text"
              name="name"
              value={user.name || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* SĐT */}
          <div>
            <label className="block font-medium">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={user.phone || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="mail"
              value={user.mail || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          {/* Vai trò */}
          <div>
            <label className="block font-medium">Vai trò</label>
            <input
              type="text"
              name="role"
              value={user.role || ''}
              disabled
              className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600"
            />
          </div>
        </div>

        <div className="text-center mt-6 space-x-3">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Lưu thay đổi
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Chỉnh sửa
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Xoá tài khoản
          </button>
        </div>
      </div>
    </div>
  )
}
