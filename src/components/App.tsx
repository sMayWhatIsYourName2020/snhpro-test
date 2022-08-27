import { FC, ReactNode, useState } from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

import { AuthPage } from '../pages/AuthPage/AuthPage';
import { AppPage } from '../pages/AppPage/AppPage';
import { getToken } from '../helpers/helpers';

const PrivateRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const token = getToken();
  if (token.accessToken === undefined) {
    return <Navigate to="/auth" />
  }
  return children;
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <AppPage />
          </PrivateRoute>
        } />
        <Route path="auth" element={
          <div className="wrapper">
            <AuthPage />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App
