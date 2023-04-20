
import styles from './login.module.css'
import { Container, Paper } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate=useNavigate();
    const  [authData, setAuthData] = useState([])
    const [response, setResponse] = useState([{}])
    
    const trackValues=(e)=>{
        setAuthData({
            ...authData,
            [e.target.name]: e.target.value
        })
    }
    const submitData=async ()=>{
       var data={
        action: "login",
        data: authData
       };

       var serverResult=await axios.post("http://localhost/users_active/api/auth.api.php",data);
    //    console.log(serverResult)
      return serverResult;

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        submitData().then((data)=>{
            const {status,valid,response}=data.data;
            if(valid){
                sessionStorage.setItem("id",response.ID);
                sessionStorage.setItem("username",response.username);
                navigate("/contacts")
            }else
             alert("Username or Password is Incorrect")
        });
       
         
    }

    useEffect(()=>{
        sessionStorage.clear();
        // sessionStorage.setItem("username",response.username);
    })

    return ( 
         <Container sx={{mt: 4}}>
              <Paper sx={{p: 3}}>
              <form onSubmit={handleSubmit}>
             <div className={styles.main}>
             <h3>Login Into You Free Account</h3>
             <div className={styles.form_group}>
              <label>Username</label>
                <input onChange={trackValues}  type='text' name="username"/>
              </div>

             <div className={styles.form_group}>
             <label>Password</label>
                <input   onChange={trackValues} type='text' name="password"/>
             </div>
                <input className={styles.login_btn} type='submit' value="Login"/>
             </div>
            </form>
              </Paper>
         </Container>

     );
}

export default Login;

