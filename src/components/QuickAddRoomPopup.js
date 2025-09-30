import React, { useContext, useState } from 'react';
import api from '../api';
import { AppContext } from '../AppContext';


export default function QuickAddRoomPopup({ isVisible, onClose }) {

  const [noFloo, setNoFLoor] = useState(0)
  const [noRoomPerFloor, setNoRoomPerFloor] = useState(0)
  const [price, setPrice] = useState(0)
  const { acc,selectedBuilding } = useContext(AppContext)
  if (!isVisible) return null


  const handleQuickAddRooms = async () => {
    try {
      api.post('/room/quickCreate', {
        noFloor:selectedBuilding.noFloor, noRoomPerFloor,price,buildingId:selectedBuilding._id
      })
      .then()
      .catch(error => console.log(error))
      onClose()
    } catch (error) {
      console.log(error)
    }

  }

  return (

    <div class='position-fixed top-50 start-50 translate-middle
        shadow p-3 mb-5 bg-body-tertiary  rounded p-3 d-flex  flex-column
        justify-content-around align-items-center flex-wrap'
      style={{ height: '60vh', width: '40vw', zIndex: '999' }}>
      <button className="btn btn-warning position-absolute top-0 start-100 translate-middle rounded-circle"
        onClick={onClose}
      >X</button>
      <h2>Them phong nhanh</h2>

      <div class="input-group mb-3" style={{ width: '80%' }}>
        <span class="input-group-text " >So phong moi tang</span>
        <input type="number" class="form-control" placeholder="" aria-label="Username" onChange={e => setNoRoomPerFloor(e.target.value)} />
      </div>
      <div class="input-group mb-3" style={{ width: '80%' }}>
        <input type="number" class="form-control" placeholder="Gia phong" aria-label="Username" onChange={e => setPrice(e.target.value)} />
        <span class="input-group-text me-2" >dong/thang</span>
      </div>
      <p>Ten phong</p>
      <div class="input-group mb-3" style={{ width: '80%' }}>
      <input type="text" class="form-control" placeholder="Tien to" aria-label="Username" onChange={e => setNoFLoor(e.target.value)} />
      <input type="text" class="form-control" placeholder="{so tang}{so thu tu}" aria-label="Username" onChange={e => setNoFLoor(e.target.value)} />
      <input type="text" class="form-control" placeholder="Hau to" aria-label="Username" onChange={e => setNoFLoor(e.target.value)} />
        
      </div>
      <p>A401-1
      </p>


      <div class='d-flex justify-content-around'>
        <button className="btn btn-warning " onClick={handleQuickAddRooms}>Them</button>



      </div>
    </div>
  )
}
