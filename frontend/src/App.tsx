import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Register } from 'components/Register';
import { AuthProvider } from 'context/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'components/Home';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />}>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </div>
  );
}

export default App;
