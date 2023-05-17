import { useState , useLayoutEffect, useRef, useEffect} from 'react'
// Import all of Bootstrap's CSS
import './App.scss'
// Import our custom CSS
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
// import { SignUp } from './pages/signup/components/SignUp';
// import { Copyright } from './copyright/components/Copyright';



// import { SignIn } from './pages/signin/components/SignIn';
// import { UserInfo } from './userinfo/components/UserInfo';
// import { Admin } from './pages/admin/components/Admin';
// import { Footer } from './footer/components/Footer';

function App() {
  const urls = [
    '/',
    '/inscrire',
    '/connecter',
    '/admin',
    '/sponsor',
    '/media',
    '/contact'
  ]

  
  const [user, setUser] = useState(null)

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     const uid = user.uid;
  //     setUser(user)
  //   } else {
  //     setUser(null)
  //   }
  // });

  return (<>

    <NavBar urls={urls} user={user} ></NavBar>
{/* 
{ user && 
   <UserInfo user={user}></UserInfo>

    } */}
    <Routes>
      
<Route path={urls[0]} element={<Home urls={urls}></Home>}></Route>
{/* <Route path={urls[1]} element={<SignUp></SignUp>}></Route>
<Route path={urls[2]} element={<SignIn></SignIn>}></Route>
<Route path={urls[3]} element={<Admin user={user} ></Admin>}></Route> */}
   
   
    </Routes>
   



  </>
 
  )
}

export default App