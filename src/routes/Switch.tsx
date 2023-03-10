import { Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import AuthenticationPage from '../Pages/AuthenticationPage/AuthenticationPage';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import Profile from '../components/profile/Profile';

export default function Switch() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<HomePage />} path="/" />
        <Route element={<Profile />} path="/profile" />
      </Route>
      <Route element={<AuthenticationPage />} path="/Authentication" />
    </Routes>
  );
}
