import logo from '../assets/pictures/e-logo.avif'
import '../CSS/registration.css'
import { Link } from 'react-router-dom';
const LoginForm = () => {
    return <div id='sign-in'>
        <div id='sign-header'>
            <img src={logo} alt="logo image" />
            <h3>Nyanja's Shopping Mall</h3>
        </div>
        <div id='reg-form'>
            <h2>Please Login Here</h2>
            <form action="">
                <div className='row'>
                    <label htmlFor="email">Email</label>
                    <input id='email' name='email' placeholder='Enter your email' type="email" />
                </div>
                <div className='row'>
                    <label htmlFor="password">Password</label>
                    <input id='password' name='password' placeholder='Type your password here' type="password" />
                </div>
                <p className='response' id='success'></p>
                <p className='response' id='error'></p>
                <button type='submit'>Login</button>
            </form>
            <p id='already'>Don't have an account ? <Link className='link' to="/register"> Sign Up</Link></p>
        </div>
    </div>
}
export default LoginForm;