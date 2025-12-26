import { useState, useEffect } from 'react' // 👈 THÊM useEffect VÀO ĐÂY
// Cloudinary Upload Widget (không cần next-cloudinary)
const UploadImage = ({ onUploadSuccess }) => {
  // 👈 THÊM PROP onUploadSuccess ĐỂ TRUYỀN URL RA NGOÀI
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  // Hàm mở Cloudinary Widget
  const openCloudinaryWidget = () => {
    if (!window.cloudinary) {
      alert('Cloudinary script chưa được load!')
      return
    }

    window.cloudinary.openUploadWidget(
      {
        cloudName: 'daqeh8fvv', // Cloud name của dự án
        uploadPreset: 'wedding-planner', // Preset unsigned đã tạo trên Cloudinary
        sources: ['local', 'camera', 'url', 'google_drive', 'dropbox'],
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1,
        styles: {
          palette: {
            window: '#FFFFFF',
            sourceBg: '#F5F5F5',
            windowBorder: '#90A0B3',
            tabIcon: '#db2777',
            inactiveTabIcon: '#999999',
            textDark: '#000000',
            link: '#db2777',
          },
        },
      },
      async (error, result) => {
        if (error) {
          console.error('Upload error:', error)
          return
        }

        if (result && result.event === 'success') {
          const url = result.info.secure_url
          console.log('Ảnh đã upload:', url)

          setImageUrl(url)
          setLoading(false)

          // 👇 TRUYỀN URL RA CHO PARENT COMPONENT (ProductForm)
          if (onUploadSuccess) {
            onUploadSuccess(url)
          }

          alert('Upload ảnh lên Cloudinary thành công!')
        }
      }
    )
  }

  // Load Cloudinary script khi component mount
  useEffect(() => {
    // 👈 SỬA useState THÀNH useEffect
    const script = document.createElement('script')
    script.src = 'https://upload-widget.cloudinary.com/latest/global/all.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script) // cleanup
    }
  }, [])

  return (
    <div>
      <button
        type="button" // 👈 THÊM ĐỂ KHÔNG SUBMIT FORM KHI CLICK
        onClick={openCloudinaryWidget}
        disabled={loading}
        className="px-6 py-3 text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
      >
        {loading ? 'Đang upload...' : 'Tải ảnh lên Cloudinary'}
      </button>

      {imageUrl && (
        <div className="mt-4">
          <p className="text-sm text-green-600 font-semibold">Upload thành công!</p>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="mt-2 max-w-full h-auto rounded-lg border shadow-md"
          />
        </div>
      )}
    </div>
  )
}

export default UploadImage
