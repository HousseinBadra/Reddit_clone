import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import { RootState } from '../../store';

function PrivateRoute() {
  const auth = useSelector((state: RootState) => state.auth);
  return auth.authenticated ? <Outlet /> : <Navigate to="/Authentication" />;
}

export default PrivateRoute;
