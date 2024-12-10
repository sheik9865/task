import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import HeaderComponent from './partials/HeaderComponent';
import FooterComponent from './partials/FooterComponent';
// import AdminRoutes from './AdminRoutes';
// import UserRoutes from './UserRoutes';
import LoginComponent from './LoginComponent';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from './admin/DashboardComponents';
import CoursesComponents from './admin/CoursesComponent';
import StudentsComponent from './admin/StudentsComponent';
import TrainingScheduleComponent from './admin/TrainingScheduleComponent';
import OptInComponent from './user/OptInComponent';
import OptOutComponent from './user/OptOutComponent';
import NavBarComponent from './partials/NavBarComponent';
import ErrorComponent from './ErrorComponent';

const App = () => {
    const [token, setToken] = useState(localStorage.token);
    const [role, setRole] = useState(localStorage.role);


    useEffect(() => {
        console.log('Token:', localStorage.getItem('token'));
        console.log('Role:', localStorage.getItem('role'));
    }, []);

    return (
        <Router basename='/samplenew/'>
            <HeaderComponent />
                <Routes>
                    <Route
                        key="admin-dashboard"
                        path="admin/dashboard"
                        element={
                            <ProtectedRoute token={token} role={role} requiredRole="admin">
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route key="admin-courses" path="admin/courses" element={<CoursesComponents />} />
                    <Route key="admin-students" path="admin/students" element={<StudentsComponent />} />
                    <Route key="admin-schedules" path="admin/schedules" element={<TrainingScheduleComponent />} />
                    <Route key="user-dashboard"
                        path="user/dashboard"
                        element={
                            <ProtectedRoute token={token} role={role} requiredRole="user">
                                <NavBarComponent />
                                <OptInComponent />
                                <OptOutComponent />
                            </ProtectedRoute>
                        }
                    />
                    <Route key="user-login" path="user/login" element={<LoginComponent />} />
                    <Route key="admin-login" path="admin/login" element={<LoginComponent />} />
                {/* {(token && role) ? (
                    <>
                        <Route path="admin/*" element={<AdminRoutes token={token} role={role} />} />
                        <Route path="user/*" element={<UserRoutes token={token} role={role} />} />
                        <Route key="user-error" path="*" element={<ErrorComponent />} />
                    </>
                ) : (
                    <>
                        <Route key="user-login" path="user/login" element={<LoginComponent />} />
                        <Route key="admin-login" path="admin/login" element={<LoginComponent />} />
                        <Route key="admin-error"  path="*" element={<ErrorComponent />} />
                    </>
                )} */}
                </Routes>
            <FooterComponent />
        </Router>
    );
};

createRoot(document.getElementById('root')).render(<App />);
