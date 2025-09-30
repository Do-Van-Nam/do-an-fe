import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { AppContext } from '../AppContext'
import AddGuestPopup from '../components/AddRoomPopup'
import api from '../api'

export default function Guests() {
    const [popup, setPopup] = useState(false)
    const [popupType, setPopupType] = useState('')
const [name, setName] = useState('')
const [phone, setPhone] = useState('')
const [email, setEmail] = useState('')
    const [addGuestPopupVisible, setAddGuestPopupVisible] = useState(false)
    const [popupData, setPopupData] = useState(null)
    const { acc, setAcc, selectedBuilding } = useContext(AppContext)

    const [guests, setGuests] = useState([])
    useEffect(() => {

        api.get(`/guest/${acc._id}`)
            .then(response => {
                setGuests(response.data.guest.guestList)
            })
            .catch(error => console.log(error))
    }, [popup])
const handleEditGuest = async(guest) => {
    try {
    await api.put(`/guest/updateOneGuest/${acc._id}`, { guest, id: guest._id })
setPopup(false)    
} catch (error) {
        console.log(error)
        
    }
}
const handleDeleteGuest = async(guest) => {
   const id = guest._id
   console.log(id)
   try {
   const response = await api.delete(`/guest/deleteOneGuest/${acc._id}`, {data: {id :id}});    
    setPopup(false)
} catch (error) {
       console.log(error)
       
   }
}
const handleAddGuest = async(guest) => {
    const guestData = { guestList:[
        guest
    ] }
    try {
        await api.post(`/guest/${acc._id}`, guestData)  
setPopup(false)
    } catch (error) {
        console.log(error)
        
    }

}
    const GuestPopup = ({ guest }) => {
        return (
            <div className='position-absolute top-50 start-50 translate-middle 
                shadow bg-white rounded p-4'
                style={{
                    height: '500px',
                    width: '600px',
                    zIndex: '999',
                    border: '1px solid #dee2e6'
                }}>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                    <h4 className="m-0 fw-bold">Thông tin khách mời</h4>
                    <button className="btn btn-close"
                        onClick={() => setPopup(false)}
                    ></button>
                </div>

                <div className='mb-3'>
                    <div className="form-group mb-4">
                        <label className="form-label fw-semibold">Họ tên</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            defaultValue={guest.name}
                            placeholder="Nhập tên khách..."
                            onChange={(e) => guest.name = e.target.value}
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label className="form-label fw-semibold">Số điện thoại</label>
                        <input
                            type="tel"
                            className="form-control form-control-lg"
                            defaultValue={guest.phone}
                            placeholder="Nhập số điện thoại..."
                            onChange={(e) => guest.phone = e.target.value}
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            defaultValue={guest.email}
                            placeholder="Nhập email..."
                            onChange={(e) => guest.email = e.target.value}
                        />
                    </div>
                    <div className='d-flex justify-content-center gap-3 mt-5'>
                        {popupType === 'add' ? (
                            <button className="btn btn-primary btn-lg px-4"
                            onClick={() => {handleAddGuest(guest)}}
                            >
                                <i className="bi bi-plus-lg me-2"></i>
                                Thêm khách
                            </button>
                        ) : (
                            <>
                                <button className="btn btn-primary btn-lg px-4"
                                
                                onClick={() => {handleEditGuest(guest)}}>
                                    <i className="bi bi-check-lg me-2"></i>
                                    Lưu thông tin
                                </button>
                                <button className="btn btn-danger btn-lg px-4"
                                 onClick={() => {handleDeleteGuest(guest)}}
                                >
                                    <i className="bi bi-trash me-2"></i>
                                    Xóa khách
                                </button>
                            </>
                        )}

                    </div>
                </div>
            </div>
        )
    }
    const hideAddGuestPopup = () => setAddGuestPopupVisible(false)
    const floors = Array.from({ length: selectedBuilding.noFloor }, (__, index) => selectedBuilding.noFloor - index)
    const handlePopup = (guest) => {
        setPopupData(guest)
        setPopup(true)
        console.log(guests)
    }
    return (
        <div class="d-flex justify-content-evenly align-items-center" style={{ height: '100vh', width: '100vw' }}>
            <AddGuestPopup isVisible={addGuestPopupVisible} onClose={hideAddGuestPopup} />
            {popup && <GuestPopup guest={popupData}  />}
            <div class='mt-5 shadow p-3  bg-body-tertiary  rounded p-3 d-flex flex-column '
                style={{ height: '80vh', width: '90vw', overflow: '', marginTop: '10vh' }}>
                <div class="d-flex justify-content-end ">
                        <i class="bi  bi-plus-circle-fill" style={{ fontSize: '32px',color:'#ff44cb' , cursor:'pointer'}}
                        onClick={() =>{
                            setPopupType('add')
                            handlePopup({name:'',phone:'',email:''})} }
                        ></i>
                </div>
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
                        {guests.map((e, i) => (
                            <tr key={i} onClick={() => {setPopupType('info');handlePopup(e)}}
                                style={{ cursor: 'pointer !important' }}>
                                <th scope="row" class="text-center align-middle "  >{i + 1}</th>
                                <td style={{ pointerEvents: 'all' }} onClick={() => handlePopup(e)} > {e.name}</td>
                                <td style={{ pointerEvents: 'all' }}> {e.phone}</td>
                                <td style={{ pointerEvents: 'all' }}> {e.email}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>

            </div>
        </div>

    )
}

