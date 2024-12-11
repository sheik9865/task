import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import { login } from './src/authSlice';

const LoginComponent = () => {
  const location = useLocation();
  const loginColor = (location.pathname === '/admin/login') ? 'green' : '';
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
      email, password}, {headers: {'Content-Type': 'application/json'}});
      console.log('response.status === 200 && response.data.success',response.status === 200 && response.data.success);
        if (response.status === 200 && response.data.success) {
          alert(response.data.message);
          console.log('response.data.token',response.data.token);
          console.log('response.data.user',response.data.user);
            dispatch(login({
                user: response.data.user,
                token: response.data.token,
            }));
            navigate(`/${response.data.user.role}/dashboard`)
        } else {
          console.error('Login failed:', response.data.message);
        }
      } catch (error) {
          console.error('Error during login:', error.response?.data?.message || error.message);
      }
  };

  return (
      <main style={{ padding: '2rem', maxWidth: '400px', margin: '2rem auto', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h2>Login</h2>
        {message && <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
          </div>

          <button
            type='submit'
            style={{
              padding: '1rem',
              backgroundColor: (loginColor || '#6200ea'),
              color: 'white',
              border: 'none',
              width: '100%',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}
          >
            Login
          </button>
        </form>
      </main> 
  );
};

export default LoginComponent;
