import { useContext, useEffect } from "react"
import { AppContext } from '../AppContext'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../api';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
export default function Budget() {
    const { plan } = useContext(AppContext);
    console.log(plan);
    const vendors = [
        { vendor: 'Nhiếp Ảnh Gia', icon: 'bi-camera-fill', type: 'photographer' },
        { vendor: 'Tiệc Cưới', icon: 'bi-cake-fill', type: 'wedding_party' },
        { vendor: 'Áo Cưới', icon: 'bi-person-fill', type: 'wedding_dress' },
        { vendor: 'Nhà Tổ Chức', icon: 'bi-building-fill', type: 'organizer' },
        { vendor: 'Bánh Cưới', icon: 'bi-cake-fill', type: 'wedding_cake' },
        { vendor: 'DJ', icon: 'bi-disc-fill', type: 'dj' },
        { vendor: 'Quay Phim', icon: 'bi-film', type: 'videographer' },
        { vendor: 'Đồ Cưới', icon: 'bi-shop-window', type: 'wedding_supplies' },
        { vendor: 'Trang Điểm', icon: 'bi-brush-fill', type: 'makeup' },
        { vendor: 'Hoa Cưới', icon: 'bi-flower1', type: 'florist' },
        { vendor: 'Ban Nhạc', icon: 'bi-music-note-list', type: 'band' },
        { vendor: 'Quay Bar', icon: 'bi-cup-straw', type: 'bartender' },
        { vendor: 'Rước Dâu', icon: 'bi-truck', type: 'wedding_transport' },
        { vendor: 'Thiệp Cưới', icon: 'bi-envelope-fill', type: 'invitation' },
        { vendor: 'Địa điểm', icon: 'bi-building', type: 'venue' }
    ];
    const [vendorsInPlan, setVendorsInPlan] = useState({});
    const { acc } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]; // Màu sắc
    useEffect(() => {
        if (acc && acc._id) {
            api.get(`/vendorItem/getVendorItemGroupedByType/accId/${acc._id}`)
                .then(response => {
                    setVendorsInPlan(response.data);
                })
                .catch(error => console.log(error));
        }
    }, [acc]);

    useEffect(() => {

        const result1 = vendors.filter(vendor => {
            return Object.values(vendorsInPlan).some(planVendor => planVendor.type === vendor.type);
        });
        console.log(result1, plan.budget);
        console.log(vendorsInPlan['venue']);
        let s = 0;
        setResult(result1);
        const data1 = result1.map(vendor => {
            return {
                name: vendor.vendor,
                value: Math.round((vendorsInPlan[vendor.type]?.priceFrom + vendorsInPlan[vendor.type]?.priceTo) / 2 / plan.budget * 100),
            }
        })
        data1.push({ name: "Con lai", value: 100 - data1.reduce((a, b) => a + b.value, 0) })
        setData(data1);
        console.log(data1);
    }, [vendorsInPlan]);
    return (
        <div
            className='d-flex  align-items-center justify-content-around'
            style={{ width: '100vw', maxWidth: '100vw', marginTop: '15vh' }}>


            <div className='budget shadow p-3 mb-5 bg-body-tertiary rounded
            d-flex flex-column align-items-center 
            '
                style={{
                    width: '80vw',
                    backgroundColor: 'white',

                    overflow: 'hidden',
                    transition: 'max-height 1s ease-in-out',
                }}>
                <div className='d-flex  align-items-center justify-content-around'
                style={{width:'100%'}}
                >

                    <div style={{ fontSize: '24px', color: '#ff44cb', textAlign: 'center' }}>
                        Ngân sách dự kiến<br></br>
                        {plan?.budget?.toLocaleString('vi-VN') || 0} đ
                    </div>
                    <div style={{ fontSize: '24px', color: '#ff44cb', textAlign: 'center' }}>
                        Đã sử dụng <br />
                        {plan?.paid?.toLocaleString('vi-VN') || 0} đ
                    </div>
                </div>


                <PieChart width={850} height={450}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={true}
                        outerRadius={150}
                        innerRadius={60}
                        paddingAngle={5}
                        fill="#8884d8"
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={1500}
                        animationEasing="ease-out"
                    >
                        {data.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]}
                                stroke="#fff"
                                strokeWidth={2}
                            />
                        ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value) => `${value}%`}
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            borderRadius: '5px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                        }}
                    />
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        iconSize={10}
                        iconType="circle"
                        wrapperStyle={{
                            paddingLeft: '20px'
                        }}
                    />
                </PieChart>

                {result.map((e, i) => (
                    <div className='d-flex align-items-center gap-3 mb-3' style={{ width: '60%' }}>
                        <div className='d-flex justify-content-center align-items-center rounded'
                            style={{ width: '50px', height: '50px', backgroundColor: 'black' }}
                        >
                            <i className={`${e.icon}`} style={{ color: 'white', fontSize: '30px' }}></i>
                        </div>
                        <div>
                            <div className='fw-bold'>{vendorsInPlan[e.type].name}</div>
                            <div>{vendorsInPlan[e.type].priceFrom.toLocaleString('vi-VN')}đ - {vendorsInPlan[e.type].priceTo.toLocaleString('vi-VN')}đ</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}