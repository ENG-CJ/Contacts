import React from 'react';
import ReactDOM from 'react-dom/client';
import "./main.css"

import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import ContactList from './pages/Home/ContactList';
import AddContact from './pages/Contacts/AddContact';
import EditContact from './pages/Contacts/EditContact';
import Login from './pages/Auth/login';
import Footer from './components/Footer';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
 <>
 
  <BrowserRouter>
    <Routes>
   <Route path='/' element={<Login/>}/>
   <Route path='/Contacts' element={<ContactList/>}/>
   <Route path='/Contacts/create' element={<AddContact/>}/>
   <Route path='/Contacts/Edit/:id' element={<EditContact/>}/>
    </Routes>
    {/* <Footer/> */}
  </BrowserRouter>

 </>
 
);

