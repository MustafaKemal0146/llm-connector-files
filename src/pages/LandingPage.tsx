import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900">
      <div className="container mx-auto px-4">
        <nav className="py-6 flex justify-between items-center">
          <div className="text-white text-2xl font-bold">LLM Connector</div>
          <div className="space-x-4">
            <Link to="/login" className="text-white hover:text-blue-300">Giriş Yap</Link>
            <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Kayıt Ol
            </Link>
          </div>
        </nav>

        <main className="py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Yapay Zeka API'larını
              <span className="text-blue-400"> Tek Platformda</span> Yönetin
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              OpenAI, Google ve diğer AI platformlarının API'larını kolayca entegre edin ve yönetin.
              Tek bir arayüzden tüm AI modellerinize erişin.
            </p>
            <div className="flex justify-center gap-6">
              <Link
                to="/register"
                className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
              >
                Hemen Başla
              </Link>
              <Link
                to="/chat"
                className="bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-700 transition"
              >
                Demo Dene
              </Link>
            </div>
          </div>

          <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-4">Çoklu API Desteği</h3>
              <p className="text-gray-400">
                OpenAI, Google ve diğer yapay zeka platformlarının API'larını tek bir yerden yönetin.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-4">Sohbet Geçmişi</h3>
              <p className="text-gray-400">
                Tüm AI konuşmalarınızı güvenli bir şekilde saklayın ve istediğiniz zaman erişin.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-4">Güvenli Depolama</h3>
              <p className="text-gray-400">
                API anahtarlarınız güvenli bir şekilde şifrelenerek saklanır.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}