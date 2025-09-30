import React, { useContext, useState } from 'react';
import api from '../api';
import { AppContext } from '../AppContext';
import QuickAddRoomPopup from './QuickAddRoomPopup';

export default function AddRoomPopup({ isVisible, onClose}) {
  const [roomName, setRoomName] = useState('')
  const [quickAdd, setQuickAdd] = useState(false)
  const [addPopup, setAddPopup] = useState(true)
  const [name, setName] = useState('')

  const [phone, setPhone] = useState('')
  const [price, setPrice] = useState(0)
  const { acc, selectedBuilding,floor,setFloor } = useContext(AppContext)
  if (!isVisible) return null

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }
  const handleAddRoom = async () => {
    try {
      if(name===""){
        api.post('/room', {
          roomName:roomName, 
          tenantId: "",
          buildingId: selectedBuilding._id,
          floor: floor, isRented: false, price:price, startday: 0, noPrepaidMonths: 0
        })
        .then(response=>{
          onClose()
        })
        .catch(error=> console.log(error))
      } else {

        const accResponse = await api.post('/acc', {
          name, phone, password: generateRandomString(8), role: 'tenant'
        })
        api.post('/room', {
          roomName:roomName, 
          tenantId: accResponse.data.acc._id,
          buildingId: selectedBuilding._id,
          floor: floor, isRented: true, price:price, startday: new Date(), noPrepaidMonths: 0
        })
        .then(response=>{
          onClose()
        })
        .catch(error=> console.log(error))
      }
    } catch (error) {
      console.log(error)
    }

  }
  const hideQuickAdd = () => {
    setQuickAdd(false)
  }
  return (
    <>
      {!quickAdd &&
        <div class='position-fixed top-50 start-50 translate-middle
    shadow p-3 mb-5 bg-body-tertiary  rounded p-3 d-flex  flex-column
    justify-content-around align-items-center flex-wrap  '
          style={{ height: '60vh', width: '40vw', zIndex: '999', }}>

          {/* <QuickAddRoomPopup isVisible={quickAdd} onClose={hideQuickAdd}/> */}
          <button className="btn btn-warning position-absolute top-0 start-100 translate-middle rounded-circle"
            onClick={onClose}
          >X</button>
          <div className='d-flex flex-row'>

            <h2>Them phong</h2>
            <button className="btn btn-warning ms-2" onClick={() => {
              setQuickAdd(true)
              // setAddPopup(false)
            }}>Them nhanh</button>
          </div>

          <input type="text" style={{ width: '80%' }} class="form-control mb-3"
            placeholder="Ten phong" aria-label="Username"
            aria-describedby="basic-addon1" onChange={e => setRoomName(e.target.value)} />
          <input type="text" style={{ width: '80%' }} class="form-control mb-3"
            placeholder="Nguoi thue" aria-label="Address" aria-describedby="basic-addon1" onChange={e => setName(e.target.value)} />
          <input type="text" style={{ width: '80%' }} class="form-control mb-3"
            placeholder="So dien thoai" aria-label="Address" aria-describedby="basic-addon1" onChange={e => setPhone(e.target.value)} />

          <div class="input-group mb-3" style={{ width: '80%' }}>
            <input type="number" class="form-control" placeholder="Gia phong" aria-label="Username" onChange={e => setPrice(e.target.value)} />
            <span class="input-group-text me-2" >dong/thang</span>
          </div>

          <div class='d-flex justify-content-around'>
            <button className="btn btn-warning " onClick={handleAddRoom}>Them</button>



          </div>
        </div>
      }
      {quickAdd && <QuickAddRoomPopup isVisible={quickAdd} onClose={hideQuickAdd} />}

    </>
  )
}
