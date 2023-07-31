import './App.css';
import React, { useEffect, useState } from 'react';

import Nav from './components/Nav';
import About from './components/About';
import Contact from './components/Contact';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Saved from './components/Saved';
import Register from './components/Register';
import Reset from './components/Reset';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {

  return (
    <motion.div initial="hidden" animate="show">
    <div className="App contents">
      <ToastContainer />
      <Router>
        <div className="app">
        <Nav />
        
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/about' exact element={<About />} />
          <Route path='/contact' exact element={<Contact />} />
          <Route path='/register' exact element={<Register />} />
          <Route path='/savedpage' exact element={<Saved />} />
          <Route path='/reset' exact element={<Reset />} />
        </Routes>
        <ScrollToTop />
        </div>
      </Router>
      
    </div>
    </motion.div>
  );
}

export default App;
