import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface BeauticianScheduleScreenProps {
  beauticianId: string;
  onBack: () => void;
}

export const BeauticianScheduleScreen: React.FC<BeauticianScheduleScreenProps> = ({
  beauticianId,
  onBack
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  const [schedule] = useState<any>({
    [new Date().toISOString().split('T')[0]]: [
      { time: '10:00', status: 'booked', customer: 'Sneha Reddy', service: 'Bridal Makeup' },
      { time: '14:30', status: 'booked', customer: 'Meera Kapoor', service: 'Hair Styling' },
      { time: '17:00', status: 'booked', customer: 'Priya Sharma', service: 'Facial' }
    ]
  });

  const getDaysInWeek = (date: Date) => {
    const week = [];
    const current = new Date(date);
    current.setDate(current.getDate() - current.getDay());

    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return week;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedDate(newDate);
  };

  const getSlotStatus = (date: Date, time: string) => {
    const dateKey = date.toISOString().split('T')[0];
    const daySchedule = schedule[dateKey];
    if (!daySchedule) return 'available';

    const slot = daySchedule.find((s: any) => s.time === time);
    return slot ? slot.status : 'available';
  };

  const getSlotDetails = (date: Date, time: string) => {
    const dateKey = date.toISOString().split('T')[0];
    const daySchedule = schedule[dateKey];
    if (!daySchedule) return null;

    return daySchedule.find((s: any) => s.time === time);
  };

  const weekDays = getDaysInWeek(selectedDate);
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            aria-label="Go back"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">My Schedule</h1>
          <div className="w-10" />
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateWeek('prev')}
              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <h2 className="text-base font-semibold text-gray-900">
              {weekDays[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>

            <button
              onClick={() => navigateWeek('next')}
              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => {
              const isToday = day.toISOString().split('T')[0] === today;
              const daySchedule = schedule[day.toISOString().split('T')[0]] || [];

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(day)}
                  className={`p-2 rounded-lg text-center transition-colors ${
                    isToday
                      ? 'bg-pink-600 text-white'
                      : daySchedule.length > 0
                      ? 'bg-pink-50 text-pink-900 border border-pink-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="text-xs font-medium">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className={`text-lg font-bold ${isToday ? 'text-white' : ''}`}>
                    {day.getDate()}
                  </div>
                  {daySchedule.length > 0 && (
                    <div className="text-xs mt-1">
                      {daySchedule.length} {daySchedule.length === 1 ? 'slot' : 'slots'}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Block Time
            </Button>
          </div>

          <div className="flex items-center space-x-4 text-sm mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded"></div>
              <span className="text-gray-600">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-pink-100 border-2 border-pink-500 rounded"></div>
              <span className="text-gray-600">Booked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-100 border-2 border-gray-400 rounded"></div>
              <span className="text-gray-600">Blocked</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {timeSlots.map(time => {
            const slotStatus = getSlotStatus(selectedDate, time);
            const slotDetails = getSlotDetails(selectedDate, time);

            return (
              <div
                key={time}
                className={`bg-white rounded-xl p-4 border-2 transition-all ${
                  slotStatus === 'booked'
                    ? 'border-pink-500 bg-pink-50'
                    : slotStatus === 'blocked'
                    ? 'border-gray-400 bg-gray-50'
                    : 'border-green-500 bg-green-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Clock className={`w-5 h-5 ${
                        slotStatus === 'booked' ? 'text-pink-600' :
                        slotStatus === 'blocked' ? 'text-gray-600' :
                        'text-green-600'
                      }`} />
                      <span className="font-semibold text-gray-900">{time}</span>
                    </div>

                    {slotDetails && (
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{slotDetails.customer}</p>
                        <p className="text-xs text-gray-600">{slotDetails.service}</p>
                      </div>
                    )}

                    {!slotDetails && slotStatus === 'available' && (
                      <span className="text-sm text-green-700 font-medium">Available</span>
                    )}

                    {!slotDetails && slotStatus === 'blocked' && (
                      <span className="text-sm text-gray-600 font-medium">Time Blocked</span>
                    )}
                  </div>

                  {slotStatus === 'available' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => alert(`Blocking time slot ${time}`)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Block
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
