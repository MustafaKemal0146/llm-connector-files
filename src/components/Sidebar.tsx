import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 h-screen p-4">
      <nav className="space-y-2">
        <Link
          to="/chat"
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg"
        >
          Sohbet
        </Link>
        <Link
          to="/settings"
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg"
        >
          API Ayarları
        </Link>
      </nav>
    </div>
  );
}