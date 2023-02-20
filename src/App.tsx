import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import AuthenticationPage from './Pages/AuthenticationPage/AuthenticationPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<AuthenticationPage />} path="/Authentication" />
      </Routes>
    </div>
  );
}

export default App;
