
import { useEffect, useState } from 'react';
 
import { NavLink } from 'react-router-dom';
import "./Home.css"

import logo from './assets/logo.png';

export const Home = (props)=> {
 
 
useEffect(() => {
 


}, [])
  return (
    <>
    <div className="container">
      <h1 className="title">Creer Par ABBADI Adil & MEKAOUI Abdelhak</h1>        
      <img  className="logo" src={logo} alt="simple logo" />
    </div>
    </>

  )
}


