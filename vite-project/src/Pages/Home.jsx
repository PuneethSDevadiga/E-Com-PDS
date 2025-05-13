import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const api = await axios.get("https://fakestoreapi.com/products");
        setProducts(api.data);
        setSearchResults(api.data);
      } catch (error) {
        console.error("error in fetching", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter((data) =>
      data.title.toLowerCase().includes(searchProducts.toLowerCase())
    );
    setSearchResults(filteredProducts);
  }, [products, searchProducts]);
  return (
    <>
      <Navbar
        searchProducts={searchProducts}
        setSearchProducts={setSearchProducts}
      />
      <div className="home">
        <div className="align-card">
          {searchResults.map((data) => (
            <div key={data.id} className="product-card">
              <h4>{data.title}</h4>
              <Link to={`/product/${data.id}`}>
                <img src={data.image} alt={data.title} />
              </Link>
              <p>Sale Price:${data.price}</p>

              <br />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};


export default Home;
