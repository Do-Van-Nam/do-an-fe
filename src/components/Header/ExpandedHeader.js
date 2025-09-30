import React, { useContext, useEffect, useState, useRef } from 'react';
import { AppContext } from '../../AppContext';
import axios from 'axios'
import api from '../../api'
import { useNavigate } from 'react-router-dom'
import BuildingPopup from '../BuildingPopup';
import Cookies from 'js-cookie'
import style from './Header.module.css'
import { Link } from 'react-router-dom';

export default function ExpandedHeader({ category }) {

    const categoryItems = category.categoryItems

    return (

        <div

            className={` d-flex flex-column `}
            style={{
                backgroundColor: 'white',

                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                paddingLeft: '8vw'
            }}>
            <h3 className='mt-2' style={{ color: '#333', fontWeight: 'bold', cursor: 'pointer' }}>{category.categoryName}<i className="bi bi-arrow-right"></i></h3>
            <div className='d-flex'>
                {
                    categoryItems.map((e, i) => (

                        <div className='category-container d-flex flex-column me-2 border-end border-black p-2 mb-1'>
                            {
                                e.map((e1, i) => (
                                    <Link to={e1.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className={style.hoverUnderline} style={{ cursor: 'pointer' }}>
                                            {e1.categoryItemName}
                                        </div>
                                    </Link>

                                ))
                            }

                        </div>
                    ))
                }

            </div>
        </div>



    );
}
