import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sword, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ViewBosses = () => {
  const navigate = useNavigate();
  
  // For demo purposes - toggle this to see different states
  const [bosses, setBosses] = useState([
    {
      id: 1,
      name: 'Boss 1',
      image: 'https://via.placeholder.com/200x150/6366f1/ffffff?text=Boss+1',
      description: 'A fearsome boss with incredible strength'
    },
    {
      id: 2,
      name: 'Boss 2', 
      image: 'https://via.placeholder.com/200x150/8b5cf6/ffffff?text=Boss+2',
      description: 'Master of dark magic and ancient spells'
    },
    {
      id: 3,
      name: 'Boss 3',
      image: 'https://via.placeholder.com/200x150/06b6d4/ffffff?text=Boss+3',
      description: 'Lightning-fast warrior with deadly precision'
    }
  ]);

  const handleBossClick = (bossId) => {
    // Navigate to boss edit page
    navigate('/host/bosses/edit');
  };

  const handleCreateBoss = () => {
    navigate('/host/bosses/create');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            <h1 className="text-2xl font-bold tracking-tight">Bosses</h1>
          </div>
        </div>
        <Button 
          onClick={handleCreateBoss}
          className="bg-primary hover:bg-primary/90 flex items-center gap-2 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Create Boss
        </Button>
      </div>

      {/* Content Area */}
      {bosses.length === 0 ? (
        // No Bosses Found State
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Sword className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">No Bosses Found</h2>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            No bosses have been created yet. Create your first boss to get started with organizing boss fights.
          </p>
          <Button 
            onClick={handleCreateBoss}
            className="bg-primary hover:bg-primary/90"
          >
            Create Your First Boss
          </Button>
        </div>
      ) : (
        // Bosses Grid
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bosses.map((boss) => (
            <Card
              key={boss.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50 group"
              onClick={() => handleBossClick(boss.id)}
            >
              <CardContent className="p-0">
                {/* Boss Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  {boss.image ? (
                    <img 
                      src={boss.image} 
                      alt={boss.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <div className="text-center">
                        <Sword className="h-12 w-12 text-primary/60 mx-auto mb-2" />
                        <span className="text-sm text-muted-foreground">No Image</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white text-black">
                        Edit Boss
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Boss Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {boss.name}
                  </h3>
                  {boss.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {boss.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewBosses;