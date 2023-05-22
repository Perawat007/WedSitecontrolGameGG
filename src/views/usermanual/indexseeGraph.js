import React from 'react'
import { Card, Button } from 'components/ui'
import { HiCheckCircle } from 'react-icons/hi'
const HeaderGraph = () => {

    return (
        <div>
             <h3>คู่มือการใช้งาน</h3>
             <br/>
            <Card
                header="อธิบายกราฟต่างๆ"
            >   
            <br/>
                <h4>เลือกเมนู Dashboard</h4>
                <br/>
                <h4>ตามรูปด้านล่างคือ จำนวนคนออนไลน์เกมส์ เพื่อใช้วิเคราะห์ทางการตลาด</h4>
                <p style={{ color: 'white', fontSize: '16px' }}>
                    ตัวเลขล่างกราฟคือ เวลา ตัวเลขขวามือคือ จำนวนคนที่ออนไลน์
                </p>
                <br/>
                <figure>
                <img
                    src={process.env.PUBLIC_URL + '/img/others/06.png'}
                    alt="My_Image"
                />
                <br/>
                </figure>
                <h4>เมนู Reports-- ค่าคอมมิชชั่นรายเดือน</h4>
                <p style={{ color: 'white', fontSize: '16px' }}>
                    ค่าคอมมิชชั่นรายเดือน ล่างเส้น เป็นเดือน ตัวเลขด้านซ้าย เป็นค่าคอมมิชชั่น
                </p>
                <br/>
                <img
                    src={process.env.PUBLIC_URL + '/img/others/07.png'}
                    alt="My_Image"
                />
                <br/>
                <h4>เมนู Reports-- ค่าคอมมิชชั่นรายวัน </h4>
                <p style={{ color: 'white', fontSize: '16px' }}>
                    ค่าคอมมิชชั่นรายวัน ตัวเลขล่างเส้นเป็นเดือน ตัวเลขด้านซ้าย เป็นค่าคอมมิชชั่น กราฟคอมมิชั้นรายวันนั้น จะเป็นการเปรียบเทียบค่าคอมมิชชั่นระหว่าง 2 เดือนที่
                    คือเดือนปัจจุบันและเดือนก่อนหน้า
                </p>
                <br/>
                <img
                    src={process.env.PUBLIC_URL + '/img/others/08.png'}
                    alt="My_Image"
                />
            </Card>
        </div>
    )
}

export default HeaderGraph