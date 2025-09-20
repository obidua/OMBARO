import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder = "Select date",
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(value ? new Date(value) : new Date());

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    
    if (selectedDate) {
      setDate(selectedDate);
      const dateString = selectedDate.toISOString().split('T')[0];
      onChange(dateString);
    }
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return placeholder;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Calculate max date (18 years ago from today)
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={[
          styles.dateButton,
          error && styles.dateButtonError,
        ]}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.calendarIcon}>📅</Text>
        </View>
        <Text style={[
          styles.dateText,
          !value && styles.placeholderText,
        ]}>
          {formatDisplayDate(value)}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={maxDate}
          minimumDate={minDate}
        />
      )}

      {error && <Text style={styles.error}>{error}</Text>}
      
      <Text style={styles.helpText}>
        You must be at least 18 years old to use this service
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sm,
    fontWeight: '500',
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.xl,
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  dateButtonError: {
    borderColor: colors.error[500],
  },
  iconContainer: {
    marginRight: spacing.md,
  },
  calendarIcon: {
    fontSize: 20,
  },
  dateText: {
    fontSize: typography.base,
    color: colors.gray[900],
    flex: 1,
  },
  placeholderText: {
    color: colors.gray[400],
  },
  error: {
    fontSize: typography.sm,
    color: colors.error[600],
    marginTop: spacing.sm,
  },
  helpText: {
    fontSize: typography.xs,
    color: colors.gray[500],
    marginTop: spacing.xs,
  },
});