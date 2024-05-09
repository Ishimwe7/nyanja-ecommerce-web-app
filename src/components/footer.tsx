import '../CSS/footer.css'
//import HomeIcon from '@material-ui/icons/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt, faMapMarkerAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return <div>
        <div id="footer">
            <div id="f-contacts" className='foot-el'>
                <h3 className='head'>Contacts</h3>
                <ul>
                    <li><FontAwesomeIcon className='icons' icon={faEnvelope} />  Email: nyanjashoppingmall@gmail.com</li>
                    <li><FontAwesomeIcon className='icons' icon={faPhoneAlt} />  Phone: +250780146235</li>
                    <li><FontAwesomeIcon className='icons' icon={faLinkedin} /> LinkedIn: @nyanjashoppingmall</li>
                </ul>
            </div>
            <div id="f-address" className='foot-el'>
                <h3 className='head'>Address</h3>
                <ul>
                    <li><FontAwesomeIcon className='icons' icon={faBuilding} /> Remera, Kigali, Rwanda</li>
                    <li><FontAwesomeIcon className='icons' icon={faMapMarkerAlt} /> KG 636 St Kigali, Rwanda</li>
                    <li></li>
                </ul>
            </div>
            <div id="f-quick-links" className='foot-el'>
                <h3 className='head'>Quick Links</h3>
                <ul>
                    <li><a href="">About Us</a></li>
                    <li><a href="">Contact Us</a></li>
                    <li><a href="">Register</a></li>
                    <li><a href="">Login</a></li>
                </ul>
            </div>
        </div>
        <p id='rights'>All rigths reserved &copy; nyanjashoppingmall~2024</p>
    </div>
}
export default Footer;