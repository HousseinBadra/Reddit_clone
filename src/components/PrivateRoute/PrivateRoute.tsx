import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import { RootState } from '../../store';
import Layout from '../Layout/Layout';

function PrivateRoute() {
  const auth = useSelector((state: RootState) => state.auth);
  return auth.authenticated ? <Layout /> : <Navigate to="/Authentication" />;
}

export default PrivateRoute;
