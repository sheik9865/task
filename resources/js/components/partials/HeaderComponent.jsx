import React from 'react';
import { useLocation } from 'react-router-dom';

const HeaderComponent = () => {
    const location = useLocation();
    console.log('location',location);
    const loginColor = location.pathname.includes('admin') ? 'green' : '';

    return (
        <>
            <header style={{ backgroundColor: (loginColor || '#6200ea'), color: 'white', padding: '1rem', textAlign: 'center' }}>
                <h1>My Login Page</h1>
            </header>
        </>
    );
};

export default HeaderComponent;
