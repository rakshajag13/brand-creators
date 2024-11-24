import React from 'react';
import './App.css';
import { AuthProvider } from 'context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Home from 'components/Home';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AuthProvider>

    </div>
  );
}

export default App;
