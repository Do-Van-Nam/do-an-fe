import React, { useState ,useEffect,useContext} from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import VendorItem from '../components/VendorItem'
import RequestQuoteForm from '../components/RequestQuoteForm/RequestQuoteForm'
import { Link } from 'react-router-dom'
import api from '../api'
import { AppContext } from '../AppContext'


export default function Checklist() {
  const vendorType = [
    { vendor: 'Địa điểm', type: 'venue',  },
    { vendor: 'Nhiếp Ảnh Gia', type: 'photographer' , },
    { vendor: 'Tiệc Cưới', type: 'wedding_party' , },
    { vendor: 'Áo Cưới', type: 'wedding_dress',  },
    { vendor: 'Nhà Tổ Chức', type: 'organizer', },
    { vendor: 'Bánh Cưới', type: 'wedding_cake', },
    { vendor: 'DJ', type: 'dj', },
    { vendor: 'Quay Phim', type: 'videographer', },
    { vendor: 'Đồ Cưới', type: 'wedding_supplies',  },
    { vendor: 'Trang Điểm', type: 'makeup', },
    { vendor: 'Hoa Cưới', type: 'florist', },
    { vendor: 'Ban Nhạc', type: 'band',  },
    { vendor: 'Quay Bar', type: 'bartender', },
    { vendor: 'Rước Dâu', type: 'wedding_transport',  },
    { vendor: 'Thiệp Cưới', type: 'invitation' , }
  ];
  const [vendorsInPlan, setVendorsInPlan] = useState({});
  const { acc } = useContext(AppContext);

  useEffect(() => {
    if (acc && acc._id) {
      api.get(`/vendorItem/getVendorItemGroupedByType/accId/${acc._id}`)
        .then(response => {
          setVendorsInPlan(response.data);
        })
        .catch(error => console.log(error));
    }
  }, [acc]);

  


  const ar = [1, 2, 3, 4, 5, 6, 7]
  const [favouritedVenue,setFavouritedVenue] = useState(false)
  return (
    <div className='d-flex position-relative flex-wrap justify-content-center align-items-center' style={{ padding: '8vw', width: '100vw',maxWidth:'100vw' }}>

{
  vendorType.map((e,i)=>(

      <div className='shadow  p-3 mb-5 bg-body-tertiary rounded '
        style={{
          width: '80%',
          backgroundColor: 'white',
          height: 'auto',
          // maxHeight: '100vh',
          overflow: 'hidden',
          transition: 'max-height 1s ease-in-out',
        }}>
        <div className='d-flex justify-content-between align-items-center'>
          <div
            style={{ cursor: 'pointer', fontSize: '24px', fontWeight: '600', paddingBottom: '10px' }}
          >
            {e.vendor}
          </div>
          <button type="button" className="btn btn-lg rounded-pill"
            style={{ boxSizing: 'border-box', backgroundColor: vendorsInPlan[e.type]?'green':'red', color: 'white', fontWeight: '500', padding: '10px 20px' }}>
           <i class={`bi bi-${vendorsInPlan[e.type]? 'check-circle-fill':'x-circle'} me-2`}></i>
           {vendorsInPlan[e.type]? 'Hoàn thành':'Chưa hoàn thành'} 
          </button>
        </div>

        <div style={{ fontSize: '24px', color: '#555', marginBottom: '10px' }}>
          {vendorsInPlan[e.type]?.name||""}
        </div>

        <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#333' }}>          {vendorsInPlan[e.type]?.subInfo||""}</div>
          <div className='d-flex flex-column align-items-center'>
          <Link to={`/marketplace/${e.type}`} style={{textDecoration:'none',}}>
            <a  style={{ fontSize: '14px', color: '#ff44cb' }}>
              Xem thêm {e.vendor}
            </a>
            </Link>
            <Link to={'/favourite'} style={{textDecoration:'none',}}>
            
            <a style={{ fontSize: '14px', color: '#ff44cb' ,cursor:'pointer'}}
            
            >
              Chọn từ yêu thích
            </a>
            </Link>
          </div>

        </div>
        <div className='d-flex justify-content-center mb-2'>
{          vendorsInPlan[e.type]? (


  <img src="https://datphongresort.com/wp-content/uploads/2022/05/16102014lotte.jpg" alt=""
    className='rounded ' style={{ height: '20vh', width: '70%', objectFit: 'cover' }} />
):(
<></>
)}
        </div>
      

      </div>


  ))
}

    </div>

  )
}