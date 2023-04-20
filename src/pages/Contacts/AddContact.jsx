import React, { useState, useEffect } from "react";
import $ from 'jquery';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Paper } from "@mui/material";
import styles from './contacts.module.css'
const AddContact = () => {
  const [dataContact, setDataContact] = useState({});
const navigate=useNavigate();
  const onChangeValue = (e) => {
    setDataContact({
      ...dataContact,
      [e.target.name]: e.target.value,
    });
  };
  const handleSave = (e) => {
    e.preventDefault();
    saveContact(dataContact);
    
  };


  const saveContact= async (values)=>{
    var data={
        action: "saveUser",
        data: values
    }
  
    var result= await axios.post("http://localhost/users_active/api/users.api.php",data)
    alert(result.data.message);
    navigate("/contacts")
}
  return (
    <>
    <ToastContainer theme="colored"/>

    <Container sx={{mt: 4}}>
              <Paper sx={{p: 3}}>
              <form onSubmit={handleSave}>
             <div className={styles.main}>
             <h3>Create Contact User </h3>
             <div className={styles.form_group}>
             <label>FullName</label>
        <input onChange={onChangeValue} type="text" name="name" />
              </div>

             <div className={styles.form_group}>
             <label>address</label>
        <input onChange={onChangeValue} type="text" name="address" />
             </div>
             <div className={styles.form_group}>
             <label>Mobile</label>
        <input onChange={onChangeValue} type="number" name="mobile" />
             </div>
                <input className={styles.login_btn} type='submit' value="Create"/>
             </div>
            </form>
              </Paper>
         </Container>


      {/* <form onSubmit={handleSave}>
        <label>FullName</label>
        <input onChange={onChangeValue} type="text" name="name" />
        <label>address</label>
        <input onChange={onChangeValue} type="text" name="address" />
        <label>Mobile</label>
        <input onChange={onChangeValue} type="number" name="mobile" />
        <input type="submit" value={"Create"} />
      </form> */}
    </>
  );
};

export default AddContact;
