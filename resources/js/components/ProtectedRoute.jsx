import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, token, role, requiredRole }) => {
    if (token && requiredRole === atob(role)) {
        return <>{children}</>
    }
    return <Navigate to="/user/login" replace />;
};

export default ProtectedRoute;
