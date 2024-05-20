import { useState } from 'react';
import logo from '../assets/pictures/e-logo.avif'
import '../CSS/registration.css'
import { Link } from 'react-router-dom';
import { FormEvent, ChangeEvent } from 'react';

const RegistrationForm = () => {

    const api_url = 'http://localhost:8080/api/users';

    const [formData, setFormData] = useState({
        names: '',
        email: '',
        phoneNumber:'',
        status: 'ACTIVE',
        password: '',
        confirmPass: ''
    });
    const [response, setResponse] = useState('');
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
            const response = await fetch(api_url + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log(formData)
            const data = await response.text();
            if (data !== "Registration done Successfully!") {
                setResponse('');
                setError(data);
            }
            else {
                setError('');
                setFormData({
                    names: '',
                    email: '',
                    phoneNumber:'',
                    status: 'ACTIVE',
                    password: '',
                    confirmPass: ''
                });
                setResponse(data);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred');
        }
    };


    return <div id='registration'>
        <div id='sign-header'>
            <img src={logo} alt="logo image" />
            <h3>Nyanja's Shopping Mall</h3>
        </div>
        <div id='reg-form'>
            <h2>Sign Up here</h2>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <label htmlFor="names">Names: </label>
                    <input id='names' name='names' value={formData.names} onChange={handleChange} placeholder='Enter your full names' type="text" />
                </div>
                <div className='row'>
                    <label htmlFor="email">Email</label>
                    <input id='email' name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' type="email" />
                </div>
                <div className='row'>
                    <label htmlFor="phoneNumber">Phone number</label>
                    <input id='phoneNumber' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} placeholder='Enter your phone number' type="text" />
                </div>
                <div className='row'>
                    <label htmlFor="password">Password</label>
                    <input id='password' name='password' value={formData.password} onChange={handleChange} placeholder='Type your password here' type="password" />
                </div>
                <div className='row'>
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input id='confirmPass' name='confirmPass' value={formData.confirmPass} onChange={handleChange} placeholder='Please re-type your password here' type="password" />
                </div>
                <p className='response' id='success'>{response}</p>
                <p className='response' id='error'>{error}</p>
                <button type='submit'>Register</button>
            </form>
            <p id='already'>Already have an account ?  <Link className='link' to="/login">Login</Link></p>
        </div>
    </div>
}
export default RegistrationForm;