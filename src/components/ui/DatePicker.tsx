import React from 'react';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder = "Select date",
  className = ''
}) => {
  const inputId = `datepicker-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${inputId}-error`;
  const helpId = `${inputId}-help`;

  // Calculate max date (18 years ago from today)
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const maxDateString = maxDate.toISOString().split('T')[0];

  // Calculate min date (100 years ago from today)
  const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
  const minDateString = minDate.toISOString().split('T')[0];

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        <input
          id={inputId}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={minDateString}
          max={maxDateString}
          placeholder={placeholder}
          aria-describedby={`${error ? errorId + ' ' : ''}${helpId}`}
          aria-invalid={error ? 'true' : 'false'}
          className={`
            w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
        />
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <p id={helpId} className="mt-1 text-xs text-gray-500">
        You must be at least 18 years old to use this service
      </p>
    </div>
  );
};