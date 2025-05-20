import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { BsFillBagCheckFill } from "react-icons/bs";

import './CompletedOrdersPage.css';

const CompletedOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.get('/orders');
      
      if (!response.data || !Array.isArray(response.data.orders)) {
        throw new Error('Invalid response format');
      }
      
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setError('Failed to load orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRetry = () => {
    fetchOrders();
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="completed-orders-page">
          <h1>Order History</h1>
          <div className="loading">
            <p>Loading your orders...</p>
            <div className="loading-spinner"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="completed-orders-page">
          <h1>Order History</h1>
          <div className="error">
            <p>{error}</p>
            <button onClick={handleRetry} className="retry-button">
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="completed-orders-page">
        <h1>Order History</h1>
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
            <button onClick={() => navigate('/home')} className="continue-shopping">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3>Order Completed   <BsFillBagCheckFill /></h3>
                  <span className="order-date">
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-footer">
                  <div className="order-total">
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="order-status">
                    <span className="status-badge">Completed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CompletedOrdersPage; 