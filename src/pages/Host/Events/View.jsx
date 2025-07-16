import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, Plus } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ViewEvents = () => {
  const navigate = useNavigate();
  
  // Static hardcoded events data
  const events = [
    {
      id: 1,
      title: 'Event1',
      startDate: '01/01/2025',
      startTime: '08:00AM',
      endDate: '01/01/2025',
      endTime: '05:00PM'
    },
    {
      id: 2,
      title: 'Event2',
      startDate: '02/01/2025',
      startTime: '06:00AM',
      endDate: '02/02/2025',
      endTime: '05:00PM'
    },
    {
      id: 3,
      title: 'Event3',
      startDate: '02/01/2025',
      startTime: '06:00AM',
      endDate: '02/02/2025',
      endTime: '05:00PM'
    }
  ];

  const handleEventClick = (eventId) => {
    navigate(`/host/events/assign_boss?eventId=${eventId}`);
  };

  return (
      <div className="container mx-auto px-4 sm:px-6 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            <h1 className="text-2xl font-bold tracking-tight">Events</h1>
          </div>
        </div>

        {/* Events List - Vertical Stack */}
        <div className="space-y-4">
          {events.length === 0 ? (
            // No Events Found State
            <div className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No Events Found</h2>
              <p className="text-muted-foreground text-center max-w-md">
                No events have been created yet. Create your first event to get started.
              </p>
            </div>
          ) : (
            // Events List - Each event as a full-width card
            events.map((event) => (
              <Card 
                key={event.id} 
                className="cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/30 border border-border/50 w-full"
                onClick={() => handleEventClick(event.id)}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    {/* Event Title */}
                    <h3 className="text-lg font-semibold text-foreground">
                      {event.title}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:gap-8 gap-2">
                      {/* Start Date/Time */}
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          <span className="text-muted-foreground">Start:</span> {event.startDate} {event.startTime}
                        </p>
                      </div>

                      {/* End Date/Time */}
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          <span className="text-muted-foreground">End:</span> {event.endDate} {event.endTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
  );
};

export default ViewEvents;