import React from 'react';
import style from './Sidebar.module.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const { pathname } = useLocation()

  const iconsManager = [
    { iconName: 'app', des: 'Tong quan', link: '/manager' },
    { iconName: 'house', des: 'Quan ly phong o', link: '/manager/rooms' },
    { iconName: 'envelope', des: 'Cu dan phan anh', link: '/manager/problems' },
    { iconName: 'bar-chart-line', des: 'Thong ke', link: '/manager/statistics' },
    { iconName: 'gear', des: 'Cai dat', link: '/manager/setting' },
  ]
  const iconsTenant = [
    { iconName: 'app', des: 'Phong o', link: '' },
    { iconName: 'envelope', des: 'Phan anh', link: '' },
    { iconName: 'bar-chart-line', des: 'Thong ke', link: '' },
    { iconName: 'gear', des: 'Cai dat', link: '' },
  ]
  const [icons, setIcons] = useState([])
  useEffect(() => {
    if (pathname.includes('manager')) {
      setIcons(iconsManager)
    } else {
      setIcons(iconsTenant)
    }

  }, [pathname])

  const [selectedIcon, setSelectedIcon] = useState('')

  useEffect(() => {
    let matchingIcons = icons.filter((icon) => pathname.includes(icon.link))
    if (matchingIcons.length>0) setSelectedIcon(matchingIcons[matchingIcons.length-1].iconName)

  }, [pathname, icons]);

  return (

    <div className={`${style.sidebar} fixed-top d-flex flex_column align-items-start justify-content-start  navbar shadow p-2  bg-body-tertiary rounded `} >
      <ul class='nav d-flex flex_column align-items-start justify-content-start'>
        {


          icons.map((icon) => (
            <li className={style.nav_item} key={icon.iconName}
              onClick={() => setSelectedIcon(icon.iconName)}>
              <Link to={icon.link} style={{ textDecoration: 'none' }}>
                <a className={style.nav_link}>
                  <i class={`bi bi-${icon.iconName} ${selectedIcon === icon.iconName ? `${style.selected}` : ''}`}></i>
                  <span className={style.nav_text} >{icon.des} </span>
                </a></Link>
            </li>

          ))}


        <li className={style.nav_item}>
          <a className={style.nav_link} href='#'>
            <i class="bi bi-box-arrow-left"></i>
            <span className={style.nav_text}>Dang xuat</span>
          </a>
        </li>
      </ul>
    </div>

  );
}




