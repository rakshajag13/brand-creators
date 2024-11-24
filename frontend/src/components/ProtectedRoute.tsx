import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token'); // Or use a context/state management for token
    return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
