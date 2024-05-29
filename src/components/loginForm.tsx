import { useState } from 'react';
import logo from '../assets/pictures/e-logo.avif'
import '../CSS/registration.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FormEvent, ChangeEvent } from 'react';
const LoginForm = () => {

    const navigate = useNavigate();
    //const api_url = 'http://localhost:8080/api/public/users';
    const api_url = 'http://ec2-13-49-229-177.eu-north-1.compute.amazonaws.com:8080/api/public/users';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        isAdmin: false
    });
    const [error, setError] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(api_url + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            //console.log(formData)
            const data = await response.json();
            if (response.ok) {
                setError('');
                if(formData.isAdmin){
                    if (data.admin) { 
                        sessionStorage.setItem('loggedAdmin',JSON.stringify(data))
                        navigate('/adminDashboard');
                    } else {
                        // console.log(data)
                        setError('Invalid Credentials !');
                        console.log(data);
                    }
                }
                else{
                    sessionStorage.setItem('loggedUser',JSON.stringify(data))
                    navigate('/');
                }
            }
            else {
                setError('Invalid Credentials !');
                console.log(data);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred');
        }
    };

    return <div id='sign-in'>
        <div id='sign-header'>
            <img src={logo} alt="logo image" />
            <h3>Nyanja's Shopping Mall</h3>
        </div>
        <div id='reg-form'>
            <h2>Please Login Here</h2>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <label htmlFor="email">Email</label>
                    <input id='email' name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' type="email" />
                </div>
                <div className='row'>
                    <label htmlFor="password">Password</label>
                    <input id='password' name='password' value={formData.password} onChange={handleChange} placeholder='Type your password here' type="password" />
                </div>
                <div className='isAdmin'>
                    <label htmlFor="isAdmin">Admin</label>
                    <input id='isAdmin' name='isAdmin' checked={formData.isAdmin} onChange={handleChange} type="checkbox" />
                </div>
                <p className='response' id='error'>{error}</p>
                <button type='submit'>Login</button>
            </form>
            <p id='already'>Don't have an account ? <Link className='link' to="/register"> Sign Up</Link></p>
        </div>
    </div>
}
export default LoginForm;