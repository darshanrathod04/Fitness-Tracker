/**
 * FITPulse Enterprise Design System — Spacing scale
 * Based on a 4pt grid.
 */
export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  massive: 48,
};

export const Gutter = Spacing.lg;

export type SpacingToken = keyof typeof Spacing;