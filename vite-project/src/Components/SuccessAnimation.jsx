import { useEffect } from 'react';
import './SuccessAnimation.css';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessAnimation = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="success-animation">
      <div className="success-content">
        <FaCheckCircle className="success-icon" />
        <h2>Payment Successful!</h2>
        <p>Your order has been placed successfully.</p>
      </div>
    </div>
  );
};

export default SuccessAnimation; 