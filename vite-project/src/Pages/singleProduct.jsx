import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SingleProduct.css';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="single-product-container">
      <img src={product.image} alt={product.title} className="single-product-image" />
      <div className="single-product-details">
        <h2>{product.title}</h2>
        <p className="price">₹{product.price}</p>
        <p className="description">{product.description}</p>
        <p className="category"><strong>Category:</strong> {product.category}</p>
      </div>
    </div>
  );
};

export default SingleProduct;
