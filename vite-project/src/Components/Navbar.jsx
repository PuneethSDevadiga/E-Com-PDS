import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import { BiSolidCart } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import { FaShop } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";




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
                <div className="logOut" onClick={logout}>LOG OUT <IoMdLogOut size={25}/></div>
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