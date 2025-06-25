
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Menu, MapPin } from 'lucide-react';

interface MapViewProps {
  onNavigateToReservation: () => void;
}

const MapView = ({ onNavigateToReservation }: MapViewProps) => {
  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
        {/* Simulated map with street patterns */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gray-400 relative">
            {/* Street lines */}
            <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gray-500 rotate-12"></div>
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-500 -rotate-6"></div>
            <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gray-500 rotate-3"></div>
            <div className="absolute left-1/4 top-0 h-full w-0.5 bg-gray-500 rotate-12"></div>
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-500 -rotate-3"></div>
            <div className="absolute left-3/4 top-0 h-full w-0.5 bg-gray-500 rotate-6"></div>
          </div>
        </div>
        
        {/* Location markers */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-[#B9F15A] rounded-full shadow-lg animate-pulse"></div>
        </div>
        <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-[#B9F15A] rounded-full shadow-lg"></div>
        </div>
        <div className="absolute top-2/3 right-1/3 transform translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-[#B9F15A] rounded-full shadow-lg"></div>
        </div>
        
        {/* User location */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
            <MapPin className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-12 px-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" className="bg-white/90 backdrop-blur-sm shadow-md">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search location..."
            className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-md border-0 focus:outline-none focus:ring-2 focus:ring-[#101D3D]"
          />
        </div>
      </div>

      {/* Bottom Location Card */}
      <Card className="absolute bottom-0 left-0 right-0 bg-[#101D3D] text-white rounded-t-3xl border-0 shadow-2xl">
        <CardContent className="p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">
              Loyola ICAM College of Engineering and Technology
            </h2>
            <p className="text-white/80 text-sm">
              Loyola Campus, Nungambakkam, Chennai 600 034
            </p>
          </div>
          
          <div className="flex items-center mb-6">
            <span className="text-sm text-white/80 mr-2">Availability Status</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          
          <Button 
            onClick={onNavigateToReservation}
            className="w-full bg-white text-[#101D3D] hover:bg-white/90 font-semibold py-3 rounded-full"
          >
            Park Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;
