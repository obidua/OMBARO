import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Plus, CreditCard as Edit2, Trash2, Save, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface ScheduleSlot {
  id: string;
  day: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

interface TherapistScheduleScreenProps {
  onBack: () => void;
}

export const TherapistScheduleScreen: React.FC<TherapistScheduleScreenProps> = ({ onBack }) => {
  const [schedules, setSchedules] = useState<ScheduleSlot[]>([
    { id: '1', day: 'Monday', start_time: '09:00', end_time: '18:00', is_available: true },
    { id: '2', day: 'Tuesday', start_time: '09:00', end_time: '18:00', is_available: true },
    { id: '3', day: 'Wednesday', start_time: '09:00', end_time: '18:00', is_available: true },
    { id: '4', day: 'Thursday', start_time: '09:00', end_time: '18:00', is_available: true },
    { id: '5', day: 'Friday', start_time: '09:00', end_time: '18:00', is_available: true },
    { id: '6', day: 'Saturday', start_time: '10:00', end_time: '16:00', is_available: true },
    { id: '7', day: 'Sunday', start_time: '', end_time: '', is_available: false },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<ScheduleSlot | null>(null);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleEdit = (schedule: ScheduleSlot) => {
    setEditingId(schedule.id);
    setEditData({ ...schedule });
  };

  const handleSave = () => {
    if (editData) {
      setSchedules(schedules.map(s => s.id === editData.id ? editData : s));
      setEditingId(null);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
  };

  const toggleAvailability = (id: string) => {
    setSchedules(schedules.map(s =>
      s.id === id ? { ...s, is_available: !s.is_available } : s
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[70px] pb-[70px]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between p-4 pt-12">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">My Schedule</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6 mt-4">
        {/* Current Week View */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Schedule</h2>
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>

          <div className="space-y-3">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className={`border rounded-xl p-4 transition-all ${
                  schedule.is_available ? 'border-gray-200 bg-white' : 'border-gray-200 bg-gray-50'
                }`}
              >
                {editingId === schedule.id ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{schedule.day}</h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleSave}
                          className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center hover:bg-green-200 transition-colors"
                        >
                          <Save className="w-4 h-4 text-green-600" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                        >
                          <X className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={editData?.start_time || ''}
                          onChange={(e) => setEditData(editData ? { ...editData, start_time: e.target.value } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={editData?.end_time || ''}
                          onChange={(e) => setEditData(editData ? { ...editData, end_time: e.target.value } : null)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editData?.is_available || false}
                        onChange={(e) => setEditData(editData ? { ...editData, is_available: e.target.checked } : null)}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Available on this day</span>
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{schedule.day}</h3>
                      <button
                        onClick={() => handleEdit(schedule)}
                        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {schedule.is_available ? (
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{schedule.start_time} - {schedule.end_time}</span>
                        </div>
                        <span className="text-green-600 font-medium">Available</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>Not Available</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Break Times */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Break Times</h2>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add Break
            </Button>
          </div>

          <div className="space-y-3">
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Lunch Break</h3>
                <button className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>13:00 - 14:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Save Changes */}
        <Button className="w-full">
          Save All Changes
        </Button>
      </div>
    </div>
  );
};
