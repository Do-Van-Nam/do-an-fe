import React, { useContext, useState } from 'react';
import api from '../api';
import { AppContext } from '../AppContext';


export default function BuildingPopup({ type, isVisible, onClose }) {
  const { acc, buildings, setBuildings, selectedBuilding, setSelectedBuilding } = useContext(AppContext)
  const [name, setName] = useState(selectedBuilding.name)
  const [address, setAddress] = useState(selectedBuilding.address)
  const [noFloor, setNoFLoor] = useState(selectedBuilding.noFloor)
  const [noRoom, setNoRoom] = useState(selectedBuilding.noRoom)
  if (!isVisible) return null
  var text
  if (type === 'add') {
    text = 'Them'
  } else {
    text = 'Sua'
  }

  const handleAddBuilding = async () => {
    try {
      api.post('/building', {
        name, ownerId: acc._id, address, noRoom, noFloor
      })
        .then(response => {
          setBuildings([...buildings, response.data.building])
          onClose()
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
    }

  }
  const handleEditBuilding = async () => {
    try {
      const updatedBuilding = {
        name, ownerId: acc._id, address, noRoom, noFloor
      }
      api.put(`/building/${selectedBuilding._id}`, updatedBuilding)
        .then(response => {
          setSelectedBuilding(response.data.updatedBuilding1)
          const updatedBuidings = buildings.map(building => 
            building._id === selectedBuilding._id ? response.data.updatedBuilding1 : building
          )
          setBuildings(updatedBuidings)
          onClose()
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeleteBuilding = async () => {
    try {
      api.delete(`/building/${selectedBuilding._id}`)
        .then(response => {
          const updatedBuidings = buildings.filter(building => 
            building._id !== response.data.deletedBuilding._id 
          )
          setBuildings(updatedBuidings)
          setSelectedBuilding(buildings[0])
          onClose()
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error)
    }

  }
  return (

    <div class='position-fixed top-50 start-50 translate-middle
        shadow p-3 mb-5 bg-body-tertiary  rounded p-3 d-flex  flex-column
        justify-content-around align-items-center flex-wrap'
      style={{ height: '45vh', width: '40vw', zIndex: '999' }}>
      <button className="btn btn-warning position-absolute top-0 start-100 translate-middle rounded-circle"
        onClick={onClose}
      >X</button>
      {type==='delete' ? <><h2>Xac nhan xoa toa nha <br/></h2> 
      <p class='text-danger'>
      Hanh dong nay se xoa tat ca thong tin cu dan va khong the hoan tac 

      </p></>:
      <h2>{text} thong tin toa nha</h2>
      }
      <input type="text" style={{ width: '80%' }} class="form-control mb-3"
        placeholder={type === 'add' ? "Ten toa nha" : selectedBuilding.name} aria-label="Username"
        aria-describedby="basic-addon1" onChange={e => setName(e.target.value)} />
      <input type="text" style={{ width: '80%' }} class="form-control mb-3"
        placeholder={type === 'add' ? "Dia chi" : selectedBuilding.address} aria-label="Address" aria-describedby="basic-addon1" onChange={e => setAddress(e.target.value)} />

      <div class="input-group mb-3" style={{ width: '80%' }}>
        <input type="number" class="form-control" placeholder={type === 'add' ? "So tang" : selectedBuilding.noFloor} aria-label="Username" onChange={e => setNoFLoor(e.target.value)} />
        <span class="input-group-text me-2" >tang</span>
        <input type="number" class="form-control" placeholder={type === 'add' ? "So phong" : selectedBuilding.noRoom} aria-label="Server" onChange={e => setNoRoom(e.target.value)} />
        <span class="input-group-text" >phong</span>

      </div>

      <div class='d-flex justify-content-around'>
        {type === 'add' &&
          <button className="btn btn-warning " onClick={handleAddBuilding}>Them toa nha</button>
        }
{type === 'edit' &&
        <button className="btn btn-warning " onClick={handleEditBuilding}>Sua toa nha</button>
        }
        {type === 'delete' &&
        <>
        <button className="btn btn-warning " style={{width:'10vw'}} onClick={handleDeleteBuilding}>Xoa toa nha</button>
        <button className="btn btn-warning ms-5" style={{width:'10vw'}} onClick={onClose}>Huy bo</button>
        </>
        }
      </div>
    </div>
  )
}
