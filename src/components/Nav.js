import { ReactComponent as Brand } from '../assets/logoipsum-226.svg'
import img from '../assets/log.svg'
import { useState } from 'react'
import {Link} from 'react-scroll';
import { logout, db, auth} from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, NavLink } from "react-router-dom";
import Saved from './Saved';
import { motion } from "framer-motion";
import { navAnimation } from "../animation"

const Nav = () => {
    const [showNavbar, setShowNavbar] = useState(false)
    const [user] = useAuthState(auth);
    const [save, setSave] = useState(false)
    const navigate = useNavigate()
  
    const handleShowNavbar = () => {
      setShowNavbar(!showNavbar)
    }

    const handleLogin = ( )=>{
      navigate('/login')
    }

    const handleSaved = async () => {
      if (user) {
        const userId = user.uid;
        const userRef = doc(db, "users", userId);
    
        try {
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const savedRecipes = userData.wishlist || []; // Get the wishlist array, default to empty array if it doesn't exist
            console.log("Saved recipes:", savedRecipes);
            navigate('/savedpage', { state: { savedRecipes } });
            
            
            
            // Do something with the saved recipes, such as updating the component state
          } else {
            console.log("User document does not exist.");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      } else {
        console.log("User not logged in.");
      }
    };
  
    return (
      <>
      <motion.div className="home"
      variants={navAnimation}
      transition={{ delay: 0.3, duration: 0.6, type: "tween" }}
      >
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <Brand />
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            Menu
          </div>
          <div className={`nav-elements  ${showNavbar && 'active'}`}>
            <ul>
              {user ? 
              <>
            <li onClick={logout} className='navv'>
              Logout
              </li>
              <li onClick={handleSaved} >
               Saved
              </li>
              </> : 
              <li onClick={handleLogin} >Login</li> }
              
              <li>
              <NavLink to="/" className='navv' >Home</NavLink>
              </li>
              <li>
                
              <NavLink to="/about"className='navv' >About</NavLink>
              </li>
              <li>
              <NavLink to="/contact" className='navv' >Contact</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </motion.div>
      </>
    )
  }
  
  export default Nav