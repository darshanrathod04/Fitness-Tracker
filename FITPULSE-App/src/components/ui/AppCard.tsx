import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Palette } from '../../theme/colors';
import { Radii } from '../../theme/radii';
import { Spacing } from '../../theme/spacing';
import { Shadows } from '../../theme/shadows';

interface AppCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  elevated?: boolean;
  padded?: boolean;
}

/**
 * Base surface card. Use for list items, stat groups, panels.
 */
export default function AppCard({
  children,
  style,
  elevated = false,
  padded = true,
}: AppCardProps) {
  return (
    <View
      style={[
        styles.card,
        elevated && Shadows.card,
        padded && styles.padded,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surface,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: Palette.border,
    overflow: 'hidden',
  },
  padded: { padding: Spacing.lg },
});

export type { AppCardProps };