import React from 'react';
import './App.css';
import { AuthProvider } from 'context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from 'components/AppRoutes';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>

    </div>
  );
}

export default App;
