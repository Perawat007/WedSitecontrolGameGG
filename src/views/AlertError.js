import React from 'react'
import { Alert } from 'components/ui'

const AlertError = (message) => {
    return (
        <div>
            <Alert type="danger" title="Error!" showIcon>
                {message}
            </Alert>
        </div>
    )
}

export default AlertError