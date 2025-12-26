import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import api from '../../api'

// 👇 IMPORT COMPONENT UPLOAD CLOUDINARY CÓ SẴN
import UploadImage from '../../components/UploadImage'

export default function ProductForm() {
  const { acc } = useContext(AppContext)
  const accId = acc?.id || acc?._id
  const { id } = useParams() // có id => edit
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({
    name: '',
    type: '',
    description: '',
    imgLink: '', // URL từ Cloudinary (hoặc ảnh cũ khi edit)
    imgPreview: '', // để preview ảnh
    typeVendor: 'sell',
    priceSell: 0,
    priceRent: 0,
    periodRent: 'day',
    tags: [
      'cổ điển',
      'sang trọng',
      'hiện đại',
      'tối giản',
      'luxury',
      'rustic',
      'beach wedding',
      'garden wedding',
      'elegant',
      'playful',
      'minimalist',
      'glamorous',
    ],
  })

  // 👇 LOAD DATA KHI EDIT
  useEffect(() => {
    if (!isEdit) return

    const fetchItem = async () => {
      try {
        const res = await api.get(`/vendoritem/id/${id}`)
        const item = res.data.vendoritem
        setForm({
          name: item.name || '',
          type: item.type || '',
          description: item.description || '',
          imgLink: item.imgLink || '',
          imgPreview: item.imgLink || '', // hiển thị ảnh cũ ngay
          typeVendor: item.typeVendor || 'sell',
          priceSell: item.priceSell || 0,
          priceRent: item.priceRent || 0,
          periodRent: item.periodRent || 'day',
          tags: item.tags || [],
        })
      } catch (err) {
        alert('Không load được sản phẩm')
      }
    }

    fetchItem()
  }, [id, isEdit])

  // 👇 HÀM NHẬN URL TỪ UPLOADIMAGE KHI UPLOAD THÀNH CÔNG
  const handleImageUpload = (url) => {
    setForm((prev) => ({
      ...prev,
      imgLink: url,
      imgPreview: url,
    }))
  }

  // 👇 HANDLE CHANGE CHO CÁC FIELD TEXT
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // 👇 SUBMIT – GỬI JSON SẠCH (KHÔNG CÒN FORMDATA)
  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      accId,
      name: form.name,
      type: form.type,
      description: form.description,
      typeVendor: form.typeVendor,
      priceSell: Number(form.priceSell) || 0,
      priceRent: Number(form.priceRent) || 0,
      periodRent: form.periodRent,
      imgLink: form.imgLink, // URL từ Cloudinary
      tags: form.tags,
    }

    try {
      if (isEdit) {
        await api.put(`/vendoritem/id/${id}`, payload, { withCredentials: true })
      } else {
        await api.post('/vendoritem', payload, { withCredentials: true })
      }
      alert('Lưu sản phẩm thành công!')
      navigate('/seller')
    } catch (err) {
      console.error(err)
      alert('Lưu sản phẩm thất bại')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8 font-sans">
      <h2 className="text-2xl font-bold text-center mb-10">
        {isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tên sản phẩm */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Tên sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Nhập tên sản phẩm"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
          />
        </div>

        {/* Loại sản phẩm */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Loại sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="type"
            placeholder="Ví dụ: venue, makeup, dress, photography..."
            value={form.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
          />
        </div>

        {/* Mô tả */}
        <div>
          <label className="block text-sm font-semibold mb-2">Mô tả sản phẩm</label>
          <textarea
            name="description"
            placeholder="Mô tả chi tiết về sản phẩm (tùy chọn)"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full h-20 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition resize-vertical"
          />
        </div>
        {/* Tags sản phẩm */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3">Tags sản phẩm (chọn nhiều)</label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {[
              'cổ điển',
              'sang trọng',
              'hiện đại',
              'tối giản',
              'luxury',
              'rustic',
              'beach wedding',
              'garden wedding',
              'elegant',
              'playful',
              'minimalist',
              'glamorous',
            ].map((tag) => (
              <label key={tag} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value={tag}
                  checked={form.tags.includes(tag)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setForm({ ...form, tags: [...form.tags, tag] })
                    } else {
                      setForm({ ...form, tags: form.tags.filter((t) => t !== tag) })
                    }
                  }}
                  className="mr-2 accent-pink-600"
                />
                <span className="text-sm text-gray-700">{tag}</span>
              </label>
            ))}
          </div>
        </div>
        {/* 👇 UPLOAD ẢNH BẰNG CLOUDINARY WIDGET */}
        <div>
          <label className="block text-sm font-semibold mb-2">Ảnh sản phẩm</label>

          {/* DÙNG COMPONENT CÓ SẴN */}
          <UploadImage onUploadSuccess={handleImageUpload} />

          {/* Preview ảnh (cũ hoặc mới từ Cloudinary) */}
          {form.imgPreview && (
            <div className="mt-4">
              <img
                src={form.imgPreview}
                alt="preview"
                className="w-60 h-60 object-cover rounded-lg border shadow-md"
              />
            </div>
          )}
        </div>

        {/* Hình thức cung cấp */}
        <div>
          <label className="block text-sm font-semibold mb-2">Hình thức cung cấp</label>
          <select
            name="typeVendor"
            value={form.typeVendor}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
          >
            <option value="sell">Bán</option>
            <option value="rent">Thuê</option>
            <option value="both">Bán & Thuê</option>
          </select>
        </div>

        {/* Giá bán và Giá thuê */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Giá bán (VND)</label>
            <input
              type="text"
              name="priceSell"
              placeholder="Ví dụ: 5000000"
              value={form.priceSell}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Giá thuê (VND)</label>
            <input
              type="text"
              name="priceRent"
              placeholder="Ví dụ: 500000"
              value={form.priceRent}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Đơn vị thời gian thuê */}
        <div>
          <label className="block text-sm font-semibold mb-2">Đơn vị thời gian thuê</label>
          <select
            name="periodRent"
            value={form.periodRent}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
          >
            <option value="day">Ngày</option>
            <option value="week">Tuần</option>
            <option value="month">Tháng</option>
          </select>
        </div>

        {/* Nút submit */}
        <div className="text-center pt-8">
          <button
            type="submit"
            className="px-12 py-4 text-lg font-semibold text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 transition"
          >
            Lưu sản phẩm
          </button>
        </div>
      </form>
    </div>
  )
}
