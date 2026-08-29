import { View, StyleSheet } from 'react-native';
import { Palette, Radii, Spacing, Shadows } from '../theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: any;
}

export default function GlassCard({ children, style }: GlassCardProps) {
  return <View style={[styles.card, Shadows.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.glassBg,
    borderRadius: Radii.xl,
    padding: Spacing.lg,

    borderWidth: 1,
    borderColor: Palette.glassBorder,

    shadowColor: Palette.primary,
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});