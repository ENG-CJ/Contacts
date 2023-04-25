import React, { useState, useEffect, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { Box, Button, Container, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import styles from './home.module.css'
import { Delete, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";
import ModalComponent from "../../components/Modal";
import { ContactContext } from "../../context/ContactContext";
const ContactList = () => {
  const navigate = useNavigate();

  const {loadUsers,contactData,findContactInfo,responseData,setResponseData,deleteOne}=useContext(ContactContext);
  
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");

  const EditRecord=(id)=>{

    findContactInfo(id);
    setAction("update");
    setOpen(true);
  }
 
  const deleteContact = (id) => {
    Swal.fire({
      title: 'Do you want to Delete this one?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: "No!"
      
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteOne(id);
      
      } else {
       
      }
    })
   
  };

  

  useEffect(() => {
    if (
      sessionStorage.getItem("username") == "" ||
      sessionStorage.getItem("username") == null
    )
      navigate("/");
    else loadUsers();
    // console.log(contactData)
  }, []);

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Paper
          sx={{
            p: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h4>List Of Your Contacts</h4>
          {/* <Link className={styles.create} to={"/Contacts/create"}>Create One</Link> */}
        
          <Button className={styles.create} onClick={()=>{
            setAction("insert");
            setOpen(true)
          }}>Create One</Button>
      
<ModalComponent openMode={open} setOpenMode={setOpen} action={action} setData={setResponseData} data={responseData} />
        </Paper>
     <Paper sx={{mt: 4, p:2}}>
     <Table>
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
        </TableHead>

        <TableBody>
        {contactData &&
            contactData.map((v) => {
              return (
                <TableRow key={v.response["ID"]}>
                  <TableCell>{v.response["ID"]}</TableCell>
                  <TableCell>{v.response["FullName"]}</TableCell>
                  <TableCell>{v.response["Mobile"]}</TableCell>
                  <TableCell>{v.response["Address"]}</TableCell>
                  <TableCell>
                  <IconButton onClick={()=>EditRecord(v.response['ID'])}>
                  <Edit/>
                    {/* <Link to={"/Contacts/Edit/" + v.response["ID"]}>
                      
                        <Edit/>
                       
                    </Link> */}
                    </IconButton>
                
                    <IconButton
                      style={{ marginLeft: 9 }}
                      onClick={() => deleteContact(v.response["ID"])}
                    >
                      <Delete/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
      
        </TableBody>
     </Table>

     
     </Paper>
     <Button onClick={()=>navigate("/")} sx={{mt:3}} variant="contained" color="error">
    Logout
 </Button>
      </Container>
    </>
  );
};

export default ContactList;
