import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Palette } from '../../theme/colors';
import { Radii } from '../../theme/radii';
import { Spacing } from '../../theme/spacing';

export interface SegmentOption<T extends string> {
  label: string;
  value: T;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <View style={styles.container}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <TouchableOpacity
            key={opt.value}
            style={[styles.segment, active && styles.active]}
            activeOpacity={0.8}
            onPress={() => onChange(opt.value)}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{opt.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Palette.surfaceHigh,
    borderRadius: Radii.md,
    padding: 4,
    gap: 4,
  },
  segment: {
    flex: 1,
    height: 36,
    borderRadius: Radii.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: Palette.surfaceRaised,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  label: { fontSize: 13, fontWeight: '600', color: Palette.textMuted },
  labelActive: { color: Palette.primaryLight },
});

export type { SegmentedControlProps };