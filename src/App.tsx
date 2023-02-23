import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import AuthenticationPage from './Pages/AuthenticationPage/AuthenticationPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<HomePage />} path="/" />
        </Route>
        <Route element={<AuthenticationPage />} path="/Authentication" />
      </Routes>
    </div>
  );
}

export default App;
