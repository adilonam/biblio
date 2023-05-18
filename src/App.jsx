
// Import all of Bootstrap's CSS and custom CSS
import './App.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { NavBar } from './navbar/components/NavBar'
//prime react css
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  //icons
// import { auth } from './firebase';
// import {  onAuthStateChanged } from "firebase/auth";



import { Routes, Route, useNavigate } from 'react-router-dom'
import { Home } from './pages/home/components/Home';
import { Livre } from './pages/livre/components/Livre';





function App() {
  const urls = [
    '/',
    '/livre',
    '/usagers',
    '/emprunts'
   
  ]




  return (<>

    <NavBar urls={urls}  ></NavBar>
    <Routes>
      
<Route path={urls[0]} element={<Home urls={urls}></Home>}></Route>
<Route path={urls[1]} element={<Livre></Livre>}></Route>

   
   
    </Routes>
   



  </>
 
  )
}

export default App