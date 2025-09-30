import React, { useContext, useState } from 'react';

export default function AddVendorItem({ isVisible,onClose,type}) {
  if (!isVisible) return null
  var title = '', subInfo = ''

switch (type) {
  case 'venue':
    title = 'địa điểm'
  subInfo='địa chỉ'
    break;
    case 'attire':
      title = 'trang phục'
    subInfo=''
      break;
      case 'rings':
      title = 'nhẫn'
    subInfo=''
      break;
      case 'vendor':
        title = 'nhà cung cấp dịch vụ'
      subInfo=''
        break;
  default:
    break;
}
  return (

    <div className='position-fixed top-50 start-50 translate-middle shadow bg-body-tertiary rounded
    d-flex flex-column justify-content-center align-items-center
    '
      style={{ height: '80vh', width: '492px', zIndex: '999' }}>

      <button className='btn rounded-circle position-absolute top-0 end-0 d-flex justify-content-center align-items-center me-1 mt-1'
        style={{ backgroundColor: 'white', zIndex: '999', height: '30px', width: '30px' }}
        onClick={onClose}
        >
        
        <i class="bi bi-x-lg"></i>
      </button>
      <h3>Thêm thông tin {title}</h3>
      <div class="form-floating mb-3" style={{ width: '80%' }}>
        <input type="text" class={`form-control `} id="floatingInput" placeholder="" />
        <label for="floatingInput">Tên {title}</label>
      </div>
      <div class="form-floating mb-3" style={{ width: '80%' }}>
        <input type="text" class={`form-control `} id="floatingInput" placeholder="" />
        <label for="floatingInput">{subInfo}</label>
      </div>
     
      <div class="row g-0 mb-3" style={{ width: '80%' }}>
  <div class="col">
    <div class="form-floating">
      <input type="number" class="form-control" id="floatingInput1" placeholder="" />
      <label for="floatingInput1">Chi phí từ</label>
    </div>
  </div>
  <div class="col">
    <div class="form-floating">
      <input type="number" class="form-control" id="floatingInput2" placeholder="" />
      <label for="floatingInput2">đến</label>
    </div>
  </div>
</div>

      <div class="input-group mb-3" style={{ width: '80%' }}>
  <input type="file" class="form-control" id="inputGroupFile02"/>
  <label class="input-group-text" for="inputGroupFile02">Thêm hình ảnh</label>
</div>
      <div class="form-floating mb-3" style={{ width: '80%' }}>
        <input type="text" class={`form-control `} id="floatingInput" placeholder="" />
        <label for="floatingInput">Mô tả ngắn gọn</label>
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
       Thêm
      </button>
    </div>

  )
}
