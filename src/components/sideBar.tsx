import logo from '../assets/pictures/e-logo.avif'
import '../CSS/sideBar.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faChartBar, faSignOutAlt, faListAlt } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {

    const navigate = useNavigate();

    const logoutAdmin = (event:React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        // Perform logout actions
        event.preventDefault();
        sessionStorage.removeItem('loggedAdmin');
        navigate('/login');
    };

    return (<div id='side-bar'>
        <div id="admin-logo">
            <img src={logo} alt="logo image" />
            <h2>Nyanja Shopping Mall</h2>
        </div>
        <ul id="side-links">
            <li className='sub-links'><FontAwesomeIcon className='side-icons' icon={faPlus} /> Add new Product</li>
            <li className='sub-links'><FontAwesomeIcon className='side-icons' icon={faEye} /> View All Products</li>
            <li className='sub-links'><FontAwesomeIcon className='side-icons' icon={faListAlt} /> View All Orders</li>
            <li className='sub-links'><FontAwesomeIcon className='side-icons' icon={faChartBar} />Sales Report</li>
            <li onClick={(e)=>{logoutAdmin(e)}} className='sub-links'id='admin-logout'><FontAwesomeIcon className='side-icons' icon={faSignOutAlt} />Logout</li>
        </ul>
    </div>
    );
}
export default SideBar;