
import { CircularProgress } from '@mui/material'
import React from 'react'

export default function Loading() {
    const styles={
        display: "flex",
        alignItems: "center",
        span: {
            fontSize: "23px",
            fontWeight: "bolder",
            color: "#D14D72",
            marginLeft: "18px"
        }
    }
  return (

    <div style={styles}>

        <CircularProgress/>
        <span style={styles.span}>Fetching Data From The Server. Please wait....</span>
    </div>
  )
}
