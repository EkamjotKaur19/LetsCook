import React, { useState ,useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from "./Toast";
import { motion } from "framer-motion";
import { pricingAnimation} from "../animation"
import { useScroll } from "./useScroll"

const Contact = ({darkMode}) => {
  const [element, controls] = useScroll();
  const [showToast, setShowToast] = useState(false);
  const form = useRef();

  const handleSend = () =>{
    setShowToast(true);
  }

  const handleToastClose = () => {
    setShowToast(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_5ds5atj",
        "template_tk8gjll",
        form.current,
        "27JceM2gG75iJkfXc"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
    <div id="contact" className="containerc" ref={element} >
    <motion.div className="home"
      variants={pricingAnimation}
      transition={{ delay: 0.3, duration: 0.6, type: "tween" }}
      animate={controls}
      >

    
        <div className="cont-head">
            <h2>Have a Feedback or a Question?</h2>
            <h1>Contact Us</h1>
            </div>
      <div className="contact-parent">
        <div className="contact-child child1">
            
        </div>
        <div className="contact-child child2">
            <div className={!darkMode?"contact-form" :"contact-form-dark"}>
      <form ref={form} onSubmit={sendEmail} className='form2' >

      <div className="inside-contact">
            
            <h3>
               <span id="confirm"/>
            </h3>
            <p>Name *</p>
            <input id="txt_name" name="user_name" type="text" Required="required"/>
            <p>Email *</p>
            <input id="txt_email" name="email" type="text" Required="required"/>
            <p>Phone *</p>
            <input id="txt_phone" type="text" Required="required"/>
            
            <label>Message</label>
            <textarea name="message" />
        <input type="submit" value="Send" onClick={handleSend} />
         </div>
      </form>
    </div>
        </div>
      </div>
      <Toast
        message="Mail has been sent!"
        showToast={showToast}
        onClose={handleToastClose}
      />
      </motion.div>
    </div>
    
    </>
  );
};

export default Contact;
