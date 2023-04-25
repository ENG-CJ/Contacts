import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export const ContactContext = createContext();

export default  function ContactContextProvider (props){

    const [close, setClose] = useState(true);
    const [contactData, setContactData] = useState([]);
    const [responseData, setResponseData] = useState([]);
    const updateContactData = async (values) => {
        var data = {
          action: "updateContact",
          data: values,
        //   targetID: id,
        };
    
        
        var result = await axios.post(
          // "http://localhost/users_active/api/users.api.php",
          "https://mygallery2023.000webhostapp.com/users_active/api/users.api.php",
          data
        );
        alert(result.data.message);
        loadUsers();
        setClose(false);
        // navigate("/contacts")
      };

      
    const findContactInfo = async (id) => { 
        var data = {
          action: "findContact",
          id: id,
        };
      
        var result = await axios.post(
          // "http://localhost/users_active/api/users.api.php",
          "https://mygallery2023.000webhostapp.com/users_active/api/users.api.php",
          data
        );
        
        setResponseData(result.data.response);
        // setLoading(false);
      };

      const deleteOne=async(id)=>{
        var data = {
          action: "deleteContact",
          id: id,
        };
    
        var result = await axios.post(
          // "http://localhost/users_active/api/users.api.php",
          "https://mygallery2023.000webhostapp.com/users_active/api/users.api.php",
          data
        );
        console.log(result.data);
        Swal.fire("This Record Was Deleted Successfully.", '', 'success')
        loadUsers();
      }

    const saveContact= async (values)=>{
        var data={
            action: "saveUser",
            data: values
        }
      
        var result= await axios.post(
          // "http://localhost/users_active/api/users.api.php",
          "https://mygallery2023.000webhostapp.com/users_active/api/users.api.php",
          data)
        alert(result.data.message);
        loadUsers();
        setClose(false);
        // navigate("/contacts")
    }

    
    const loadUsers = async () => {
        var data = {
          action: "readData",
        };
    
        var result = await axios.post(
          // "http://localhost/users_active/api/users.api.php",
          "https://mygallery2023.000webhostapp.com/users_active/api/users.api.php",
          data
        );
    
        setContactData(result.data);
      };
  return (
    <ContactContext.Provider value={{
        contactData,
        loadUsers,
        saveContact,
        findContactInfo,
        responseData,
        setResponseData,
        updateContactData,
        close,
        deleteOne
    }}>
      {props.children}
    </ContactContext.Provider>
  );
};
