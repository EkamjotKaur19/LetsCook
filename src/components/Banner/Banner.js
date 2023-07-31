import React from 'react'
import img from '../../assets/b2.webp'
import '../Banner/banner.css'
import { motion } from "framer-motion";
import { homeAnimation } from '../../animation';
import { useScroll } from "../useScroll"

export default function Banner() {
  const [element, controls] = useScroll();
  return (
    
    <div id="main" className='main' ref={element} >
      <motion.div className="home"
      variants={homeAnimation}
      animate={controls}
      transition={{ delay: 0.3, duration: 0.6, type: "tween" }}
      >
      
        <div className="parents">
            <div className="child title">
                <h3 className='hero-title'>Unleash your<strong className='sp-text'>Culinary</strong>  Creativity with <br /><strong className='sp-text'>Let's Cook !!!</strong></h3>

                <p className='hero-title2'>Search for a Recipe below</p>
                
            </div>
            <div className="child">
                <img src={img} alt='' className='img-banner'/>
            </div>
        </div>
      
        </motion.div>
    </div>
    
  )
}
