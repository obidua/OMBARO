import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle, AlertCircle, Coffee } from 'lucide-react';
import { Button } from './Button';
import { ATTENDANCE_STATUS, AttendanceRecord, AttendanceStatus } from '../../types/services';

interface AttendanceTrackerProps {
  onMarkAttendance: (employeeId: string, status: AttendanceStatus, notes?: string) => void;
  className?: string;
}

export const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({
  onMarkAttendance,
  className = ''
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  // Mock employee data
  const employees = [
    { id: 'EMP001', name: 'Priya Sharma', role: 'Senior Therapist', shift: '9:00 AM - 6:00 PM' },
    { id: 'EMP002', name: 'Rahul Kumar', role: 'Massage Therapist', shift: '10:00 AM - 7:00 PM' },
    { id: 'EMP003', name: 'Anita Desai', role: 'Receptionist', shift: '8:00 AM - 5:00 PM' },
    { id: 'EMP004', name: 'Vikram Singh', role: 'Spa Manager', shift: '9:00 AM - 6:00 PM' },
    { id: 'EMP005', name: 'Meera Patel', role: 'Ayurvedic Specialist', shift: '11:00 AM - 8:00 PM' },
  ];

  // Mock attendance records for today
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'Priya Sharma',
      date: selectedDate,
      status: ATTENDANCE_STATUS.PRESENT,
      checkInTime: '8:55 AM',
      checkOutTime: '',
      location: 'Spa Center - Main'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'Rahul Kumar',
      date: selectedDate,
      status: ATTENDANCE_STATUS.LATE,
      checkInTime: '10:15 AM',
      checkOutTime: '',
      notes: 'Traffic delay',
      location: 'Spa Center - Main'
    }
  ]);

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case ATTENDANCE_STATUS.PRESENT:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case ATTENDANCE_STATUS.LATE:
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case ATTENDANCE_STATUS.ABSENT:
        return <XCircle className="w-5 h-5 text-red-600" />;
      case ATTENDANCE_STATUS.HALF_DAY:
        return <Coffee className="w-5 h-5 text-blue-600" />;
      case ATTENDANCE_STATUS.LEAVE:
        return <AlertCircle className="w-5 h-5 text-purple-600" />;
      default:
        return <User className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case ATTENDANCE_STATUS.PRESENT:
        return 'bg-green-100 text-green-700';
      case ATTENDANCE_STATUS.LATE:
        return 'bg-yellow-100 text-yellow-700';
      case ATTENDANCE_STATUS.ABSENT:
        return 'bg-red-100 text-red-700';
      case ATTENDANCE_STATUS.HALF_DAY:
        return 'bg-blue-100 text-blue-700';
      case ATTENDANCE_STATUS.LEAVE:
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleMarkAttendance = (employeeId: string, status: AttendanceStatus) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;

    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      employeeId,
      employeeName: employee.name,
      date: selectedDate,
      status,
      checkInTime: status === ATTENDANCE_STATUS.PRESENT || status === ATTENDANCE_STATUS.LATE 
        ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        : undefined,
      notes: notes || undefined,
      location: 'Spa Center - Main'
    };

    setAttendanceRecords(prev => {
      const filtered = prev.filter(record => record.employeeId !== employeeId);
      return [...filtered, newRecord];
    });

    onMarkAttendance(employeeId, status, notes);
    setNotes('');
  };

  const getEmployeeAttendance = (employeeId: string) => {
    return attendanceRecords.find(record => record.employeeId === employeeId);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Attendance Tracker</h2>
          <p className="text-gray-600">Mark and track employee attendance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={today}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Object.entries(ATTENDANCE_STATUS).map(([key, status]) => {
          const count = attendanceRecords.filter(record => record.status === status).length;
          return (
            <div key={key} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                {getStatusIcon(status)}
                <div>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-sm text-gray-600 capitalize">{status.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Employee Attendance</h3>
        </div>
        
        <div className="p-6 space-y-4">
          {employees.map((employee) => {
            const attendance = getEmployeeAttendance(employee.id);
            
            return (
              <div key={employee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{employee.name}</h4>
                    <p className="text-sm text-gray-600">{employee.role}</p>
                    <p className="text-xs text-gray-500">{employee.shift}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {attendance ? (
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(attendance.status)}
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(attendance.status)}`}>
                            {attendance.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        {attendance.checkInTime && (
                          <p className="text-xs text-gray-500 mt-1">
                            Check-in: {attendance.checkInTime}
                          </p>
                        )}
                        {attendance.notes && (
                          <p className="text-xs text-gray-600 mt-1">
                            Note: {attendance.notes}
                          </p>
                        )}
                      </div>
                      <Button
                        onClick={() => {
                          setAttendanceRecords(prev => 
                            prev.filter(record => record.employeeId !== employee.id)
                          );
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Reset
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleMarkAttendance(employee.id, ATTENDANCE_STATUS.PRESENT)}
                          className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center hover:bg-green-200 transition-colors"
                          title="Present"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </button>
                        <button
                          onClick={() => handleMarkAttendance(employee.id, ATTENDANCE_STATUS.LATE)}
                          className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center hover:bg-yellow-200 transition-colors"
                          title="Late"
                        >
                          <Clock className="w-4 h-4 text-yellow-600" />
                        </button>
                        <button
                          onClick={() => handleMarkAttendance(employee.id, ATTENDANCE_STATUS.ABSENT)}
                          className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                          title="Absent"
                        >
                          <XCircle className="w-4 h-4 text-red-600" />
                        </button>
                        <button
                          onClick={() => handleMarkAttendance(employee.id, ATTENDANCE_STATUS.HALF_DAY)}
                          className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                          title="Half Day"
                        >
                          <Coffee className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleMarkAttendance(employee.id, ATTENDANCE_STATUS.LEAVE)}
                          className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center hover:bg-purple-200 transition-colors"
                          title="Leave"
                        >
                          <AlertCircle className="w-4 h-4 text-purple-600" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Notes (Optional)</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any notes about attendance (e.g., reason for lateness, early departure, etc.)"
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </div>
  );
};