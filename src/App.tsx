//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/registration';
import LoginForm from './components/loginForm';
import Home from './components/home';
import AdminDashoard from './components/adminDashboard';
import JewelleriesProducts from './components/Jewelleries';
// import Cart from './components/Cart';
// import Orders from './components/Orders';
function App() {
  //const [count, setCount] = useState(0)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/adminDashboard" element={<AdminDashoard />} />
        <Route path="/jewelleries" element={<JewelleriesProducts />} />
        {/* <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />  */}
      </Routes>
    </Router>
  )
}

export default App
