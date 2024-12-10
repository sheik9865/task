import React, {useState, useEffect} from "react";
import { Link,useLocation, useNavigate } from "react-router-dom";
import { adminPaths } from '../src/Constants';

const NavBarComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const getRole = () => {
        try {
            const roleEncoded = localStorage.getItem('role');
            return roleEncoded ? atob(roleEncoded) : '';
        } catch (e) {
            console.error('Decoding role failed:', e);
            return '';
        }
    };
    const role = getRole();
    const handleLogout = () => {
        localStorage.clear();
        navigate(`/${role}/login`, { replace: true });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Hello {role.charAt(0).toUpperCase()+role.slice(1)} !
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={`/${role}/dashboard`} >Dashboard</Link>
                        </li>
                        {location.pathname.includes('admin') ? 
                            adminPaths.map((path, index) => {
                                return <li key={index} className="nav-item">
                                    <Link className="nav-link" to={`/${role}/${path}`}>{path}</Link>
                                </li>
                            })
                            : null
                        }
                        <li className="nav-item"> 
                            <a className="nav-link" href="javascript:;" onClick={handleLogout}>Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBarComponent;
