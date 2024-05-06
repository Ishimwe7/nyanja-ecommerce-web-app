import '../CSS/header.css'
import logo from '../assets/pictures/e-logo.avif'
import { useState, useRef } from 'react';
//import { Link } from 'react-router-dom';
//import Products from './products_categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faShoePrints, faLaptop, faGem, faTShirt, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
const Header = () => {
    const [showComponent, setShowComponent] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        //setShowComponent(true);
        clearTimeout(timeoutRef.current);
        setShowComponent(true);
    };

    const handleMouseLeave = () => {
        //setShowComponent(false);
        timeoutRef.current = setTimeout(() => {
            setShowComponent(false);
        }, 5000);
    };
    // console.log(showComponent)
    return <div id="header">
        <div id="logo">
            <img src={logo} alt="logo image" />
        </div>
        <ul id="nav-links">
            <li>Home</li>
            <li>About Us</li>
            <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Products</li>
            <li>Contact Us</li>
            <div id='sign'>
                {/* <li id='register'><Link to="/register">Register</Link><FontAwesomeIcon className='icons' icon={faUserPlus} /></li> */}
                <li id='register'>Register<FontAwesomeIcon className='icons' icon={faUserPlus} /></li>
                <li id='login'>Login<FontAwesomeIcon className='icons' icon={faSignInAlt} /></li>
            </div>
        </ul>
        {showComponent &&
            <ul id="products_categories">
                <li><a href=""><FontAwesomeIcon className='icons' icon={faUtensils} /> Food & Beverages</a></li>
                <li><a href=""> <FontAwesomeIcon className='icons' icon={faShoePrints} /> Shoes</a></li>
                <li><a href=""> <FontAwesomeIcon className='icons' icon={faTShirt} /> Clothes</a></li>
                <li><a href=""><FontAwesomeIcon className='icons' icon={faLaptop} /> Electronics</a></li>
                <li><a href=""><FontAwesomeIcon className='icons' icon={faGem} />Jewerillies</a></li>
            </ul>
        }
    </div>
}


// const Products = () => {
//     return <>
//         <ul id="products_categories">
//             <li>Food & Beverages</li>
//             <li>Shoes</li>
//             <li>Clothes</li>
//             <li>Electronics</li>
//             <li>Jewerillies</li>
//         </ul>
//     </>
// }
export default Header;