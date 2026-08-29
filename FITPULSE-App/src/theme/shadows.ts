/**
 * FITPulse Enterprise Design System — Shadows
 * Platform-aware: native uses elevation + shadow props, web uses boxShadow.
 */
import { Platform } from 'react-native';
import { Palette } from './colors';

type ShadowPreset = {
  elevation: number;
  shadowColor: string;
  shadowOpacity: number;
  shadowRadius: number;
  shadowOffset: { width: number; height: number };
  boxShadow?: string;
};

const native = (
  elevation: number,
  color: string,
  opacity: number,
  radius: number,
  y: number,
): ShadowPreset => ({
  elevation,
  shadowColor: color,
  shadowOpacity: opacity,
  shadowRadius: radius,
  shadowOffset: { width: 0, height: y },
});

export const Shadows: Record<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'card' | 'glow', ShadowPreset> = {
  none: native(0, '#000', 0, 0, 0),
  xs: native(2, '#000', 0.14, 8, 2),
  sm: native(3, '#000', 0.18, 10, 3),
  md: native(5, '#000', 0.22, 14, 6),
  lg: native(8, '#000', 0.28, 20, 10),
  card: native(4, Palette.primary, 0.14, 16, 8),
  glow: native(10, Palette.primary, 0.35, 24, 0),
};

// Web renders shadows via boxShadow, which RN supports on web.
if (Platform.OS === 'web') {
  Object.assign(Shadows, {
    xs: { ...Shadows.xs, boxShadow: '0 2px 8px rgba(0,0,0,0.14)' },
    sm: { ...Shadows.sm, boxShadow: '0 3px 10px rgba(0,0,0,0.18)' },
    md: { ...Shadows.md, boxShadow: '0 6px 14px rgba(0,0,0,0.22)' },
    lg: { ...Shadows.lg, boxShadow: '0 10px 20px rgba(0,0,0,0.28)' },
    card: { ...Shadows.card, boxShadow: '0 8px 16px rgba(124,58,237,0.14)' },
    glow: { ...Shadows.glow, boxShadow: '0 10px 24px rgba(124,58,237,0.35)' },
  });
}