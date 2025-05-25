import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function Navbar() {
  const { signOut } = useAuth();

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">
              LLM Connector
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/settings" className="text-gray-300 hover:text-white">
              Ayarlar
            </Link>
            <button 
              onClick={() => signOut()}
              className="text-gray-300 hover:text-white"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}