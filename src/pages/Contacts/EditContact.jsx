import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { Container, Paper } from "@mui/material";
import styles from "./contacts.module.css";
const EditContact = () => {
  const { id } = useParams();
  const [responseData, setResponseData] = useState([]);
const navigate=useNavigate();
  const [loading, setLoading] = useState(false);

  const updateContactData = async () => {
    var data = {
      action: "updateContact",
      data: responseData,
      targetID: id,
    };

    var result = await axios.post(
      "http://localhost/users_active/api/users.api.php",
      data
    );
    alert(result.data.message);
    navigate("/contacts")
  };

  const ChangeValue = (e) => {
    setResponseData({
      ...responseData,
      [e.target.name]: e.target.value,
    });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    updateContactData();
    
  };
  const findContactInfo = async () => {
    var data = {
      action: "findContact",
      id: id,
    };

    var result = await axios.post(
      "http://localhost/users_active/api/users.api.php",
      data
    );
    
    setResponseData(result.data.response);
  };

  useEffect(() => {
    findContactInfo();
    console.log("b4 ax:", responseData);
  }, []);

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleEdit}>
            <div className={styles.main}>
              <h3>Create Contact User </h3>
              <div className={styles.form_group}>
                <label>FullName</label>
                <input
                  type="text"
                  onChange={ChangeValue}
                  defaultValue={""}
                  value={responseData.FullName}
                  name="FullName"
                />
              </div>

              <div className={styles.form_group}>
              <label>address</label>
        <input
          type="text"
          onChange={ChangeValue}
          value={responseData.Address}
          name="Address"
        />
              </div>
              <div className={styles.form_group}>
              <label>Mobile</label>
        <input
          type="number"
          onChange={ChangeValue}
          value={responseData.Mobile}
          name="Mobile"
        />
              </div>
              <input
                className={styles.login_btn}
                type="submit"
                value="Edit"
              />
            </div>
          </form>
        </Paper>
      </Container>

    
    </>
  );
};

export default EditContact;
