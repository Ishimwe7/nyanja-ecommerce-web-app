//import SideBar from "./sideBar";
//import MainDashContent from "./mainDashContent";
import logo from '../assets/pictures/e-logo.avif'
import '../CSS/sideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faChartBar, faSignOutAlt, faListAlt } from '@fortawesome/free-solid-svg-icons';

import AddProduct from './AddProduct'; // Import the components you want to render
import ViewProducts from './ViewProducts';
import ViewOrders from './ViewOrders';
//import SalesReport from './SalesReport';
import '../CSS/adminDash.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainDashContent from './mainDashContent';
const AdminDashoard = () => {

    const navigate = useNavigate();
    const [loggedAdmin, setLoggedAdmin] = useState(false);
    const [showAdd, setShowAddProduct] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    //const [showSales, setShowSales] = useState(false);

    // useEffect(() => {
    //     const isAdminLoggedIn = sessionStorage.getItem('loggedAdmin');
    //     isAdminLoggedIn ?  setLoggedAdmin(true) :  setLoggedAdmin(false)
    //     // console.log(isAdminLoggedIn);
    // }, [navigate]);

    useEffect(() => {
        const isAdminLoggedIn = sessionStorage.getItem('loggedAdmin');
        isAdminLoggedIn ? setLoggedAdmin(true) : setLoggedAdmin(false);
        if (!isAdminLoggedIn) {
            navigate('/login');
        }
    }, [navigate, loggedAdmin]);

    const ShowAddProduct = () => {
        if (showAdd == false) {
            setShowOrders(false);
            setShowProducts(false);
            setShowAddProduct(true);
        }
    }
    const ShowAllProducts = () => {
        if (showProducts == false) {
            setShowAddProduct(false);
            setShowOrders(false);
            setShowProducts(true);
        }
    }
    const ShowAllOrders = () => {
        if (showOrders == false) {
            setShowAddProduct(false);
            setShowProducts(false);
            setShowOrders(true);
        }
    }

    // if (!loggedAdmin) {
    //     navigate('/login');
    //     //return null; // Render nothing if admin is not logged in
    // }
    // if (!loggedAdmin) {
    //     navigate('/login'); // Render nothing if admin is not logged in
    // }

    return (
        <div id="admin-dashboard">
            <div id='side-bar'>
                <div id="admin-logo">
                    <img src={logo} alt="logo image" />
                    <h2>Nyanja Shopping Mall</h2>
                </div>
                <ul id="side-links">
                    <li className='sub-links' onClick={ShowAddProduct}><FontAwesomeIcon className='side-icons' icon={faPlus} /> Add new Product</li>
                    <li className='sub-links' onClick={ShowAllProducts}><FontAwesomeIcon className='side-icons' icon={faEye} /> View All Products</li>
                    <li className='sub-links' onClick={ShowAllOrders}><FontAwesomeIcon className='side-icons' icon={faListAlt} /> View All Orders</li>
                    <li className='sub-links'><FontAwesomeIcon className='side-icons' icon={faChartBar} />Sales Report</li>
                    <li className='sub-links' id='admin-logout'><FontAwesomeIcon className='side-icons' icon={faSignOutAlt} />Logout</li>
                </ul>
            </div>
            {showAdd && <AddProduct />}
            {showProducts && <ViewProducts />}
            {showOrders && <ViewOrders />}
            {!showAdd && !showProducts && !showOrders && <MainDashContent/>}
        </div>
    );
}
export default AdminDashoard;