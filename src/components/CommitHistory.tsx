import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { format as timeAgo } from 'timeago.js';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthProvider';
import toast from 'react-hot-toast';

interface Commit {
  id: string;
  user_id: string;
  message: string;
  changes: any;
  created_at: string;
}

export default function CommitHistory() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchCommits();
  }, []);

  const fetchCommits = async () => {
    try {
      const { data, error } = await supabase
        .from('commits')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setCommits(data || []);
    } catch (err) {
      toast.error('Failed to load commit history');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Recent Changes</h2>
      <div className="space-y-4">
        {commits.map((commit) => (
          <div
            key={commit.id}
            className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white font-medium">{commit.message}</p>
                <p className="text-gray-400 text-sm mt-1">
                  {format(new Date(commit.created_at), 'MMM d, yyyy')}
                  {' · '}
                  {timeAgo(new Date(commit.created_at))}
                </p>
              </div>
              <span className="text-blue-400 text-sm">
                {commit.changes?.files || 0} files changed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}