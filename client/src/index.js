import React from 'react';
import './styles/index.css';
import App from './App';

import ReactDOM from 'react-dom/client';
import { AuthProvider } from "react-auth-kit";
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <AuthProvider
          authType={"cookie"}
          authName={"_auth"}
          cookieDomain={window.location.hostname}
          cookieSecure={false}
        >
          <div className='flex items-center h-full w-full'>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </div>
        </AuthProvider>
  </React.StrictMode>
);

