import '../CSS/header.css'
import logo from '../assets/pictures/e-logo.avif'
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
//import Products from './products_categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import {faShoppingCart,  faClipboardList, faUtensils, faShoePrints, faLaptop, faGem, faTShirt, faSignInAlt, faSignOutAlt,faUserPlus } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
    onSelectCategory: (category: string) => void;
}
const Header = ({ onSelectCategory }: HeaderProps) => {
    const [showComponent, setShowComponent] = useState(false);
    const timeoutRef = useRef(0);

    const handleCategorySelect = (category: string, event: React.MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        onSelectCategory(category);
        console.log(category + " Clicked")
    };

    const logout=(event: React.MouseEvent<HTMLLIElement>)=>{
        event.preventDefault();
        sessionStorage.removeItem('loggedUser');
        location.reload();
    }

    const handleMouseEnter = () => {
        //setShowComponent(true);
        clearTimeout(timeoutRef.current);
        setShowComponent(true);
    };

    const loggedUser = sessionStorage.getItem('loggedUser');

    const handleMouseLeave = () => {
        //setShowComponent(false);
        timeoutRef.current = setTimeout(() => {
            setShowComponent(false);
        }, 5000);
    };
    let user = null;
    if(loggedUser){
        user = JSON.parse(loggedUser);
    }
    // console.log(showComponent)
    return <div id="menu">
        {user && <div id='user-details'><p id='user-names'>You're {user.names}</p></div>}
        <div id='header'>
        <div id="logo">
            <img src={logo} alt="logo image" />
        </div>
        <ul id="nav-links">
            <li onClick={()=>{location.reload()}} className='normal-links'>Home</li>
            <li className='normal-links'>About Us</li>
            <li className='normal-links' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Products</li>
            <li className='normal-links'>Contact Us</li>
            {!loggedUser && <div id='sign'>
                <li id='register'><Link className='links' to="/register">Register</Link><FontAwesomeIcon className='icons' icon={faUserPlus} /></li>
                {/* <li id='register'>Register<FontAwesomeIcon className='icons' icon={faUserPlus} /></li> */}
                <li id='login'><Link className='log-links' to="/login">Login</Link><FontAwesomeIcon className='icons' icon={faSignInAlt} /></li>
            </div>}
            {loggedUser && <>
            <div id='cart-orders'>
            <li id='cart' onClick={(e) => handleCategorySelect('CartComponent', e)}>In Cart<FontAwesomeIcon className='icons' icon={faShoppingCart} /></li>
            {/* <li id='register'>Register<FontAwesomeIcon className='icons' icon={faUserPlus} /></li> */}
            <li id='orders' onClick={(e) => handleCategorySelect('Orders', e)}>My Orders<FontAwesomeIcon className='icons' icon={faClipboardList} /></li>
        </div>
             <div id='sign-out'>
                <li onClick={(event) => logout(event)} id='login'>Logout <FontAwesomeIcon className='icons' icon={faSignOutAlt} /></li>
            </div>
            </>}
        </ul>
        </div>
        {showComponent &&
            <ul id="products_categories">
                <li onClick={(e) => handleCategorySelect('Food_BeveragesProducts', e)}><a href=""><FontAwesomeIcon className='icons' icon={faUtensils} /> Food & Beverages</a></li>
                <li onClick={(e) => handleCategorySelect('ShoesProducts', e)}><a href=""> <FontAwesomeIcon className='icons' icon={faShoePrints} /> Shoes</a></li>
                <li onClick={(e) => handleCategorySelect('Clothes', e)}><a href=""> <FontAwesomeIcon className='icons' icon={faTShirt} /> Clothes</a></li>
                <li onClick={(e) => handleCategorySelect('ElectronicsProducts', e)}><a href=""><FontAwesomeIcon className='icons' icon={faLaptop} /> Electronics</a></li>
                <li onClick={(e) => handleCategorySelect('JewelleriesProducts', e)}><a href=""><FontAwesomeIcon className='icons' icon={faGem} />Jewerillies</a></li>
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