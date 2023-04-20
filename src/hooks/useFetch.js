


import React, { useState, useEffect } from 'react';
import $ from 'jquery';
const useFetch = () => {
    
    const [contactData, setContactData] = useState(null);

    useEffect(()=>{
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "http://localhost/ContactsAPI/API/Contacts.api.php",
            data: {
                action: "readData"
            },
            success: (response)=>{
                    setContactData(response);
            },
            error: ()=>{}
        })
    },[contactData])

    return [contactData,setContactData]

}

export default useFetch;