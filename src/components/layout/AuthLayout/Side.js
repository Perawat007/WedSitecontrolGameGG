//หน้าLogin pang 
import React, { cloneElement } from 'react'
import Logo from 'components/template/Logo'

const Side = ({ children, content, ...rest }) => {

    const backgroundImage = {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        height: '60vh',
        display: 'flex',
        backdropFilter: 'blur(10px)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3rem',
        border: '5px',
        borderRadius: '20px',
        textAlign: 'center'
        
    };

    return (
        <div className="grid lg:grid-cols-3 h-full">
            <div
                className="bg-no-repeat bg-cover py-6 px-50 flex-col justify-between hidden lg:flex "
                style={{
                    height:"100vh",
                    width: "100vw",
                    backgroundImage: `url('/img/others/bg-wedgame.jfif')`,
                    backgroundSize: "cover",
                    backgroundPosition:"center"
                }}
            >
            </div>
            <div className="col-span-1 flex flex-col justify-center items-center">
                <div style={backgroundImage}>
                <div className="xl:min-w-[150px] px-8">
                    <div className="mb-6 flex items-center gap-4">
                         <Logo mode="dark" />
                    </div>
                    <div className="xl:min-w-[80px] mb-8">{content}</div>  
                    {children ? cloneElement(children, { ...rest }) : null} {/*เกี่ยวกับ Login*/}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Side
