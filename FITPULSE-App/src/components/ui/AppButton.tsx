import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Palette } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Typography } from '../../theme/typography';
import { Shadows } from '../../theme/shadows';
import { Layout } from '../../theme/layout';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface AppButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  fullWidth?: boolean;
  testID?: string;
}

const SIZES: Record<ButtonSize, { height: number; paddingHorizontal: number; fontSize: number }> = {
  sm: { height: 40, paddingHorizontal: Spacing.lg, fontSize: 14 },
  md: { height: 50, paddingHorizontal: Spacing.xl, fontSize: 15 },
  lg: { height: Layout.buttonHeight, paddingHorizontal: Spacing.xxl, fontSize: 16 },
};

const VARIANTS: Record<ButtonVariant, { bg: string; border?: string; text: string }> = {
  primary: { bg: Palette.primary, text: '#FFF' },
  secondary: { bg: Palette.secondary, text: '#062A2E' },
  ghost: { bg: 'transparent', text: Palette.textSecondary },
  danger: { bg: Palette.danger, text: '#FFF' },
  outline: { bg: 'transparent', border: Palette.borderStrong, text: Palette.text },
};

export default function AppButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  style,
  fullWidth,
  testID,
}: AppButtonProps) {
  const palette = VARIANTS[variant];
  const dims = SIZES[size];

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={0.82}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.base,
        {
          height: dims.height,
          paddingHorizontal: dims.paddingHorizontal,
          backgroundColor: palette.bg,
          borderColor: palette.border,
          opacity: isDisabled ? 0.5 : 1,
        },
        variant === 'primary' && Shadows.md,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'secondary' ? '#062A2E' : '#FFF'} />
      ) : (
        <>
          {icon}
          <Text style={[styles.label, { color: palette.text, fontSize: dims.fontSize }]}>
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: Spacing.sm,
  },
  fullWidth: { width: '100%' },
  label: { fontWeight: '700' as const },
});

export type { AppButtonProps };