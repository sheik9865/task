import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

const LoginComponent = () => {
  const location = useLocation();
  const loginColor = (location.pathname === '/admin/login') ? 'green' : '';
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        const data = response.data;  
        if (response.status === 200) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role',data.role);
            setMessage('Login successful!');
            const decodedRole = atob(data.role);
            navigate(`/${decodedRole}/dashboard`);
        }
    } catch (error) {
        const message = error.response?.data?.message || 'Login failed. Please try again.';
        setMessage(message);
        console.error('Error:', error);
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
