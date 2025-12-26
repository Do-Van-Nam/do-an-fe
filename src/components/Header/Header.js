import React, { useContext, useEffect, useState, useRef } from 'react'
import { AppContext } from '../../AppContext'
import api from '../../api'
import { useNavigate, Link } from 'react-router-dom'
import ExpandedHeader from './ExpandedHeader'
import style from './Header.module.css'

export default function Header() {
  const navigate = useNavigate()
  const { acc, setAcc } = useContext(AppContext)

  const [expandedCategory, setExpandedCategory] = useState(null)
  const dropdownRef = useRef(null)

  const logOut = async () => {
    try {
      await api.post('/logout')
      localStorage.clear()
      setAcc(null)
      window.location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!acc) {
      api
        .get('/acc/check-auth')
        .then((res) => setAcc(res.data.user || null))
        .catch(() => setAcc(null))
    }
  }, [acc])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExpandedCategory(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleExpanded = (category) => {
    setExpandedCategory((prev) => (prev === category ? null : category))
  }

  const planningTools = {
    categoryName: 'Kế hoạch',
    categoryItems: [
      [
        { categoryItemName: 'Kế hoạch của bạn', link: '/home' },
        { categoryItemName: 'Checklist', link: '/checklist' },
        { categoryItemName: 'Ngân sách', link: '/budget' },
      ],
      [
        { categoryItemName: 'Khách mời', link: '/guests' },
        { categoryItemName: 'Gửi lời mời', link: '/send-message' },
      ],
      [{ categoryItemName: 'Online RSVP', link: '/online-rsvp' }],
    ],
  }

  const vendors = {
    categoryName: 'Nhà Cung Cấp',
    categoryItems: [
      [
        { categoryItemName: 'Nhà Cung Cấp Của Bạn', link: '/your-vendors' },
        { categoryItemName: 'Quản Lý Nhà Cung Cấp', link: '/manage-vendors' },
        { categoryItemName: 'Trò Chuyện Với Nhà Cung Cấp', link: '/chat' },
        { categoryItemName: 'Đánh Giá Nhà Cung Cấp', link: '/review-vendors' },
      ],
      [
        { categoryItemName: 'Địa Điểm Tổ Chức', link: '/marketplace/venue' },
        { categoryItemName: 'Nhiếp Ảnh Gia', link: '/marketplace/photographer' },
        { categoryItemName: 'Tiệc Cưới', link: '/marketplace/catering' },
        { categoryItemName: 'Áo Cưới', link: '/marketplace/bridal-gown' },
        { categoryItemName: 'Nhà Tổ Chức Đám Cưới', link: '/marketplace/wedding-planner' },
        { categoryItemName: 'Bánh Cưới', link: '/marketplace/wedding-cake' },
        { categoryItemName: 'DJ', link: '/marketplace/dj' },
        { categoryItemName: 'Quay Phim', link: '/marketplace/videographer' },
      ],
      [
        { categoryItemName: 'Cho Thuê Đồ Cưới', link: '/marketplace/rental-bridal' },
        { categoryItemName: 'Dịch Vụ Trang Điểm', link: '/marketplace/makeup-services' },
        { categoryItemName: 'Hoa Cưới', link: '/marketplace/flowers' },
        { categoryItemName: 'Ban Nhạc', link: '/marketplace/band' },
        { categoryItemName: 'Dịch Vụ Quay Bar', link: '/marketplace/bar-service' },
        { categoryItemName: 'Rước Dâu', link: '/marketplace/transportation' },
        { categoryItemName: 'Thiệp cưới', link: '/marketplace/invitations' },
      ],
    ],
  }

  const attireAndRings = {
    categoryName: 'Trang phục & Nhẫn',
    categoryItems: [
      [
        { categoryItemName: 'Váy cưới', link: '/marketplace/bridal-gown' },
        { categoryItemName: 'Váy chữ A', link: '/marketplace/a-line-dress' },
        { categoryItemName: 'Váy dạ hội', link: '/marketplace/ball-gown' },
        { categoryItemName: 'Váy nàng tiên cá', link: '/marketplace/mermaid-dress' },
        { categoryItemName: 'Váy body', link: '/marketplace/bodycon-dress' },
        { categoryItemName: 'Váy ngắn', link: '/marketplace/short-dress' },
      ],
      [
        { categoryItemName: 'Bộ vest & Tuxedo', link: '/marketplace/suit-and-tuxedo' },
        { categoryItemName: 'Váy phù dâu', link: '/marketplace/bridesmaid-dress' },
      ],
      [
        { categoryItemName: 'Nhẫn cưới', link: '/marketplace/wedding-ring' },
        { categoryItemName: 'Nhẫn cắt công chúa', link: '/marketplace/princess-cut-ring' },
        { categoryItemName: 'Nhẫn cắt Asscher', link: '/marketplace/asscher-cut-ring' },
        { categoryItemName: 'Nhẫn cắt đệm', link: '/marketplace/cushion-cut-ring' },
        { categoryItemName: 'Nhẫn cắt ngọc lục bảo', link: '/marketplace/emerald-cut-ring' },
        { categoryItemName: 'Nhẫn cắt quả lê', link: '/marketplace/pear-cut-ring' },
        { categoryItemName: 'Nhẫn cắt rực rỡ', link: '/marketplace/radiant-cut-ring' },
        { categoryItemName: 'Nhẫn cắt tròn', link: '/marketplace/round-cut-ring' },
        { categoryItemName: 'Nhẫn cắt bầu dục', link: '/marketplace/oval-cut-ring' },
      ],
    ],
  }

  const admin = {
    categoryName: 'Quản trị',
    categoryItems: [
      [{ categoryItemName: 'Quản lý Người dùng', link: '/admin/manage-user' }],
      [{ categoryItemName: 'Quản lý Đơn hàng', link: '/admin/manage-order' }],
      [{ categoryItemName: 'Quản lý Sản phẩm', link: '/admin/manage-vendor-item' }],
    ],
  }

  return (
    <div className="fixed-top d-flex flex-column">
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary shadow p-2 bg-body-tertiary rounded d-flex flex-row justify-content-around"
        style={{ width: '100vw', zIndex: '999', height: '10vh' }}
      >
        <div className="d-flex align-items-center" style={{ height: '100%' }}>
          <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img
              src="images/flower.png"
              className="me-2"
              alt="..."
              style={{ height: '50px', width: 'auto' }}
            />
          </Link>
          <div className="d-flex flex-column">
            <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div>Wedding Planner</div>
            </Link>
            <div className="d-flex gap-3">
              <h4
                className={`me-3 ${style.headeritem}`}
                onClick={() => toggleExpanded('planningTools')}
              >
                Kế hoạch
              </h4>
              <h4 className={`me-3 ${style.headeritem}`} onClick={() => toggleExpanded('vendors')}>
                Nhà cung cấp
              </h4>
              <h4
                className={`me-3 ${style.headeritem}`}
                onClick={() => toggleExpanded('attireAndRings')}
              >
                Trang phục, Nhẫn
              </h4>
              <Link to={'/recommend'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h4 className={`me-3 ${style.headeritem}`}>Lập kế hoạch tự động</h4>
              </Link>
              <Link to={'/favourite'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h4 className={`me-3 ${style.headeritem}`}>Yêu thích</h4>
              </Link>

              {/* 👇 MỤC MỚI: TRANG SẢN PHẨM – CHỈ HIỆN KHI LÀ SELLER */}
              {acc?.role === 'seller' && (
                <Link to="/seller" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h4 className={`me-3 ${style.headeritem} text-pink-600 fw-bold`}>
                    Trang sản phẩm
                  </h4>
                </Link>
              )}

              {acc?.role === 'manager' && (
                <h4 className={`me-3 ${style.headeritem}`} onClick={() => toggleExpanded('admin')}>
                  Quản trị
                </h4>
              )}
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <Link to={'/cart'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <i className="bi bi-cart me-3" style={{ fontSize: '20px' }}></i>
          </Link>
          <Link to={'/order-tracking'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <i className="bi bi-bag-check me-3" style={{ fontSize: '20px' }}></i>
          </Link>
          <Link to={'/chat'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <i className="bi bi-chat me-3" style={{ fontSize: '20px' }}></i>
          </Link>

          {/* User section */}
          <div className="d-flex flex-column align-items-end">
            {acc ? (
              <>
                {acc.name ? (
                  <Link to="/profile" className="text-decoration-none text-dark mb-1">
                    <span className="fw-bold fs-5">{acc.name}</span>
                  </Link>
                ) : (
                  <Link to="/profile">
                    <img
                      src="/public/placeholder-user copy.jpg"
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-circle"
                    />
                  </Link>
                )}

                <span
                  onClick={logOut}
                  className="text-danger fw-medium cursor-pointer small hover-underline"
                >
                  Đăng xuất
                </span>
              </>
            ) : (
              <Link to="/" className="d-flex align-items-center text-decoration-none text-dark">
                <div
                  className="bg-gray-300 rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{ width: '40px', height: '40px' }}
                >
                  <i className="bi bi-person fs-4 text-white"></i>
                </div>
                <span className="fw-medium">Đăng nhập</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {expandedCategory && (
        <div ref={dropdownRef} className="bg-pink-50 shadow-lg border-t border-pink-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ExpandedHeader
              category={
                expandedCategory === 'planningTools'
                  ? planningTools
                  : expandedCategory === 'vendors'
                  ? vendors
                  : expandedCategory === 'attireAndRings'
                  ? attireAndRings
                  : admin
              }
            />
          </div>
        </div>
      )}
    </div>
  )
}
