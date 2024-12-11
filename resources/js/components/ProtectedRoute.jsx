import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, token, role, requiredRole }) => {
    console.log('atob(role)',typeof role);
    console.log('atob(role)',atob(role ? role : ''));
    console.log('requiredRole',requiredRole);    console.log('requiredRole',typeof requiredRole);

    console.log('token',token);    console.log('requiredRole === atob(role)',requiredRole === atob(role));

    if (token && requiredRole === atob(role)) {
        return <>{children}</>
    }
    return <Navigate to="/user/login" replace />;
};

export default ProtectedRoute;
