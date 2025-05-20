import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import { BiSolidCart } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import { FaShop } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      await axios.post('http://localhost:5000/logout', { token: refreshToken });
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
    }
};

const Navbar = ({searchProducts,setSearchProducts}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
        <div className="container-navbar">
            <FaShop size={70}/>
            <h1>PDS Store</h1>
            <ul>
                <li><Link to='/home'>HOME</Link></li>
               
                <div className="search" >
                <BsSearch className="search-icon-inside" />
                <input type="text" placeholder="Search for products"  value={searchProducts} onChange={(e) => setSearchProducts(e.target.value)} />
                </div>
                <div className="cart-icon"><Link to='/cart'>Cart <BiSolidCart  size={25}/></Link></div>
                <div className="orders-icon"><Link to='/orders'>Your Orders <MdOutlineShoppingBag size={25}/></Link></div>
                <div className="logOut" onClick={handleLogout}>LOG OUT <TbLogout size={25}/></div>
            </ul>
        </div>
    </div>
  )
}

Navbar.propTypes = {
    searchProducts: PropTypes.string.isRequired,
    setSearchProducts:PropTypes.func.isRequired
}

export default Navbar;  //exporting the component