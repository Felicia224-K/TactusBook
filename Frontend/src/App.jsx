import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Contacts from './pages/Contacts';
import AuthGuard from './components/AuthGuard';


function App() {
  

  return (
    <Routes>

      <Route path= "/" element={<WelcomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/contacts"
        element={
          <AuthGuard>
            <Contacts />
          </AuthGuard>
        }
      />

      <Route path="*" element={<Navigate to="contacts" replace />} />


    </Routes>
      
      
);
}
export default App
