

import { Close } from '@mui/icons-material'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React,{useContext, useState}from 'react'
import { ContactContext } from '../context/ContactContext';
import styles from '../pages/Contacts/contacts.module.css'

export default function ModalComponent(props) {
    const [dataContact, setDataContact] = useState({});
    const {saveContact,loadUsers,updateContactData,close}=useContext(ContactContext);
// edit changes values
const ChangeValue = (e) => {
    props.setData({
      ...props.data,
      [e.target.name]: e.target.value,
    });
  };
    
  const handleEdit = (e) => {
    e.preventDefault();
    console.log(props.data)
    updateContactData(props.data);
    loadUsers();
    setTimeout(() => {
        props.setOpenMode(close);
    }, 500);
   
  };
    const onChangeValue = (e) => {
        setDataContact({
          ...dataContact,
          [e.target.name]: e.target.value,
        });
      };
      const handleSave = (e) => {
        e.preventDefault();
        saveContact(dataContact);
        loadUsers();
        setTimeout(() => {
            props.setOpenMode(close);
        }, 500);
      };
  return (
    <>
    {
        props.action=="insert"?
        <Dialog open={props.openMode}>
        <DialogTitle>Create Contact</DialogTitle>
        <DialogContent>
        <form onSubmit={handleSave}>
             <div className={styles.main}>
         
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
        </DialogContent>
        <DialogActions>
        <IconButton onClick={()=>props.setOpenMode(false)}>
        <Close/>
        </IconButton>
            
        </DialogActions>
    </Dialog>
    :props.data?
    <Dialog open={props.openMode}>
        <DialogTitle>Update Contact</DialogTitle>
        <DialogContent>
        <form onSubmit={handleEdit}>
             <div className={styles.main}>
         
             <div className={styles.form_group}>
             <label>FullName</label>
        <input onChange={ChangeValue} value={props.data.FullName} type="text" name="FullName" />
              </div>

             <div className={styles.form_group}>
             <label>address</label>
        <input onChange={ChangeValue} value={props.data.Address} type="text" name="Address" />
             </div>
             <div className={styles.form_group}>
             <label>Mobile</label>
        <input onChange={ChangeValue} value={props.data.Mobile} type="number" name="Mobile" />
             </div>
                <input className={styles.login_btn} type='submit' value="Edit"/>
             </div>
            </form>
        </DialogContent>
        <DialogActions>
        <IconButton onClick={()=>props.setOpenMode(false)}>
        <Close/>
        </IconButton>
            
        </DialogActions>
    </Dialog>
    :"No Data"
    }

    </>
   
  )
}
