import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import api from '../api'

import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import VendorItem from '../components/VendorItem'
import RequestQuoteForm from '../components/RequestQuoteForm/RequestQuoteForm'
export default function Marketplace({ props1 }) {    

    const location = useLocation()
    const type = location.pathname.split('/').pop()
    const [items,setItems] = useState([])
    

    useEffect(()=>{
      try {
        api.get(`/vendoritem/type/${type}`)
            .then(response =>{
              setItems(response.data.vendoritem)
              console.log(response.data.vendoritem)
            }
            )
            .catch(error=>
              console.log(error)
            )
      } catch (error) {
        console.log(error)
      }
    },[type])

    console.log(type)
    return (
        <div className='d-flex flex-wrap' style={{ padding: '8vw' }}>
        <div className='d-flex justify-content-between' style={{ width: '100%' }}>
          <h3>{items.length} Wedding Venues tại Hà Nội</h3>
          <div className='d-flex' >
            <div className="dropdown" style={{ height: '100%' }}>
              <a
                className="btn btn-secondary dropdown-toggle"
                style={{ height: '100%' }}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Địa điểm tổ chức
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
      
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                
                id="floatingInput"
                placeholder="Vị trí"
              />
              <label htmlFor="floatingInput">Vị trí</label>
            </div>
      
            <button
              type="button"
              className="btn btn-lg rounded"
              style={{
                backgroundColor: '#ff44cb',
                color: 'white',
                fontWeight: '500',
                fontSize: '16px',
                padding: '10px 20px',
                width: '20%'
              }}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
              
        <div className='d-flex ' style={{ width: '100%' }}>
        <button type="button" class="btn btn-outline-light rounded-pill border border-black" 
        style={{color:'black'}}
        >Sắp xếp</button>
         <button type="button" class="ms-2 btn btn-outline-light rounded-pill border border-black" 
        style={{color:'black'}}
        >Giá</button>
         <button type="button" class="ms-2 btn btn-outline-light rounded-pill border border-black" 
        style={{color:'black'}}
        >Khoảng cách</button>
      </div>
              {items.map((e,i)=>   (

                <VendorItem key={i} props={e}/>
              ))}
      
      </div>
      
    )
}