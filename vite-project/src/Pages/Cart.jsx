import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import axiosInstance from '../api/axiosInstance';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { FcInTransit } from "react-icons/fc";
import PaymentForm from '../Components/PaymentForm';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get('/cart');
      setCartItems(res.data.cart);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  const updateQuantity = async (itemId, action) => {
    const item = cartItems.find((i) => i.id === itemId);
    const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
    if (newQty <= 0) return removeFromCart(itemId);

    try {
      await axiosInstance.put(`/cart/${itemId}`, { quantity: newQty });
      fetchCart();
    } catch (err) {
      console.error('Update quantity failed:', err);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axiosInstance.delete(`/cart/${itemId}`);
      fetchCart();
    } catch (err) {
      console.error('Remove from cart failed:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePaymentComplete = async () => {
    try {
      // Create the order first
      const orderData = {
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total: totalPrice,
        date: new Date().toISOString()
      };

      // Create order
      const orderResponse = await axiosInstance.post('/orders', orderData);
      
      if (!orderResponse.data) {
        throw new Error('Failed to create order');
      }

      // Clear the cart after successful order creation
      await axiosInstance.delete('/cart/clear');
      
      // Update local state and close all modals
      setCartItems([]);
      setShowPayment(false);
      setShowCheckout(false);

      // Navigate to completed orders page with replace to prevent going back to cart
      navigate('/orders', { replace: true });
      
    } catch (err) {
      console.error('Payment processing failed:', err);
      alert('Failed to process payment. Please try again.');
    }
  };

  // Cleanup function to close modals when component unmounts
  useEffect(() => {
    return () => {
      setShowPayment(false);
      setShowCheckout(false);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="cart">
        <div className="container-cart">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>No items in cart</p>
            </div>
          ) : (
            <>
              <h1>Cart Items</h1>
              <div className="align-cart">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <h1>{item.name}</h1>
                    <img src={item.image} alt={item.name} />
                    <p>Price: ${item.price}</p>
                    <div className="addsubsection">
                      <button onClick={() => updateQuantity(item.id, 'decrease')} className='addsub'>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 'increase')} className='addsub'>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className='remove'>Remove</button>
                  </div>
                ))}
              </div>
              <h2>Grand Total: ${totalPrice.toFixed(2)}</h2>
              <button className="checkout-btn" onClick={() => setShowCheckout(true)}>Proceed to Checkout</button>
            </>
          )}
        </div>

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="checkout-modal-overlay">
            <div className="checkout-modal">
              <button className="close-modal" onClick={() => setShowCheckout(false)}>X</button>
              <div className="head">
                <h2>Checkout Summary</h2>
                <FcInTransit style={{ width: '40px', height: '40px' }}/>
              </div>
              
              <ul className="checkout-items">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <h3>Grand Total: ${totalPrice.toFixed(2)}</h3>
              <button className="pay-now" onClick={() => {
                setShowCheckout(false);
                setShowPayment(true);
              }}>Pay Now</button>
            </div>
          </div>
        )}

        {/* Payment Form Modal */}
        {showPayment && (
          <PaymentForm
            cartItems={cartItems}
            totalPrice={totalPrice}
            onClose={() => setShowPayment(false)}
            onPaymentComplete={handlePaymentComplete}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
