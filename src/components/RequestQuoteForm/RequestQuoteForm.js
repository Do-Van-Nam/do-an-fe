import React, { useContext, useState } from 'react';
import api from '../../api';
import { AppContext } from '../../AppContext';
import style from './RequestQuoteForm.module.css'

export default function RequestQuoteForm({ props }) {

  return (

    <div className='position-fixed top-50 start-50 translate-middle shadow bg-body-tertiary rounded
    d-flex flex-column justify-content-center align-items-center
    '
      style={{ height: '80vh', width: '492px', zIndex: '999' }}>

      <button className='btn rounded-circle position-absolute top-0 end-0 d-flex justify-content-center align-items-center me-1 mt-1'
        style={{ backgroundColor: 'white', zIndex: '999', height: '30px', width: '30px' }}>
        <i class="bi bi-x-lg"></i>
      </button>
      <h3>Gửi tới nhà cung cấp</h3>
      <div class="form-floating mb-3" style={{ width: '80%' }}>
        <input type="text" class={`form-control ${style.customInput}`} id="floatingInput" placeholder="" />
        <label for="floatingInput">Họ tên</label>
      </div>
      <div class="form-floating mb-3" style={{ width: '80%' }}>
        <input type="text" class={`form-control ${style.customInput}`} id="floatingInput" placeholder="" />
        <label for="floatingInput">Email</label>
      </div>
      <div class="form-floating mb-3" style={{ width: '80%' }}>
        <input type="text" class={`form-control ${style.customInput}`} id="floatingInput" placeholder="" />
        <label for="floatingInput">Số điện thoại</label>
      </div>
      <div class="form-floating mb-3" style={{ width: '80%' }}>
        <input type="date" class={`form-control ${style.customInput}`} id="floatingInput" placeholder="" />
        <label for="floatingInput">Ngày cưới</label>
      </div>
      <div class="form-floating mb-3" style={{ width: '80%' }}>
        <input type="text" class={`form-control ${style.customInput}`} id="floatingInput" placeholder="" />
        <label for="floatingInput">Số khách mời</label>
      </div>
      <div class="form-floating mb-3" style={{ width: '80%' }}>
        <input type="text" class={`form-control ${style.customInput}`} id="floatingInput" placeholder="" />
        <label for="floatingInput">Giới thiệu một chút về bản thân và đám cưới</label>
      </div>
      <button type="button" className="btn btn-lg rounded-pill position-absolute bottom-0 mb-3"
        style={{
          backgroundColor: '#ff44cb',
          color: 'white',
          fontWeight: '500',
          fontSize: '16px',
          padding: '10px 20px',
          width: '90%'
        }}>
        Liên hệ báo giá
      </button>
    </div>

  )
}
