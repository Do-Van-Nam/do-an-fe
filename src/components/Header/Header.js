import React, { useContext, useEffect, useState, useRef } from 'react';
import { AppContext } from '../../AppContext';
import axios from 'axios'
import api from '../../api'
import { useNavigate } from 'react-router-dom'
import BuildingPopup from '../BuildingPopup';
import Cookies from 'js-cookie'
import ExpandedHeader from './ExpandedHeader';
import style from './Header.module.css'
import { Link } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate()

  const { acc, setAcc, buildings, setBuildings, selectedBuilding, setSelectedBuilding } = useContext(AppContext);
  const logOut = async () => {
    try {
      await api.post('/logout')
      localStorage.clear()
      setAcc({})
      navigate('/')
    } catch (error) {
      console.log(error)
    }

  }

  // useEffect(() => {
  //   console.log(acc)
  //   if (acc && acc._id) {
  //     api.get(`/building/${acc._id}`)
  //       .then(response => {
  //         setBuildings(response.data.buildings)
  //         setSelectedBuilding(response.data.buildings[0])
  //       })
  //       .catch(error => {
  //         console.error('Error fetching buildings by Owner ID:', error);
  //       })
  //   }
  // }, [acc?._id])

  useEffect(() => {
    try {
      api.get('/acc/check-auth')
        .then(response => {
          console.log(response.data.user)
          setAcc(response.data.user)
        }
        )
        .catch(error => {
          navigate('/')
          console.log(error)
        }
        )
    } catch (error) {
      console.log(error)
    }
    console.log(acc)
  }, [])

  // const [isPopupVisible, setPopupVisible] = useState(false)
  // const hidePopup = () => setPopupVisible(false)
  // const showPopup = () => setPopupVisible(true)
  const vendors = {
    categoryName: 'Nhà Cung Cấp',
    categoryItems: [
      [
        { categoryItemName: 'Nhà Cung Cấp Của Bạn', link: '/your-vendors' },
        { categoryItemName: 'Quản Lý Nhà Cung Cấp', link: '/manage-vendors' },
        { categoryItemName: 'Trò Chuyện Với Nhà Cung Cấp', link: '/chat' },
        { categoryItemName: 'Đánh Giá Nhà Cung Cấp', link: '/review-vendors' }
      ],
      [
        { categoryItemName: 'Địa Điểm Tổ Chức', link: '/marketplace/venue' },
        { categoryItemName: 'Nhiếp Ảnh Gia', link: '/marketplace/photographer' },
        { categoryItemName: 'Tiệc Cưới', link: '/marketplace/catering' },
        { categoryItemName: 'Áo Cưới', link: '/marketplace/bridal-gown' },
        { categoryItemName: 'Nhà Tổ Chức Đám Cưới', link: '/marketplace/wedding-planner' },
        { categoryItemName: 'Bánh Cưới', link: '/marketplace/wedding-cake' },
        { categoryItemName: 'DJ', link: '/marketplace/dj' },
        { categoryItemName: 'Quay Phim', link: '/marketplace/videographer' }
      ],
      [
        { categoryItemName: 'Cho Thuê Đồ Cưới', link: '/marketplace/rental-bridal' },
        { categoryItemName: 'Dịch Vụ Trang Điểm', link: '/marketplace/makeup-services' },
        { categoryItemName: 'Hoa Cưới', link: '/marketplace/flowers' },
        { categoryItemName: 'Ban Nhạc', link: '/marketplace/band' },
        { categoryItemName: 'Dịch Vụ Quay Bar', link: '/marketplace/bar-service' },
        { categoryItemName: 'Rước Dâu', link: '/marketplace/transportation' },
        { categoryItemName: 'Thiệp cưới', link: '/marketplace/invitations' }
      ]
    ]
  }

  const planningTools = {
    categoryName: 'Kế hoạch',
    categoryItems: [
      [{ categoryItemName: 'Kế hoạch của bạn', link: '/home' },
      { categoryItemName: 'Checklist', link: '/checklist' },
      { categoryItemName: 'Ngân sách', link: '/budget' }],
      [{ categoryItemName: 'Khách mời', link: '/guests' },
      { categoryItemName: 'Gửi lời tới khách mời', link: '/send-message' }],
      [{ categoryItemName: 'Online RSVP', link: '/online-rsvp' }]
    ]

  }
  const attireAndRings = {
    categoryName: 'Trang phục và Nhẫn',
    categoryItems: [
      [
        { categoryItemName: 'Váy cưới', link: '/marketplace/bridal-gown' },
        { categoryItemName: 'Váy chữ A', link: '/marketplace/a-line-dress' },
        { categoryItemName: 'Váy dạ hội', link: '/marketplace/ball-gown' },
        { categoryItemName: 'Váy nàng tiên cá', link: '/marketplace/mermaid-dress' },
        { categoryItemName: 'Váy body', link: '/marketplace/bodycon-dress' },
        { categoryItemName: 'Váy ngắn', link: '/marketplace/short-dress' }
      ],
      [
        { categoryItemName: 'Bộ vest và áo tuxedo', link: '/marketplace/suit-and-tuxedo' },
        { categoryItemName: 'Váy phù dâu', link: '/marketplace/bridesmaid-dress' }
      ],
      [
        { categoryItemName: 'Nhẫn cưới', link: '/marketplace/wedding-ring' },
        { categoryItemName: 'Nhẫn cắt kiểu công chúa', link: '/marketplace/princess-cut-ring' },
        { categoryItemName: 'Nhẫn cắt kiểu Asscher', link: '/marketplace/asscher-cut-ring' },
        { categoryItemName: 'Nhẫn cắt kiểu đệm', link: '/marketplace/cushion-cut-ring' },
        { categoryItemName: 'Nhẫn cắt kiểu ngọc lục bảo', link: '/marketplace/emerald-cut-ring' },
        { categoryItemName: 'Nhẫn cắt kiểu hình quả lê', link: '/marketplace/pear-cut-ring' },
        { categoryItemName: 'Nhẫn cắt kiểu rực rỡ', link: '/marketplace/radiant-cut-ring' },
        { categoryItemName: 'Nhẫn cắt kiểu tròn', link: '/marketplace/round-cut-ring' },
        { categoryItemName: 'Nhẫn cắt kiểu hình bầu dục', link: '/marketplace/oval-cut-ring' }
      ]
    ]
  }

  const vendorsRef = useRef(null);
  const handleClickOutside = (event) => {
    if (vendorsRef.current && !vendorsRef.current.contains(event.target)) {
      setExpandedCategory(null);
    }
  };
  const [expandedCategory, setExpandedCategory] = useState(null);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleExpanded = (category) => {
    setExpandedCategory(prevCategory => (prevCategory === category ? null : category));
  };
  return (
    <div className='fixed-top d-flex flex-column' >
      <nav class="navbar  navbar-expand-lg bg-body-tertiary  
    shadow p-2  bg-body-tertiary rounded d-flex flex-row
    justify-content-around
    " style={{ width: '100vw', zIndex: '999', height: '10vh' }}>
        <div className='d-flex align-items-center' style={{ height: '100%' }}>

          <img src='images/flower.png' class=" me-2" alt="..." style={{ height: '50px', width: 'auto' }}></img>
          <div className='d-flex flex-column' >
            <div>
              Wedding Planner
            </div>
            <div className='d-flex' >
              <h4 className={`me-3 ${style.headeritem}`} onClick={() => toggleExpanded('planningTools')} >Kế hoạch</h4>
              <h4 className={`me-3 ${style.headeritem}`} onClick={() => toggleExpanded('vendors')} >Nhà cung cấp</h4>
              <h4 className={`me-3 ${style.headeritem}`} onClick={() => toggleExpanded('attireAndRings')} >Trang phục, Nhẫn</h4>
              <h4 className={`me-3 ${style.headeritem}`}>Lập kế hoạch tự động</h4>
              <Link to={'/favourite'} style={{ textDecoration: 'none', color: 'inherit' }}> 
              <h4 className={`me-3 ${style.headeritem}`}>Yêu thích</h4>
              </Link>
            </div>


          </div>
        </div>

        <div className='d-flex align-items-center'>
          <Link to={'/chat'} style={{textDecoration:'none',color:'inherit'}}>
          
          <i class="bi bi-chat me-3" style={{ fontSize: '20px' }}></i>
          </Link>
          <div className='d-flex flex-column'>
            <div className='' style={{ fontSize: '25px' }}>{acc.name}</div>
            <div className='' style={{ cursor: 'pointer' }} onClick={logOut}>Đăng xuất</div>

          </div>

        </div>
      </nav>

      {expandedCategory === 'vendors' && (
        <div ref={vendorsRef}>
          <ExpandedHeader category={vendors} />
        </div>
      )}
      {expandedCategory === 'planningTools' && (
        <div ref={vendorsRef}>
          <ExpandedHeader category={planningTools} />
        </div>
      )}
      {expandedCategory === 'attireAndRings' && (
        <div ref={vendorsRef}>
          <ExpandedHeader category={attireAndRings} />
        </div>
      )}


    </div>
  );
}
