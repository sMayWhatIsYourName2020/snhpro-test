import { FC, useEffect } from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

import { AuthPage } from '../pages/AuthPage/AuthPage';
import { AppPage } from '../pages/AppPage/AppPage';
import { getUser } from '../helpers/helpers';
import { useLoginMutation } from '../services/UserService';
import { Wrapper } from './Wrapper/Wrapper';

const PrivateRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const user = getUser();
  if (user.username === undefined) {
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
            <Wrapper />
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
