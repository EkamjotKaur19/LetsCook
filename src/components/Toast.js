import React, { useState, useEffect } from 'react';

const Toast = ({ message, showToast, onClose }) => {
  const [isVisible, setIsVisible] = useState(showToast);

  useEffect(() => {
    setIsVisible(showToast);
  }, [showToast]);

  useEffect(() => {
    let timeout;
    if (isVisible) {
      // Automatically close the toast after 3 seconds
      timeout = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isVisible, onClose]);

  return (
    <div className={`toast ${isVisible ? 'show' : 'hide'}`}>
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;
