import { useState } from 'react';

// Cloudinary Upload Widget (không cần next-cloudinary)
const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Hàm mở Cloudinary Widget
  const openCloudinaryWidget = () => {
    if (!window.cloudinary) {
      alert('Cloudinary script chưa được load!');
      return;
    }

    window.cloudinary.openUploadWidget(
      {
        cloudName: 'daqeh8fvv',           // Thay bằng cloud name của bạn
        uploadPreset: 'wedding-planner',   // Tạo ở Cloudinary Dashboard → Settings → Upload → Upload presets
        sources: ['local', 'camera', 'url', 'google_drive', 'dropbox'],
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1,
        styles: {
          palette: {
            window: "#FFFFFF",
            sourceBg: "#F5F5F5",
            windowBorder: "#90A0B3",
            tabIcon: "#0078FF",
            inactiveTabIcon: "#999999",
            textDark: "#000000",
            link: "#0078FF"
          },
        },
      },
      async (error, result) => {
        if (error) {
          console.error('Upload error:', error);
          return;
        }

        if (result && result.event === 'success') {
          const url = result.info.secure_url;
          console.log('Ảnh đã upload:', url);

          setImageUrl(url);
          setLoading(true);

          try {
            // Gửi URL về backend để lưu vào database
            const response = await fetch('/api/images', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ url }),
            });

            if (response.ok) {
              alert('Tải lên và lưu thành công!');
            } else {
              alert('Lưu vào database thất bại');
            }
          } catch (err) {
            console.error(err);
            alert('Lỗi khi gửi dữ liệu');
          } finally {
            setLoading(false);
          }
        }
      }
    );
  };

  // Load Cloudinary script khi component mount
  useState(() => {
    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/latest/global/all.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <button
        onClick={openCloudinaryWidget}
        disabled={loading}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#0078FF',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Đang xử lý...' : 'Tải ảnh lên'}
      </button>

      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>Ảnh vừa tải lên:</h3>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', marginTop: '10px' }}
          />
          <p>
            <strong>URL:</strong>{' '}
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
              {imageUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadImage;