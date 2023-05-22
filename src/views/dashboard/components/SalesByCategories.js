import React from 'react'
import { Card, Progress } from 'components/ui'

const ProgressInfo = ({ precent }) => {
    return (
        <div>
            <h3 className="font-bold">{precent}  คน</h3>
            <p>จำนวนผู้เล่น</p>
        </div>
    )
}

const SalesByCategories = ({ data = [], className }) => {
    return (
        <Card className={className}>
            <h4>Member</h4>
            <div className="mt-6">
                <Progress
                    variant="circle"
                    percent={50}
                    width={200}
                    className="flex justify-center"
                    strokeWidth={4}
                    customInfo={<ProgressInfo precent={data.dataMember} />}
                />
            </div>
            <div className="text-center mt-6">
                <p className="font-semibold">TITAN</p>
                <h4 className="font-bold">GAME</h4>
            </div>
        </Card>
    )
}

export default SalesByCategories
