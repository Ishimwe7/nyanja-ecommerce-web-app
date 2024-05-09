//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/registration';
import LoginForm from './components/loginForm';
import Home from './components/home';
import AdminDashoard from './components/adminDashboard';
function App() {
  //const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/adminDashboard" element={<AdminDashoard />} />
      </Routes>
    </Router>
  )
}

export default App
