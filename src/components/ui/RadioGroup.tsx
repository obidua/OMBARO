import React from 'react';

interface RadioOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  label,
  error,
  className = ''
}) => {
  const groupId = `radio-group-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label id={`${groupId}-label`} className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
      )}
      <div 
        role="radiogroup" 
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={error ? `${groupId}-error` : undefined}
        className="grid grid-cols-1 gap-3"
      >
        {options.map((option) => (
          <label
            key={option.value}
            role="radio"
            aria-checked={value === option.value}
            tabIndex={0}
            className={`
              relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200
              ${value === option.value 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 hover:border-gray-300 bg-white'
              }
              ${error ? 'border-red-500' : ''}
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
            `}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onChange(option.value);
              }
            }}
          >
            <input
              type="radio"
              name={groupId}
              id={`${groupId}-${option.value}`}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
              aria-describedby={error ? `${groupId}-error` : undefined}
            />
            <div className="flex items-center space-x-3 w-full">
              {option.icon && (
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${value === option.value ? 'bg-purple-100' : 'bg-gray-100'}
                `}>
                  {option.icon}
                </div>
              )}
              <span className={`
                font-medium
                ${value === option.value ? 'text-purple-700' : 'text-gray-700'}
              `}>
                {option.label}
              </span>
            </div>
            {value === option.value && (
              <div 
                className="absolute right-4 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${groupId}-error`} className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};