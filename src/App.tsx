
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/registration';
import LoginForm from './components/loginForm';
import Home from './components/home';
import AdminDashoard from './components/adminDashboard';
import JewelleriesProducts from './components/Jewelleries';
import Checkout from './components/Checkout';
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
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/orders" element={<Orders />} />   */}
      </Routes>
    </Router>
  )
}

export default App
