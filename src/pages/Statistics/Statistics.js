import React, { useState } from 'react'
import axios from 'axios'
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header'
// import RoomPopup from '../../components/RoomPopup'
import style from './statistics.module.css'


export default function Problems() {


  return (
    <div class="d-flex flex-column justify-content-evenly align-items-center" style={{ height: '100vh', width: '100vw' }}>
      {/* <Header /> */}
      {/* <Sidebar /> */}
      <div class='position-relative shadow p-4  bg-body-tertiary  rounded p-3 d-flex flex-column ' style={{ width: '40vw' }}>
        <p>Tong so phong: 30</p>
        <p>So phong duoc thue: 20</p>
        <p>So phong trong: 10</p>
        <p>Ti le lap day: 66%</p>
      </div>
      <div class='position-relative shadow p-3 bg-body-tertiary  rounded p-3 d-flex flex-column ' style={{ width: '80vw' }}>
        <table class="table table-bordered mt-5">
          <thead>
            <tr>
              <th scope="col" class="text-center align-middle " style={{ width: '5%' }}>STT</th>
              <th scope="col" class="text-center align-middle " >Nguoi gui</th>
              <th scope="col" class="text-center align-middle " style={{ width: '5%' }}>Phong</th>
              <th scope="col" class="text-center align-middle ">Noi dung</th>
              <th scope="col" class="text-center align-middle d-flex justify-content-center align-items-center" >Trang thai

              </th>
              <th scope="col" class="text-center align-middle " >Ngay gui</th>
              <th scope="col" class="text-center align-middle " >Ngay hoan tat</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">



          </tbody>
        </table>
      </div>
    </div>

  )
}
