

import { Button, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Footer =  () => {
    const navigate=useNavigate();
    return (

        <Container >
            <Button onClick={()=>navigate("/")} sx={{mt:3}} variant="contained" color="error">
    Logout
 </Button>
        </Container>
     );
}

export default Footer;