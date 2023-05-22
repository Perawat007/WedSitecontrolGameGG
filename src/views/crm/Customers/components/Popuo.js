import React, {useState } from 'react'
import {Dialog } from 'components/ui'

export default function Popup () {
    console.log('run')
    const [viewOpen, setViewOpen] = useState(true)
    const onDialogClose = () => {
        setViewOpen(false)
    }

    return (
        <>
        <Dialog
                isOpen={viewOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
            <div className="w-full">
                <h1>Log</h1>
            </div>  
        </Dialog>
    </>
    )
}