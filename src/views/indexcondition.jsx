import React from 'react'
import { Card, Button } from 'components/ui'
import { HiCheckCircle } from 'react-icons/hi'

const ConditionAgent = () => {
    return (
        <div>
             <h3>เงื่อนไขและข้อตกลง</h3>
             <br/>
            <Card
                header="เงื่อนไขและข้อตกลงของ AGENT"
            >
                <div className="bg-gray-50 dark:bg-red-600 border-0">
                <p style={{ color: 'white', fontSize: '20px'}}>
                กรุณาอ่าน และทำความเข้าใจ!!!
                </p>
                <p style={{ color: 'white', fontSize: '16px' }}>
                ทางเราจะไม่รับผิดชอบหากท่านทำการเติมเครดิตผิดพลาดจากตัวของท่านเอง - กรุณาตรวจเช็คเลขบัญชีในการโอน ก่อนทำการโอนทุกครั้ง***
                เนื่องด้วยหากเว็บมีการเปลี่ยนแปลงบัญชีในการโอน ทางเราไม่แนะนำให้ท่านบันทึกเลขบัญชีเป็น ทางลัดหลัก ในการโอนเติมเครดิตของท่าน
                </p>
                </div>
                <br/>
                <h3>ท่านสามารถทำการเพิ่มเครดิตให้ลูกค้า ได้ตามขั้นตอนดังนี้</h3>
                <p style={{ color: 'white', fontSize: '16px' }}>
                กรุณาทำการโอนเงินมายัง บัญชีที่ให้ไว้ทางด้านบน หลังจากนั้นให้เลือก หมวดหมู่ 'Agent Cash' ประเภท 'แจ้งเติม Agent Cash' 
                โดยเอเจ้นต้องทำการแจ้งยอดเงินที่ท่านโอนเงินมายังบัญชีของระบบ รวมถึงแนบรูปสลิปโอนเงิน เพื่อเป็นหลักฐานในการโอนเงินด้วย
                </p>
                <p style={{ color: 'red', fontSize: '18px'}}>
                ** หากเอเจ้นไม่ทำการแนบสลิปการโอนเงินมาด้วย ทางเราจะไม่สามารถเพิ่มเครดิตให้ท่านได้ **
                </p>
                <figure>
                <img
                    src={process.env.PUBLIC_URL + '/img/others/01_5.png'}
                    alt="My_Image"
                />
                <figcaption style={{ color: 'white', fontSize: '16px'}}>
                    จากนั้นกด ส่งเรื่องแจ้งปัญหา และกด ยืนยัน เพื่อนำปัญหานี้เข้าระบบไปให้ทีม Support
                </figcaption>
                </figure>
                <br/>
                <p style={{ color: 'white', fontSize: '16px' }}>
                    เจ้าหน้าที่จะทำการแอดเครดิตให้ท่าน เมื่อได้รับการแจ้งแอดเครดิตของท่านอย่างสมบูรณ์ โดยท่านจะสามารถทำการเช็คเครดิตของท่านได้ที่บริเวณเมนูด้านข้าง ดังภาพ
                </p>
                <br/>
                <h3>เมื่อเอเจ้นได้รับเครดิตเป็นที่เรียบร้อยแล้ว ท่านสามารถทำการเพิ่มเครดิตให้ลูกค้า ได้ตามขั้นตอนดังนี้</h3>
                <br/>
                <h4>เลือกเมนู Customers และเลือก Member ของฉัน</h4>
                <p style={{ color: 'white', fontSize: '16px' }}>
                    ค้นหาลูกค้าของท่านที่ต้องการจะทำการ เพิ่มเครดิตให้ แล้วจากนั้นหน้าข้อมูลลูกค้า กรุณาคลิกที่ปุ่ม 'Icon Edit'
                </p>
                <img
                    src={process.env.PUBLIC_URL + '/img/others/01_5.png'}
                    alt="My_Image"
                />
                <br/>
                <h4>จากนั้นกด Edit </h4>
                <p style={{ color: 'white', fontSize: '16px' }}>
                    เมื่อกดปุ่ม Edit จะมีหน้าต่างแก้ไขข้อูล สามารถแก้ไข Credit ได้เลย
                </p>
                <img
                    src={process.env.PUBLIC_URL + '/img/others/01.png'}
                    alt="My_Image"
                />
                <br/>
                 <h4>กรอก Credit </h4>
                <p style={{ color: 'white', fontSize: '16px' }}>
                    เมื่อกรอก Credit ใหม่เสร็จ ให้กด Save
                </p>
                <img
                    src={process.env.PUBLIC_URL + '/img/others/02.png'}
                    alt="My_Image"
                />
            </Card>
        </div>
    )
}

export default ConditionAgent