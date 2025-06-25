
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ChevronDown } from 'lucide-react';

interface ReservationViewProps {
  onNavigateToPayment: () => void;
  onNavigateBack: () => void;
}

const ReservationView = ({ onNavigateToPayment, onNavigateBack }: ReservationViewProps) => {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [requiredSlots, setRequiredSlots] = useState<number>(1);

  const slots = [
    { id: 'A1', available: true },
    { id: 'A2', available: false },
    { id: 'A3', available: true },
    { id: 'A4', available: false },
    { id: 'A5', available: true },
    { id: 'A6', available: true },
    { id: 'A7', available: true },
    { id: 'A8', available: false },
    { id: 'A9', available: true },
    { id: 'A10', available: false },
  ];

  const handleSlotSelect = (slotId: string) => {
    const slot = slots.find(s => s.id === slotId);
    if (!slot?.available) return;

    if (selectedSlots.includes(slotId)) {
      setSelectedSlots(selectedSlots.filter(id => id !== slotId));
    } else if (selectedSlots.length < requiredSlots) {
      setSelectedSlots([...selectedSlots, slotId]);
    } else {
      // Replace the first selected slot with the new one
      setSelectedSlots([...selectedSlots.slice(1), slotId]);
    }
  };

  const canProceed = selectedSlots.length === requiredSlots;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onNavigateBack} className="mr-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Reserve a Premium Spot</h1>
          <p className="text-gray-600">Effortless parking at your fingertips</p>
        </div>
      </div>

      <div className="px-4 mt-6">
        {/* Parking Hub Info Card */}
        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-[#101D3D]">Loyola ICAM College Parking Hub</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Available:</span>
              <span className="text-green-600 font-semibold">6 / 10</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Price:</span>
              <span className="text-[#FFB600] font-semibold">₹15 / hour</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Slots:</span>
              <Select value={requiredSlots.toString()} onValueChange={(value) => {
                setRequiredSlots(parseInt(value));
                setSelectedSlots([]);
              }}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Slot Selection Grid */}
        <div className="grid grid-cols-2 gap-3">
          {slots.map((slot) => (
            <Button
              key={slot.id}
              onClick={() => handleSlotSelect(slot.id)}
              disabled={!slot.available}
              variant="outline"
              className={`h-14 text-white font-semibold rounded-xl border-0 ${
                slot.available
                  ? selectedSlots.includes(slot.id)
                    ? 'bg-green-700 hover:bg-green-600'
                    : 'bg-[#63F781] hover:bg-green-500'
                  : 'bg-[#FF5B5B] hover:bg-[#FF5B5B] cursor-not-allowed opacity-70'
              }`}
            >
              {slot.id}
            </Button>
          ))}
        </div>

        {/* Proceed Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <Button
            onClick={onNavigateToPayment}
            disabled={!canProceed}
            className={`w-full py-3 font-semibold rounded-full ${
              canProceed
                ? 'bg-[#101D3D] hover:bg-[#101D3D]/90 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Proceed to Payment ({selectedSlots.length}/{requiredSlots} selected)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReservationView;
