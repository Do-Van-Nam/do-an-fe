import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header'
// import RoomPopup from '../../components/RoomPopup'
import style from './rooms.module.css'
import { AppContext } from '../../AppContext'
import AddRoomPopup from '../../components/AddRoomPopup'
import api from '../../api'

export default function Rooms() {
  const [popup, setPopup] = useState(false)

  const [addRoomPopupVisible, setAddRoomPopupVisible] = useState(false)
  const [popupData, setPopupData] = useState(null)
  const { acc, setAcc, selectedBuilding, rooms, setRooms, floor, setFloor } = useContext(AppContext)

  const [guests, setGuests] = useState([])
  useEffect(() => {

    api.get(`/guest/${acc._id}`)
      .then(response => {
        setGuests(response.data.guest.guestList)
      })
      .catch(error => console.log(error))
  },[])

  const RoomPopup = ({ room }) => {
    return (


      <div class='position-absolute top-50 start-50 translate-middle 
        shadow p-3 mb-5 bg-body-tertiary  rounded p-3 d-flex  flex-column
        justify-content-around flex-wrap'
        style={{ height: '40vh', width: '60vw', zIndex: '999' }}>
        <div class='d-flex justify-content-around'>
          <button className="btn btn-warning " style={{ height: '20%', width: '20%' }}>{room.roomName}</button>
          <button className="btn btn-warning position-absolute top-0 start-100 translate-middle rounded-circle"
            onClick={() => setPopup(false)}
          >X</button>

          <div class='d-flex flex-column ms-2'>
            <p>Ten nguoi thue </p>
            <p>0912323123</p>
            <p>Thoi han: 3 thang</p>
          </div>

          <div class='d-flex flex-column ms-4'><p>Tien dien: 321 231 d</p>
            <p>Tien nuoc: 123 342 d</p>
            <p>Con no: 0 dong</p>
          </div>
        </div>

        <div class='d-flex justify-content-around'>
          <button className="btn btn-warning " >Gia han hop dong</button>
          <button className="btn btn-warning " >Cham dut hop dong</button>
          <button className="btn btn-warning " >Xuat hoa don</button>

        </div>
      </div>
    )

  }
  const hideAddRoomPopup = () => setAddRoomPopupVisible(false)
  const floors = Array.from({ length: selectedBuilding.noFloor }, (__, index) => selectedBuilding.noFloor - index)
  const handlePopup = (room) => {
    setPopupData(room)
    setPopup(true)
  }
  return (
    <div class="d-flex justify-content-evenly align-items-center" style={{ height: '100vh', width: '100vw' }}>
      {/* <Header /> */}
      {/* <Sidebar /> */}
      <AddRoomPopup isVisible={addRoomPopupVisible} onClose={hideAddRoomPopup} />
      {popup && <RoomPopup room={popupData} />}
      <div class=' shadow p-3  bg-body-tertiary  rounded p-3 d-flex flex-column '
        style={{ height: '80vh', width: '90vw', overflow: 'scroll' }}>

        <table class="table table-bordered mt-5">
          <thead>
            <tr>
              <th scope="col" class="text-center align-middle w-10" style={{ width: '5%' }}>STT</th>
              <th class="text-center align-middle w-90">Họ tên</th>
              <th class="text-center align-middle w-90">Số điện thoại</th>
              <th class="text-center align-middle w-90">Email</th>

            </tr>
          </thead>
          <tbody class="table-group-divider">
            {guests.map((e,i) => (
            <tr>
              <th scope="row" class="text-center align-middle " >{i+1}</th>
              <td> {e.name}</td>
              <td> {e.phone}</td>
              <td> {e.email}</td>
            </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}
