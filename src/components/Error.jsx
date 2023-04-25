


import { Alert } from '@mui/material'
import React from 'react'

export default function Error({id}) {
  return (
    <div>
        <Alert severity='error'><strong>This ID - [ {id} ] is not exits in the database </strong></Alert>
    </div>
  )
}
