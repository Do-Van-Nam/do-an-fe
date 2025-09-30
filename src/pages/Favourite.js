import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import api from '../api'

import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import VendorItem from '../components/VendorItem'
import RequestQuoteForm from '../components/RequestQuoteForm/RequestQuoteForm'
import { AppContext } from '../AppContext'
export default function Favourite() {
  const vendorType = [
    { vendor: 'Địa điểm', type: 'venue' },
    { vendor: 'Nhiếp Ảnh Gia', type: 'photographer' },
    { vendor: 'Tiệc Cưới', type: 'catering' },
    { vendor: 'Áo Cưới', type: 'bridal-gown' },
    { vendor: 'Nhà Tổ Chức', type: 'wedding-planner' },
    { vendor: 'Bánh Cưới', type: 'wedding-cake' },
    { vendor: 'DJ', type: 'dj' },
    { vendor: 'Quay Phim', type: 'videographer' },
    { vendor: 'Đồ Cưới', type: 'rental-bridal' },
    { vendor: 'Trang Điểm', type: 'makeup-services' },
    { vendor: 'Hoa Cưới', type: 'flowers' },
    { vendor: 'Ban Nhạc', type: 'band' },
    { vendor: 'Quay Bar', type: 'bar-service' },
    { vendor: 'Rước Dâu', type: 'transportation' },
    { vendor: 'Thiệp Cưới', type: 'invitations' }
  ];

  const [vendorsId, setVendorsId] = useState([])
  const [vendors, setVendors] = useState([])
  const { acc } = useContext(AppContext)
  useEffect(() => {
    try {
      if (acc && acc._id) {

        api.get(`/favourite/${acc._id}`)
          .then(response => {
            setVendorsId(response.data.favourite.vendors)
          }
          )
          .catch(error =>
            console.log(error)
          )
      }
    } catch (error) {
      console.log(error)
    }
  }, [acc])
  const fetchVendorItemById = async (vendorId) => {
    try {
      const response = await api.get(`/vendorItem/id/${vendorId}`);
      return response.data.vendoritem;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllVendors = async () => {
      try {
        const vendorPromises = vendorsId.map(vendorId => fetchVendorItemById(vendorId));
        const vendorsData = await Promise.all(vendorPromises);
        setVendors(vendorsData);
        console.log(vendorsData)
      } catch (error) {
        console.log(error);
      }
    };

    if (vendorsId.length) {
      fetchAllVendors();
    }
  }, [vendorsId])
  return (
    <div className='d-flex flex-wrap' style={{ padding: '8vw' }}>
      {vendorType.map(vendor => {
        const filteredVendors = vendors.filter(e =>e!==null&& e.type!==null && e.type === vendor.type); // Lọc các vendor theo type

        return (<>


          <h3 style={{ width: '100%' }}>{vendor.vendor}</h3>
          {filteredVendors.length > 0 ? (
            filteredVendors
              .map((e, i) => (

                <VendorItem key={i} props={e} />
              ))

          ) : (
            <div className='d-flex flex-column align-items-center' style={{ width: "100%" }}>
              <div className='mt-3 mb-3' style={{ fontSize: '1.3rem' }}>Bạn chưa thêm {vendor.vendor}</div>
              <button type="button" className="btn btn-lg rounded-pill "
                style={{
                  backgroundColor: '#ff44cb',
                  color: 'white',
                  fontWeight: '500',
                  fontSize: '16px',
                  padding: '10px 20px',
                  width: ''
                }}>
                Tìm thêm
              </button>
            </div>

          )}

        </>
        )
      })}

    </div>

  )
}