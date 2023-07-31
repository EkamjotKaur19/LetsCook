import React, {useState} from 'react';
import './style.css'

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  window.addEventListener("scroll", ()=> {
    window.pageYOffset > 100 ? setVisible(true) : setVisible(false);
  })
  return (
    <div className='stt'>
      <a href="#" className={`${visible ? "block" : "none"}`}>
        <div className='sttt' ><i className="scroll fa-solid fa-arrow-up"></i></div>
      </a>
    </div>
  )
}

export default ScrollToTop