import React from 'react'
import { Card, Button } from 'components/ui'
import { HiCheckCircle } from 'react-icons/hi'

const System_Changelogs= () => {
    return (
        <div>
             <h3>System Changelogs
</h3>
             <br/>
            <Card
                header="ข้อมูล การอัพเดทของระบบ"
            >
                <Card>
                    <p style={{ color: 'white', fontSize: '20px'}}>
                        กรุณาอ่าน และทำความเข้าใจ!!!
                    </p>
                    <p style={{ color: 'white', fontSize: '16px' }}>
                        ขณะนี้เกมส์และเว็บไซต์กำลังปรับปรุง
                    </p>
                </Card>
              
            </Card>
        </div>
    )
}

export default System_Changelogs