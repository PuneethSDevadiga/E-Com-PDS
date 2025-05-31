import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Product.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axiosInstance from '../api/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const productData = {
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        quantity: parseInt(quantity, 10)
      };

      await axiosInstance.post('/cart', productData);
      toast.success(`${product.title} added to cart!`, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (err) {
      console.error('Could not add to cart:', err);
      toast.error('Could not add to cart', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'colored',
      });
    }
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <>
      <Navbar/>
      <ToastContainer />
      <div className="product-detail">
        <img src={product.image} alt={product.title} className="product-image" style={{ width: '400px', height: '400px' }} />
        <div className="product-info">
          <h1>{product.title}</h1>
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
          <div className="quantity-section">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <button onClick={handleAddToCart} className='add-to-cart'>Add to Cart</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
