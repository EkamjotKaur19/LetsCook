import React from 'react'
import img from '../assets/a2.jpg'
import { motion } from "framer-motion";
import { blogsAnimation } from "../animation"
import { useScroll } from "./useScroll"

export default function About() {
  const [element, controls] = useScroll();
  return <div id="about" className='main-abt' ref={element} >
    <motion.div className="home"
      variants={blogsAnimation}
      animate={controls}
      transition={{ delay: 0.3, duration: 0.6, type: "tween" }}
      >
    
        <div className="parents-abt">
        
            <div className="child title-abt">
                <h3 className='hero-title'><strong className='sp-text'>About Us</strong></h3>

                <p className='abt-text' >Welcome to our recipe search website! We are passionate about food and dedicated to providing a wide range of delicious recipes from various cuisines. Whether you are a cooking enthusiast or simply looking for inspiration for your next meal, you've come to the right place.

</p>
<p className='abt-text'>
At our website, you'll find an extensive collection of mouth-watering recipes that cater to different tastes and dietary preferences. From quick and easy weeknight meals to elaborate dishes for special occasions, we have something for everyone..
</p>
<p className='abt-text'>We strive to provide accurate and detailed recipe instructions, along with helpful tips and suggestions to enhance your cooking experience. Whether you're a seasoned chef or a beginner in the kitchen, our goal is to inspire and empower you to create delicious meals that will delight your taste buds.
</p>

            </div>
            <div className="child">
                <img src={img} alt='' className='img-banner'/>
            </div>
            
        </div>
    
    </motion.div>
    </div>
  
}
