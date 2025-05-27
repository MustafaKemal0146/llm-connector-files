import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import { AuthMiddleware } from './middleware/AuthMiddleware';
import LandingPage from './pages/LandingPage';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<AuthMiddleware><Layout /></AuthMiddleware>}>
            <Route index element={<Navigate to="/chat\" replace />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/\" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;