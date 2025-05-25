import { Link } from 'react-router-dom';

export default function Navbar() {
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
            <button className="text-gray-300 hover:text-white">
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}