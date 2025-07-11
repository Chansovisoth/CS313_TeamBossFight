import React from 'react';
import { Menu } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const ViewEvents = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Menu className="w-6 h-6 text-gray-600 mr-3" />
            <h1 className="text-lg font-semibold text-gray-900">Events</h1>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {events.length === 0 ? (
              // No Events Found State
              <div className="flex flex-col items-center justify-center h-96">
                <h2 className="text-lg font-medium text-gray-900 mb-2">No Events Found</h2>
                <p className="text-sm text-gray-600">No events have been created yet</p>
              </div>
            ) : (
              // Events List
              events.map((event) => (
                <Card key={event.id} className="border border-gray-300">
                  <CardHeader className="pb-2">
                    <Label className="text-base font-medium text-gray-900">
                      {event.title}
                    </Label>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="font-medium text-gray-700 mr-2">Start:</span>
                        <span>{event.startDate} {event.startTime}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="font-medium text-gray-700 mr-2">End:</span>
                        <span>{event.endDate} {event.endTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEvents;