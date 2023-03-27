import { Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import AuthenticationPage from '../Pages/AuthenticationPage/AuthenticationPage';
import SearchPage from '../Pages/SearchPage/SearchPage';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import Profile from '../components/profile/Profile';
import Layout from '../components/Layout/Layout';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />} path="/">
          <Route element={<HomePage />} path="/" />
        </Route>
        <Route element={<Layout />} path="/profile">
          <Route element={<Profile />} path="/profile" />
        </Route>
        <Route element={<Layout />} path="/search">
          <Route element={<SearchPage />} path="/search" />
        </Route>
      </Route>
      <Route element={<AuthenticationPage />} path="/Authentication" />
    </Routes>
  );
}
