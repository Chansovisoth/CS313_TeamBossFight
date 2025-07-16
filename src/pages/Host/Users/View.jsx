import React from 'react';
import { Search, Edit, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
// import { apiClient } from '@/api';
import { useEffect, useState } from 'react';
// import { toast } from 'sonner';

const View = () => {
  // Static data for testing
  const staticUsers = [
    { id: 1, username: 'admin_user', email: 'admin@example.com', role: 'admin' },
    { id: 2, username: 'host_user', email: 'host@example.com', role: 'host' },
    { id: 3, username: 'player1', email: 'player1@example.com', role: 'player' },
    { id: 4, username: 'player2', email: 'player2@example.com', role: 'player' },
    { id: 5, username: 'test_host', email: 'testhost@example.com', role: 'host' }
  ];

  const [users, setUsers] = useState(staticUsers);
  const [loading, setLoading] = useState(false); // Set to false for static data
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  // Commented out API fetch function
  /*
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
  */

  // Static filter function for search
  const filterUsers = (search = '') => {
    if (!search) {
      setUsers(staticUsers);
      return;
    }
    
    const filtered = staticUsers.filter(user => 
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
    setUsers(filtered);
  };

  // Commented out useEffect for API calls
  /*
  useEffect(() => {
    fetchUsers();
  }, []);
  */

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Use static filter instead of API call
    filterUsers(value);
    
    // Commented out debounced API search
    /*
    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchUsers(value);
    }, 500);

    return () => clearTimeout(timeoutId);
    */
  };

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'host': return 'default';
      case 'player': return 'secondary';
      default: return 'secondary';
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500 dark:text-gray-400">Loading users...</div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error && users.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
              <Button onClick={() => filterUsers()} variant="outline">
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="container mx-auto max-w-4xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            User Management
          </h1>
        </div>

        {/* Search Card */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search users by username or email..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Users ({users.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading && users.length > 0 && (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm border-b">
                Searching...
              </div>
            )}

            {users.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <div key={user.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {user.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900 dark:text-white truncate">
                              {user.username}
                            </h3>
                            <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                              {user.role}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/host/users/edit/${user.id}`)}
                          className="h-8 px-3"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No Users Found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {searchTerm ? 'No users found matching your search criteria.' : 'No users have been created yet.'}
                </p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      filterUsers('');
                    }}
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default View;