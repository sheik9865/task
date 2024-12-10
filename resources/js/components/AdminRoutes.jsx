import React from 'react';
import { Routes,Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from './admin/DashboardComponents';
import CoursesComponents from './admin/CoursesComponent';

const AdminRoutes = ({ token, role }) => {
    if (!token || !role) {
        return <Navigate to="/user/login" replace />;
    }
    
    return (
        <Routes>
            <Route
                key="admin-dashboard"
                path="/dashboard"
                element={
                    <ProtectedRoute token={token} role={role} requiredRole="admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />
            <Route key="admin-courses" path="admin/courses" element={<CoursesComponents />} />
        </Routes>
    )
} 

export default AdminRoutes;
