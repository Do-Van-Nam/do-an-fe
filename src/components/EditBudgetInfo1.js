import React, { useState,useContext,useEffect  } from 'react';
import style from './EditWeddingInfo.module.css'
import { AppContext } from '../../AppContext'
import api from '../../api';

export default function EditWeddingInfo({ isVisible, onClose,acc,plan}) {

  
  // console.log(acc,plan, plan.partner)
  const [name,setName] = useState(acc?.name||"")
  const [partner,setPartner] = useState(plan?.partner||"")
  const [location,setLocation] = useState(plan?.location||"")
  // const plandate = new Date(plan.date);
  // const formattedDate = plandate.toISOString()
  const [date, setDate] = useState(plan?.date ? plan.date.slice(0, 10) : ""); 
  // const [date,setDate] = useState("2024-12-24")
  useEffect(() => {
    setName(acc?.name||"")
    setPartner(plan?.partner || "");
    setLocation(plan?.location || "");
    setDate(plan?.date ? plan.date.slice(0, 10) : "")
}, [acc,plan]);



  const handleUpdate = async() => {
    api.put(`/plan/${plan._id}`,{
      accId:acc._id, partner,date,location,vendors : plan.vendors
    })
    .then((response)=>{
onClose()
    })
    .catch(error => console.log(error))
  };

 
  if(!isVisible) return null
  return (

    <div className='position-fixed top-50 start-50 translate-middle shadow bg-body-tertiary rounded
      d-flex flex-column justify-content-center align-items-center'
      style={{ height: '80vh', width: '492px', zIndex: '999' }}
    >
      <button className='btn rounded-circle position-absolute top-0 end-0 d-flex justify-content-center align-items-center me-1 mt-1'
        style={{ backgroundColor: 'white', zIndex: '999', height: '30px', width: '30px' }}
        onClick={onClose}
      >
        <i className="bi bi-x-lg"></i>
      </button>
      <h3>Thông tin đám cưới của bạn</h3>

      <div className="form-floating mb-3" style={{ width: '80%' }}>
        <input type="text" className={`form-control ${style.customInput}`} id="floatingInputName" placeholder=""
          name="name" value={name} onChange={(e)=>setName(e.target.value)} />
        <label htmlFor="floatingInputName">Tên của bạn</label>
      </div>

      <div className="form-floating mb-3" style={{ width: '80%' }}>
        <input type="text" className={`form-control ${style.customInput}`} id="floatingInputPartner" placeholder=""
          name="partner" value={partner} onChange={(e)=>setPartner(e.target.value)}/>
        <label htmlFor="floatingInputPartner">Tên người thương của bạn</label>
      </div>

      <div className="form-floating mb-3" style={{ width: '80%' }}>
        <input type="date" className={`form-control ${style.customInput}`} id="floatingInputDate" placeholder=""
          name="date" value={date.slice(0,10)} onChange={(e)=>setDate(e.target.value)} />
        <label htmlFor="floatingInputDate">Ngày cưới</label>
      </div>

      <div className="form-floating mb-3" style={{ width: '80%' }}>
        <input type="text" className={`form-control ${style.customInput}`} id="floatingInputLocation" placeholder=""
          name="location" value={location} onChange={(e)=>setLocation(e.target.value)}/>
        <label htmlFor="floatingInputLocation">Địa điểm</label>
      </div>

      <button type="button" onClick={handleUpdate} className="btn btn-lg rounded-pill position-absolute bottom-0 mb-3"
        style={{
          backgroundColor: '#ff44cb',
          color: 'white',
          fontWeight: '500',
          fontSize: '16px',
          padding: '10px 20px',
          width: '90%'
        }}>
        Cập nhật
      </button>
    </div>
 
  );
}
