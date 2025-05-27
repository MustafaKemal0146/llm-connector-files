import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { validateApiKey } from '../lib/apiKeyValidation';
import toast from 'react-hot-toast';
import CommitHistory from '../components/CommitHistory';

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

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApiKeys(data || []);
    } catch (err) {
      toast.error('Failed to load API keys');
    }
  };

  const handleAddApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isValid = await validateApiKey(newProvider, newApiKey);
      if (!isValid) {
        toast.error('Invalid API key format');
        return;
      }

      const { error } = await supabase
        .from('api_keys')
        .insert([
          {
            provider: newProvider,
            key_encrypted: newApiKey,
          }
        ]);

      if (error) throw error;

      // Record the commit
      await supabase.from('commits').insert([
        {
          message: `Added new ${newProvider} API key`,
          changes: { type: 'api_key_added', provider: newProvider }
        }
      ]);

      toast.success('API key added successfully');
      setNewProvider('');
      setNewApiKey('');
      fetchApiKeys();
    } catch (err) {
      toast.error('Failed to add API key');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApiKey = async (id: string, provider: string) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Record the commit
      await supabase.from('commits').insert([
        {
          message: `Removed ${provider} API key`,
          changes: { type: 'api_key_removed', provider }
        }
      ]);

      toast.success('API key deleted successfully');
      fetchApiKeys();
    } catch (err) {
      toast.error('Failed to delete API key');
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Add New API Key</h2>

          <form onSubmit={handleAddApiKey} className="space-y-4">
            <div>
              <label htmlFor="provider" className="block text-sm font-medium text-gray-300">
                Provider
              </label>
              <select
                id="provider"
                value={newProvider}
                onChange={(e) => setNewProvider(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select...</option>
                <option value="openai">OpenAI</option>
                <option value="google">Google AI</option>
                <option value="anthropic">Anthropic</option>
              </select>
            </div>

            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300">
                API Key
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
              {loading ? 'Adding...' : 'Add API Key'}
            </button>
          </form>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Existing API Keys</h2>
          
          {apiKeys.length === 0 ? (
            <p className="text-gray-400">No API keys added yet.</p>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div key={key.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-md">
                  <div>
                    <p className="text-white font-medium">{key.provider}</p>
                    <p className="text-gray-400 text-sm">••••••••••••••••</p>
                  </div>
                  <button
                    onClick={() => handleDeleteApiKey(key.id, key.provider)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-1">
        <CommitHistory />
      </div>
    </div>
  );
}