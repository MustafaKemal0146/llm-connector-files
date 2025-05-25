import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;