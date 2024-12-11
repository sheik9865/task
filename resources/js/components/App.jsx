import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import HeaderComponent from './partials/HeaderComponent';
import FooterComponent from './partials/FooterComponent';
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
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const role = useSelector((state) => btoa(state.auth.user?.role));

    useEffect(() => {
        console.log('Token:', token);
        console.log('Role:', role);
    }, [token, role]);

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
                <Route
                    key="user-dashboard"
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
            </Routes>
            <FooterComponent />
        </Router>
    );
};

export default App;
