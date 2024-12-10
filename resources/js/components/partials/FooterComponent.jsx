import React from 'react';
import { useLocation } from 'react-router-dom';

const FooterComponent = () => {
    const location = useLocation();
    const loginColor = location.pathname.includes('admin') ? 'green' : '';
    
    return(
        <>
            <footer style={{ backgroundColor: (loginColor || '#6200ea'),position:'relative',bottom:'0',width : '100%',color: 'white', padding: '1rem', textAlign: 'center' }}>
                <p>&copy; 2024 My Website. All rights reserved.</p>
            </footer>
        </>
    )
}

export default FooterComponent;
    