// import img2 from '../assets/vite.svg'
// import './Footer.css'
// const Footer = () => {
//   return (
//     <>
//         <div className="container-footer">
//             <div className="logo">
//                 <img src={img2} alt='logo'/>
//             </div>
//             <div className="links">
//                 <ul>
//                     <li><a href='#'>About</a></li>
//                     <li><a href='#'>Contact</a></li>

//                 </ul>
//             </div>
//             <div className="socials">
//                 <ul>
//                     <li><a href='#'>Facebook</a></li>
//                     <li><a href='#'>Instagram</a></li>
//                     <li><a href='#'>Twitter</a></li>
//                 </ul>
//             </div>
            
//         </div>
//     </>
//   )
// }

// export default Footer

import './Footer.css';
import { FaShop } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="container-footer">
      <div className="footer-logo">
        <FaShop size={40} className="footer-icon" />
        <span className="footer-title">PDS Store</span>
      </div>

      <div className="links">
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>

      <div className="socials">
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Twitter</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
