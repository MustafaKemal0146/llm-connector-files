import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface ApiKey {
  id: string;
  provider: string;
  key_encrypted: string;
}

export default function Settings() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newProvider, setNewProvider] = useState('');
  const [newApiKey, setNewApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*');

      if (error) throw error;
      setApiKeys(data || []);
    } catch (err: any) {
      setError('API anahtarları yüklenirken bir hata oluştu');
    }
  };

  const handleAddApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const { error } = await supabase
        .from('api_keys')
        .insert([
          {
            provider: newProvider,
            key_encrypted: newApiKey,
          }
        ]);

      if (error) throw error;

      setSuccess('API anahtarı başarıyla eklendi');
      setNewProvider('');
      setNewApiKey('');
      fetchApiKeys();
    } catch (err: any) {
      setError('API anahtarı eklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApiKey = async (id: string) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSuccess('API anahtarı başarıyla silindi');
      fetchApiKeys();
    } catch (err: any) {
      setError('API anahtarı silinirken bir hata oluştu');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">API Ayarları</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Yeni API Anahtarı Ekle</h2>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-500 text-white p-3 rounded-md mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleAddApiKey} className="space-y-4">
          <div>
            <label htmlFor="provider" className="block text-sm font-medium text-gray-300">
              Sağlayıcı
            </label>
            <select
              id="provider"
              value={newProvider}
              onChange={(e) => setNewProvider(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Seçiniz...</option>
              <option value="openai">OpenAI</option>
              <option value="google">Google AI</option>
              <option value="anthropic">Anthropic</option>
            </select>
          </div>

          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300">
              API Anahtarı
            </label>
            <input
              type="password"
              id="apiKey"
              value={newApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
          >
            {loading ? 'Ekleniyor...' : 'API Anahtarı Ekle'}
          </button>
        </form>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Mevcut API Anahtarları</h2>
        
        {apiKeys.length === 0 ? (
          <p className="text-gray-400">Henüz API anahtarı eklenmemiş.</p>
        ) : (
          <div className="space-y-4">
            {apiKeys.map((key) => (
              <div key={key.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-md">
                <div>
                  <p className="text-white font-medium">{key.provider}</p>
                  <p className="text-gray-400 text-sm">••••••••••••••••</p>
                </div>
                <button
                  onClick={() => handleDeleteApiKey(key.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}