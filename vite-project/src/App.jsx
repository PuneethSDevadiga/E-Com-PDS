import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import PrivateRoute from './Components/PrivateRoute';
import Signup from './Pages/Signup';
// import Checkout from './Pages/Checkout';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/home" element={ <PrivateRoute>
          <Home />
        </PrivateRoute>}/>

        <Route path="/product/:id" element={<PrivateRoute>
          <Product  />
        </PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute>
          <Cart />
        </PrivateRoute>}/>

        {/* <Route path="/checkout" element={<PrivateRoute>
          <Checkout />
        </PrivateRoute>} /> */}
      </Routes>
    </Router>
    </>
  )
}

export default App



