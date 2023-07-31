import React from 'react'
import { motion } from "framer-motion";
import { footerTextAnimation } from "../animation"
import { useScroll } from "./useScroll"

export default function Footer() {
  const [element, controls] = useScroll();
  return (
    <>
    <footer id='footer'>
    <div className="foot text-center p-3" ref={element} >
    <motion.div className="home"
      variants={footerTextAnimation}
      transition={{ delay: 0.3, duration: 0.6, type: "tween" }}
      animate={controls}
      >
    
      
      
        <h5 className="follow-head">Follow Us On</h5>
        <ul className="follow">
            <li id="sound">
              <i class="fa-brands fa-instagram"></i>
            </li>

            <li id="copy">
              <i class="fa-brands fa-facebook"></i>
            </li>

            <li id="twitter">
                <i class="fa-brands fa-twitter"></i>
            </li>
        </ul>

        <div className="foot text-center p-3"  >
          © 2023 Copyright : 
          
          <a className="text" href="/" > Let'sCook.com</a>
        </div>
        </motion.div>
      </div>
    </footer>
    
    </>
  )
}
