import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

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
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  label,
  error,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              value === option.value && styles.optionSelected,
              error && styles.optionError,
            ]}
            onPress={() => onChange(option.value)}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              {option.icon && (
                <View style={[
                  styles.iconContainer,
                  value === option.value && styles.iconContainerSelected,
                ]}>
                  {option.icon}
                </View>
              )}
              <Text style={[
                styles.optionText,
                value === option.value && styles.optionTextSelected,
              ]}>
                {option.label}
              </Text>
            </View>
            {value === option.value && (
              <View style={styles.selectedIndicator}>
                <View style={styles.selectedDot} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
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
  optionsContainer: {
    gap: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.gray[200],
    borderRadius: borderRadius.xl,
    backgroundColor: colors.white,
  },
  optionSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  optionError: {
    borderColor: colors.error[500],
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconContainerSelected: {
    backgroundColor: colors.primary[100],
  },
  optionText: {
    fontSize: typography.base,
    fontWeight: '500',
    color: colors.gray[700],
  },
  optionTextSelected: {
    color: colors.primary[700],
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
  },
  error: {
    fontSize: typography.sm,
    color: colors.error[600],
    marginTop: spacing.sm,
  },
});