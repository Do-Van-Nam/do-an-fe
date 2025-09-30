import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header'
import { AppContext } from '../../AppContext'
import { Link, useNavigate } from 'react-router-dom'

import api from '../../api'
import BuildingPopup from '../../components/BuildingPopup'
import EditWeddingInfo from '../../components/EditWeddingInfo/EditWeddingInfo'
import AddVendorItem from '../../components/AddVendorItem'

export default function Home() {
    // const { selectedBuilding, rooms, setRooms } = useContext(AppContext)
    // const [editBuildingPopup, setEditBuildingPopup] = useState(false)
    // const [deleteBuildingPopup, setDeleteBuildingPopup] = useState(false)
    // useEffect(() => {
    //     api.get(`/room/${selectedBuilding._id}`)
    //         .then((response) =>
    //             setRooms(response.data.rooms)
    //         )
    //         .catch(error => {
    //             console.log(error)
    //         }
    //         )
    // }, [selectedBuilding])
    const [editWeddingInfoVisible, setEditWeddingInfoVisible] = useState(false)
    const { acc, setAcc, plan, setPlan } = useContext(AppContext);
    const navigate = useNavigate()
    useEffect(() => {
        try {
            api.get(`/acc/id/${acc._id}`)
                .then(response => {
                    console.log(response.data.user)
                    setAcc(response.data.user)
                }
                )
                .catch(error => {
                    // navigate('/')
                    console.log(error)
                }
                )
        } catch (error) {
            console.log(error)
        }
        console.log(acc)

    }, [editWeddingInfoVisible])
   
    const [plan1, setPlan1] = useState({})

    // const floors = Array.from({ length: selectedBuilding.noFloor }, (__, index) => selectedBuilding.noFloor - index)
    // const hideEditBuildingPopup = () => {
    //     setEditBuildingPopup(false)
    // }
    // const hideDeleteBuildingPopup = () => {
    //     setDeleteBuildingPopup(false)
    // }
    const vendors = [
        { vendor: 'Nhiếp Ảnh Gia', icon: 'bi-camera-fill' },   // Icon: Máy ảnh
        { vendor: 'Tiệc Cưới', icon: 'bi-cake-fill' },        // Icon: Ly rượu
        { vendor: 'Áo Cưới', icon: 'bi-person-fill' },         // Icon: Người
        { vendor: 'Nhà Tổ Chức', icon: 'bi-building-fill' }, // Icon: Nhóm người
        { vendor: 'Bánh Cưới', icon: 'bi-cake-fill' },          // Icon: Túi bánh
        { vendor: 'DJ', icon: 'bi-disc-fill' },        // Icon: Nốt nhạc
        { vendor: 'Quay Phim', icon: 'bi-film' },              // Icon: Cuộn phim
        { vendor: 'Đồ Cưới', icon: 'bi-shop-window' }, // Icon: Cửa hàng
        { vendor: 'Trang Điểm', icon: 'bi-brush-fill' }, // Icon: Bút cọ trang điểm
        { vendor: 'Hoa Cưới', icon: 'bi-flower1' },             // Icon: Hoa
        { vendor: 'Ban Nhạc', icon: 'bi-music-note-list' },     // Icon: Danh sách nhạc
        { vendor: 'Quay Bar', icon: 'bi-cup-straw' },   // Icon: Ly uống
        { vendor: 'Rước Dâu', icon: 'bi-truck' },               // Icon: Xe tải
        { vendor: 'Thiệp Cưới', icon: 'bi-envelope-fill' },     // Icon: Phong bì
    ]
    const [venueExpanded, setVenueExpanded] = useState(true)
    const toggleVenueBoxSize = () => setVenueExpanded(!venueExpanded)
    const closeEditWeddingInfo = () => setEditWeddingInfoVisible(false)
    const [addVenueVisible, setAddVenueVisible] = useState(false)
    const closeAddVenue = () => setAddVenueVisible(false)
    const [type, setType] = useState('')
    const [addVendorItemVisible, setAddVendorItemVisible] = useState(false)
    const closeAddVendorItem = () => setAddVendorItemVisible(false)
    const [selectVendorPopup, setSelectVendorPopup] = useState(false)
    const [vendorType, setVendorType] = useState('')
    useEffect(() => {
        if (acc && acc._id) {
            api.get(`/plan/${acc._id}`)
                .then((response) => {
                    setPlan(response.data.plan);
                    console.log("Dữ liệu plan:", response.data.plan);
                })
                .catch(error => console.log(error));
        }
    }, [acc]);
    useEffect(() => {
        api.get(`/plan/${acc._id}`)
            .then((response) => {
                setPlan(response.data.plan)

            })
            .catch(error => console.log(error))
    }, [acc._id])
    useEffect(() => {
        api.get(`/plan/${acc._id}`)
            .then((response) => {
                setPlan(response.data.plan)
                setPlan1(response.data.plan)
            })
            .catch(error => console.log(error))
    }, [editWeddingInfoVisible])
    const SelectVendorPopup = () => (
        <div className='position-fixed top-50 start-50 translate-middle shadow bg-body-tertiary rounded
    d-flex flex-column justify-content-center align-items-center
    '
            style={{ height: '80vh', width: '492px', zIndex: '999' }}>
            <button className='btn rounded-circle position-absolute top-0 end-0 d-flex justify-content-center align-items-center me-1 mt-1'
                style={{ backgroundColor: 'white', zIndex: '999', height: '30px', width: '30px' }}
                onClick={() => setSelectVendorPopup(false)}
            >

                <i class="bi bi-x-lg"></i>
            </button>
            <div class="dropdown" style={{ width: '60%' }}>
                <button class="btn btn-secondary dropdown-toggle"
                    style={{ width: '100%' }}
                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {vendorType}
                </button>
                <ul className="dropdown-menu" style={{ width: '100%' }}>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setVendorType('Nhiếp Ảnh Gia'); setType('photographer'); }}>
                            Nhiếp Ảnh Gia
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setVendorType('Tiệc Cưới'); setType('catering'); }}>
                            Tiệc Cưới
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setVendorType('Áo Cưới'); setType('wedding-dress'); }}>
                            Áo Cưới
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setVendorType('Nhà Tổ Chức'); setType('organizer'); }}>
                            Nhà Tổ Chức
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setVendorType('Bánh Cưới'); setType('cake'); }}>
                            Bánh Cưới
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setVendorType('DJ'); setType('dj'); }}>
                            DJ
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setVendorType('Quay Phim'); setType('videography'); }}>
                            Quay Phim
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setVendorType('Đồ Cưới'); setType('wedding-shop'); }}>
                            Đồ Cưới
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setVendorType('Trang Điểm'); setType('makeup'); }}>
                            Trang Điểm
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setVendorType('Hoa Cưới'); setType('wedding-flower'); }}>
                            Hoa Cưới
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setVendorType('Ban Nhạc'); setType('band'); }}>
                            Ban Nhạc
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setVendorType('Quay Bar'); setType('bar'); }}>
                            Quay Bar
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setVendorType('Rước Dâu'); setType('transportation'); }}>
                            Rước Dâu
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#" onClick={() => { setVendorType('Thiệp Cưới'); setType('invitation'); }}>
                            Thiệp Cưới
                        </a>
                    </li>
                </ul>

            </div>


            <button type="button" className="btn btn-lg rounded-pill mt-3"
                style={{
                    backgroundColor: '#ff44cb',
                    color: 'white',
                    fontWeight: '500',
                    fontSize: '16px',
                    padding: '10px 20px',
                    width: '60%'
                }}
                onClick={() => { setAddVendorItemVisible(true); setSelectVendorPopup(false) }}
            >
                Thêm
            </button>
        </div>
    )
    const formatDate = (dateString) => {
        if (!plan) return ""
        const date = new Date(dateString);

        // Lấy các thành phần ngày, tháng, năm
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần +1
        const year = date.getFullYear();

        // Tạo chuỗi theo định dạng mong muốn
        return `Ngày ${day} tháng ${month} năm ${year}`;
    };
    const noDaysUtilEvent = () => {
        if (!plan) return 0
        const today = new Date();
        const eventDate = new Date(plan.date);
        console.log(acc, plan, plan.date)
        // Tính số ngày cách biệt
        const timeDifference = eventDate.getTime() - today.getTime();
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return daysRemaining
    }
    return (
        <div class=' d-flex flex-wrap justify-content-evenly align-items-start'
            style={{ padding: '0', margin: '0', border: '0', backgroundColor: "#f1ece4" }}>


            <EditWeddingInfo isVisible={editWeddingInfoVisible} onClose={closeEditWeddingInfo} acc={acc} plan={plan} />


            {/* <AddVendorItem isVisible={addVenueVisible} onClose={closeAddVenue} type={'venue'}/> */}
            <AddVendorItem isVisible={addVendorItemVisible} onClose={closeAddVendorItem} type={type} />
            {selectVendorPopup && <SelectVendorPopup />}
            <div className='wedding-info d-flex flex-column justify-content-between align-items-center'
                style={{ cursor: 'pointer', backgroundColor: "#f1ece4", width: '90vw', maxWidth: '90vw', marginTop: '15vh' }}
                onClick={() => setEditWeddingInfoVisible(true)}
            >
                <img src='images/heartShape.png' class=" me-2" alt="..." style={{ height: '50px', width: 'auto' }}></img>
{
    plan ? (<><h3>{noDaysUtilEvent()} ngày tới ngày cưới!</h3>
    <h1>{acc.name} <i class="bi bi-heart-fill" style={{ fontSize: '30px', color: '#ff44cb' }}></i> {plan?.partner || ""}</h1>
    <div className='d-flex'>
        <div className='me-3'>{formatDate(plan?.date || null)}</div>
        <div>{plan?.location || ""}</div>

    </div></>):(<h3>Thêm thông tin đám cưới của bạn</h3>)
}
                
            </div>


            <h4 style={{ width: '80%' }}>Kế hoạch tổ chức đám cưới</h4>

            <div className='left-side d-flex flex-column '

            >
                <div className='budget shadow p-3 mb-5 bg-body-tertiary rounded'
                    style={{
                        width: '43vw',
                        backgroundColor: 'white',
                        height: venueExpanded ? 'auto' : '15vh',
                        maxHeight: venueExpanded ? '100vh' : '15vh',
                        overflow: 'hidden',
                        transition: 'max-height 1s ease-in-out',
                    }}>
                    <div className='d-flex justify-content-between align-items-center' style={{ width: '100%' }}>
                        <div className='d-flex justify-content-between'
                            style={{ fontSize: '24px', fontWeight: '600', paddingBottom: '10px' }}
                        >
                            Ngân sách
                        </div>
                        <Link to={'/budget'}>


                            <button type="button" className="btn btn-lg rounded-pill"
                                style={{ boxSizing: 'border-box', backgroundColor: '#ff44cb', color: 'white', fontWeight: '500', padding: '10px 20px' }}>
                                Chi tiết
                            </button>
                        </Link>
                    </div>



                    <div className='d-flex  align-items-center justify-content-around'>

                        <div style={{ fontSize: '24px', color: '#ff44cb', textAlign: 'center' }}>
                            Ngân sách dự kiến<br></br>
                            {plan?.budget?.toLocaleString('vi-VN') || 0} đ
                        </div>
                        <div style={{ fontSize: '24px', color: '#ff44cb', textAlign: 'center' }}>
                            Đã sử dụng <br />
                            {Math.round(plan?.paid / plan?.budget * 100) || 0}%
                        </div>
                    </div>
                </div>

                <div className='venue shadow p-3 mb-5 bg-body-tertiary rounded p-3'
                    style={{
                        width: '43vw',
                        backgroundColor: 'white',
                        height: venueExpanded ? 'auto' : '15vh',
                        maxHeight: venueExpanded ? '100vh' : '15vh',
                        overflow: 'hidden',
                        transition: 'max-height 1s ease-in-out',
                    }}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div
                            style={{ cursor: 'pointer', fontSize: '24px', fontWeight: '600', paddingBottom: '10px' }}
                        >
                            Địa điểm
                        </div>
                        <Link to={'/marketplace/venue'}>


                            <button type="button" className="btn btn-lg rounded-pill"
                                style={{ boxSizing: 'border-box', backgroundColor: '#ff44cb', color: 'white', fontWeight: '500', padding: '10px 20px' }}>
                                Tìm địa điểm
                            </button>
                        </Link>
                    </div>

                    <div style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>
                        Tìm địa điểm thích hợp để tổ chức lễ cưới.
                    </div>

                    <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: '10px' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#333' }}>Khám phá các địa điểm</div>

                        <Link to={'/marketplace/venue'} style={{ fontSize: '14px', color: '#ff44cb' }}>
                            Xem tất cả
                        </Link>
                    </div>

                    <div className='location-info d-flex flex-column align-items-center' style={{ marginBottom: '10px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: '500', color: '#333' }}>Wedding Planner</h4>
                        <h4 style={{ fontSize: '16px', color: '#555' }}>Bạn chưa chọn địa điểm tổ chức đám cưới</h4>
                        <h4 style={{ fontSize: '16px', color: '#555' }}>Thử nội dung khác</h4>
                    </div>

                    <div className='d-flex flex-column align-items-center'>
                        <a href="javascript:void(0);" style={{ fontSize: '16px', color: '#ff44cb', textAlign: 'center' }}
                            // onClick={()=>setAddVenueVisible(true)}
                            onClick={() => { setType('venue'); setAddVendorItemVisible(true) }}

                        >
                            Đã thuê địa điểm? Thêm thông tin địa điểm tổ chức
                        </a>

                    </div>
                </div>
                <div className='attireAndRings shadow p-3 mb-5 bg-body-tertiary rounded p-3'
                    style={{
                        width: '43vw',
                        backgroundColor: 'white',
                        height: venueExpanded ? 'auto' : '15vh',
                        maxHeight: venueExpanded ? '100vh' : '15vh',
                        overflow: 'hidden',
                        transition: 'max-height 1s ease-in-out',
                    }}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div
                            style={{ cursor: 'pointer', fontSize: '24px', fontWeight: '600', paddingBottom: '10px' }}
                        >
                            Trang phục và Nhẫn cưới
                        </div>
                        <Link to={'/marketplace/rings'}>
                            <button type="button" className="btn btn-lg rounded-pill"
                                style={{ backgroundColor: '#ff44cb', color: 'white', fontWeight: '500', padding: '10px 20px' }}>
                                Tìm Trang phục và Nhẫn
                            </button>
                        </Link>
                    </div>

                    <div style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>
                        Tìm Trang phục và Nhẫn cho lễ cưới.
                    </div>

                    <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: '10px' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#333' }}>Khám phá các Trang phục và Nhẫn</div>
                        <Link to={'/marketplace/rings'} href="javascript:void(0);" style={{ fontSize: '14px', color: '#ff44cb' }}>
                            Xem tất cả
                        </Link>
                    </div>

                    <div className='location-info d-flex flex-column align-items-center' style={{ marginBottom: '10px' }}>
                        <h4 style={{ fontSize: '18px', fontWeight: '500', color: '#333' }}>Wedding Planner</h4>
                        <h4 style={{ fontSize: '16px', color: '#555' }}>Bạn chưa chọn Trang phục và Nhẫn</h4>
                        <h4 style={{ fontSize: '16px', color: '#555' }}>Thử nội dung khác</h4>
                    </div>

                    <div className='d-flex flex-column align-items-center'>
                        <div style={{ fontSize: '16px', color: '#ff44cb', textAlign: 'center' }}>
                            Đã có Trang phục và Nhẫn cưới?
                            <span style={{ cursor: 'pointer', textDecoration: 'underline', marginRight: '8px' }} onClick={() => { setType('attire'); setAddVendorItemVisible(true) }}> Thêm Trang phục</span>
                            <span style={{ cursor: 'pointer', textDecoration: 'underline', }} onClick={() => { setType('rings'); setAddVendorItemVisible(true) }}> Thêm Nhẫn</span>
                        </div>

                    </div>

                </div>
            </div>
            <div className='right-side d-flex flex-column '

            >
                <div className='vendors shadow p-3 mb-5 bg-body-tertiary rounded p-3'
                    style={{
                        width: '43vw',
                        backgroundColor: 'white',
                        height: venueExpanded ? 'auto' : '15vh',
                        maxHeight: venueExpanded ? '100vh' : '15vh',
                        overflow: 'hidden',
                        transition: 'max-height 1s ease-in-out',
                    }}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div
                            style={{ cursor: 'pointer', fontSize: '24px', fontWeight: '600', paddingBottom: '10px' }}
                        >
                            Nhà cung cấp
                        </div>
                        <Link to={'/marketplace/venue'}>
                            <button type="button" className="btn btn-lg rounded-pill"
                                style={{ backgroundColor: '#ff44cb', color: 'white', fontWeight: '500', padding: '10px 20px' }}>
                                Tìm Nhà cung cấp
                            </button>
                        </Link>
                    </div>

                    <div style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>
                        Tìm các nhà cung cấp dịch vụ cho lễ cưới.
                    </div>

                    <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: '10px' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#333' }}>Khám phá các Nhà cung cấp</div>
                        <Link to={'/marketplace/venue'} href="javascript:void(0);" style={{ fontSize: '14px', color: '#ff44cb' }}>
                            Xem tất cả
                        </Link>
                    </div>

                    <div className='location-info d-flex flex-wrap align-items-center' style={{ marginBottom: '10px', width: '100%' }}>



                        {vendors.map((e, i) => (
                            <div className='d-flex flex-column align-items-center ms-2 me-2'
                                style={{ width: '20%' }}
                            >
                                <div className='d-flex justify-content-center align-items-center rounded'
                                    style={{ width: '80px', height: '80px', backgroundColor: 'black' }}
                                >
                                    <i class={e.icon} style={{ color: 'white', fontSize: '30px' }}></i>
                                </div>
                                <p>{e.vendor}</p>
                            </div>
                        ))}
                    </div>

                    <div className='d-flex flex-column align-items-center'>
                        <a href="javascript:void(0);" style={{ fontSize: '16px', color: '#ff44cb', textAlign: 'center' }}
                            onClick={() => setSelectVendorPopup(true)}
                        >
                            Đã thuê nhà cung cấp dịch vụ? Thêm thông tin nhà cung cấp dịch vụ
                        </a>

                    </div>
                </div>


            </div>



        </div>
    )
}




{/* <BuildingPopup type={'edit'} isVisible={editBuildingPopup} onClose={hideEditBuildingPopup} />
            <BuildingPopup type={'delete'} isVisible={deleteBuildingPopup} onClose={hideDeleteBuildingPopup} />
            <div class='position-relative shadow-lg p-3 mb-5 bg-body-tertiary  rounded p-3 d-flex flex-column justify-content-center'
                style={{ height: '40vh', width: '72vw',  }}>
                <div style={{ fontSize: '25px', cursor: 'pointer' }}
                    class='position-absolute top-0 end-0 m-3'
                >
                    <i onClick={() => setEditBuildingPopup(true)} class="bi bi-pencil-square bi-lg m-3"></i>
                    <i onClick={() => setDeleteBuildingPopup(true)} class="bi bi-trash bi-lg  me-3"></i>
                </div>
                <h1 className='ms-3'>{selectedBuilding.name}</h1>
                <h2 className='ms-3 mb-5'> {selectedBuilding.address}</h2>
                <div className='d-flex flex-row justify-content-around'>
                    <button className="btn btn-warning ms-1" style={{width:'25%'}}>  
                        <h1>{selectedBuilding.noFloor}</h1><h2>  tang  </h2>
                    </button>
                    <button className="btn btn-warning ms-2" style={{width:'25%'}}>
                        <h1>{selectedBuilding.noRoom}</h1>  <h2>phong</h2>


                    </button>
                    <button className="btn btn-warning ms-2" style={{width:'25%'}}>
                        <h1>{selectedBuilding.noFloor}</h1> <h2>phong trong</h2>
                    </button>
                </div>

            </div>

            <div class='position-relative shadow p-3 mb-5 bg-body-tertiary  rounded p-3 d-flex flex-column justify-content-center'
                style={{ height: 'auto', width: '72vw' }}>
                <div style={{ fontSize: '25px' }}>
                    <i class="bi bi-pencil-square bi-lg position-absolute top-0 end-0 m-3"></i>
                </div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" class="text-center align-middle">Tang</th>
                            <th colSpan='3' class="text-center align-middle">Phong</th>

                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        {
                            floors.map(i => (
                                <tr key={i}>
                                    <th scope="row" class="text-center align-middle" style={{ width: '10%' }}>{i}</th>
                                    {
                                        rooms.filter((room, index) =>
                                            room.floor === i
                                        ).map((room, index) => (
                                            <td class='text-center align-middle' key={index}
                                                style={!room.isRented ? { backgroundColor: '#e1e1e1' } : {}}
                                            >{room.roomName}</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div> */}