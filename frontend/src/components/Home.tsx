import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import AppBar from './AppBar';
import { Login } from './Login';
import { Register } from './Register';
import Contacts from './Contacts';
import PaymentComponent from './Payments';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from 'context/AuthContext';

const App = () => {

    const { isLoggedIn } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const publicRoutes = ['/login', '/register', '/'];

        if (isLoggedIn() && publicRoutes.includes(location.pathname)) {
            navigate('/contacts');
        }
    }, [isLoggedIn, location.pathname, navigate]);

    return (
        <div>
            {isLoggedIn() && <AppBar />}
            <Routes>
                {/* Public Routes */}
                <Route
                    path="/"
                    element={
                        isLoggedIn() ?
                            <Navigate to="/contacts" replace /> :
                            <Navigate to="/login" replace />
                    }
                />
                <Route
                    path="/register"
                    element={
                        isLoggedIn() ?
                            <Navigate to="/contacts" replace /> :
                            <Register />
                    }
                />
                <Route
                    path="/login"
                    element={
                        isLoggedIn() ?
                            <Navigate to="/contacts" replace /> :
                            <Login />
                    }
                />

                {/* Protected Routes */}
                <Route
                    path="/contacts"
                    element={

                        <ProtectedRoute>
                            <Contacts />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/payments"
                    element={
                        <ProtectedRoute>
                            <PaymentComponent />
                        </ProtectedRoute>
                    }
                />

                {/* Catch-All: Redirect to Login */}
                <Route
                    path="*"
                    element={
                        isLoggedIn() ?
                            <Navigate to="/contacts" replace /> :
                            <Navigate to="/login" replace />
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
