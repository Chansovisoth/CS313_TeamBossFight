import React from 'react';
import { Menu, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const View = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleting, setDeleting] = useState(null);

  const navigate = useNavigate();

  const fetchUsers = async (search = '') => {
    try {
      setLoading(true);
      const params = search ? { search } : {};
      const res = await apiClient.get('/users', { params });
      
      // Handle both old format (array) and new format (object with users array)
      const userData = res.data.users || res.data;
      setUsers(Array.isArray(userData) ? userData : []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch users');
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchUsers(value);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleDelete = async (userId, username) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeleting(userId);
      await apiClient.delete(`/users/${userId}`);
      toast.success('User deleted successfully');
      fetchUsers(searchTerm); // Refresh the list
    } catch (err) {
      console.error('Error deleting user:', err);
      const errorMessage = err.response?.data?.message || 'Failed to delete user';
      toast.error(errorMessage);
    } finally {
      setDeleting(null);
    }
  };

  if (loading && users.length === 0) {
    return <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading users...</div>;
  }

  if (error && users.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
        <Button onClick={() => fetchUsers()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Assign Role</h1>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <Input
              type="text"
              placeholder="Search users by username or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="pr-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          </div>

          {/* User Management Section */}
          <div className="space-y-4">
            <Label className="text-base font-semibold text-gray-900 dark:text-white">
              User Management
            </Label>

            {loading && users.length > 0 && (
              <div className="text-center py-2 text-gray-500 dark:text-gray-400 text-sm">
                Searching...
              </div>
            )}

            {/* Conditional rendering based on users array */}
            {users.length > 0 ? (
              /* User List */
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between gap-2 border border-gray-200 dark:border-gray-600 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user.username}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          user.role === 'admin' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : user.role === 'host'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs px-3 py-1 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => navigate(`/host/users/edit/${user.id}`)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="text-xs px-2 py-1 bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white"
                        onClick={() => handleDelete(user.id, user.username)}
                        disabled={deleting === user.id}
                      >
                        {deleting === user.id ? (
                          <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* No users message */
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm ? 'No users found matching your search' : 'No users found'}
                </p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => {
                      setSearchTerm('');
                      fetchUsers('');
                    }}
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;