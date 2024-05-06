//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import Footer from './components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div id='home'>
        <h1>Welcome to Nyanja's e-commerce, The leading online Platform for global trade</h1>
        <form action="">
          <input id='searchInput' placeholder='What are you looking for ?' type="text" /><FontAwesomeIcon className='icons' icon={faSearch} /><button>Search</button>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default App
