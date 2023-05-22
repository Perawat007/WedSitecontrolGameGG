import React from 'react'
import { Card, Button } from 'components/ui'
import { HiCheckCircle } from 'react-icons/hi'
const HeaderFooter = () => {

    return (
        <div>
             <h3>คู่มือการใช้งาน</h3>
             <br/>
            <Card
                header="วิธีการเพิ่มMember"
            >
                <br/>
                <h3>ท่านสามารถทำการเพิ่ม Member ได้ตามขั้นตอนดังนี้</h3>
                
                <br/>
                <h4>เลือกเมนู Customers และเลือก Member ของฉัน</h4>
                <p style={{ color: 'white', fontSize: '16px' }}>
                    ที่มุมขวา จะมีปุ่ม Add Member ให้กดปุ่ม Add member ดังภาพ
                </p>
                <figure>
                <br/>
                <img
                    src={process.env.PUBLIC_URL + '/img/others/03.png'}
                    alt="My_Image"
                />
                <br/>
                <br/>
                <figcaption style={{ color: 'white', fontSize: '16px'}}>
                    จากนั้น จะมีหน้าต่างให้กรอกข้อมูลสมาชิกใหม่ขึ้นมา ให้กรอกข้อมูลต่างๆ ดังภาพ
                </figcaption>
                </figure>
                <br/>
                <img
                    src={process.env.PUBLIC_URL + '/img/others/04.png'}
                    alt="My_Image"
                />
                <br/>
                <h4>จากนั้นกด Save </h4>
                <p style={{ color: 'white', fontSize: '16px' }}>
                    จากนั้นจะมีรายชื่อข้อมูลสมาชิกเข้าสู่ระบบ
                </p>
                <br/>
                <img
                    src={process.env.PUBLIC_URL + '/img/others/05.png'}
                    alt="My_Image"
                />
            </Card>
        </div>
    )
}

export default HeaderFooter