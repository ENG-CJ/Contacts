import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { Box, Button, Container, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import styles from './home.module.css'
import { Delete, Edit } from "@mui/icons-material";
const ContactList = () => {
  const navigate = useNavigate();

  const [contactData, setContactData] = useState([]);

  const deleteContact = async (id) => {
    var data = {
      action: "deleteContact",
      id: id,
    };

    var result = await axios.post(
      "http://localhost/users_active/api/users.api.php",
      data
    );
    console.log(result.data);
    loadUsers();
  };

  const loadUsers = async () => {
    var data = {
      action: "readData",
    };

    var result = await axios.post(
      "http://localhost/users_active/api/users.api.php",
      data
    );

    setContactData(result.data);
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
          <Link className={styles.create} to={"/Contacts/create"}>Create One</Link>

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
                  <IconButton>
                    <Link to={"/Contacts/Edit/" + v.response["ID"]}>
                      
                        <Edit/>
                       
                    </Link>
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
