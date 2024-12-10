import React from 'react';
import { Routes,Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import OptInComponent from './user/OptInComponent';
import OptOutComponent from './user/OptOutComponent';
import NavBarComponent from './partials/NavBarComponent';
import ErrorComponent from './ErrorComponent';

const UserRoutes = ({ token, role }) => {
    console.log('Current Path:', window.location.pathname);
    if (!token || !role) {
        return <Navigate to="/user/login" replace />;
    }

    return (
        <Routes>
            <Route key="user-dashboard"
                path="/dashboard"
                element={
                    <ProtectedRoute token={token} role={role} requiredRole="user">
                        <NavBarComponent />
                        <OptInComponent />
                        <OptOutComponent />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default UserRoutes;
