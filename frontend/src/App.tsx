import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Register } from 'components/Register';
import { AuthProvider } from 'context/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Login } from 'components/Login';
import { Home } from 'components/Home';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />}>
              {/* Optionally handle 404 - redirect any unmatched path to /login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </div>
  );
}

export default App;
