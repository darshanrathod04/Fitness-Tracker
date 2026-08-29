/**
 * FITPulse Enterprise Design System — Colors
 *
 * Semantic tokens so every screen stays consistent and future
 * theming (light/dark) can be swapped in one place.
 */

export const Palette = {
  // Brand
  primary: '#7C3AED',
  primaryDark: '#5B21B6',
  primaryLight: '#A78BFA',
  primarySoft: 'rgba(124, 58, 237, 0.16)',

  secondary: '#22D3EE',
  secondaryDark: '#0EA5B7',
  secondarySoft: 'rgba(34, 211, 238, 0.14)',

  accent: '#8B5CF6',
  accentSoft: 'rgba(139, 92, 246, 0.16)',

  // Status
  success: '#34D399',
  successDark: '#059669',
  successSoft: 'rgba(52, 211, 153, 0.14)',

  warning: '#FBBF24',
  warningDark: '#D97706',
  warningSoft: 'rgba(251, 191, 36, 0.14)',

  danger: '#F87171',
  dangerDark: '#DC2626',
  dangerSoft: 'rgba(248, 113, 113, 0.14)',

  info: '#38BDF8',
  infoSoft: 'rgba(56, 189, 248, 0.14)',

  // Neutrals
  bg: '#060A14',
  surface: '#0D1321',
  surfaceHigh: '#141C2E',
  surfaceRaised: '#1A2438',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.14)',

  // Text
  text: '#F1F5F9',
  textSecondary: '#A8B3C8',
  textMuted: '#6B7A94',
  textInverse: '#FFFFFF',
  textOnDark: '#94A3B8',

  // Brand gradients
  gradientPrimary: ['#7C3AED', '#5B21B6'] as const,
  gradientBrand: ['#7C5CFF', '#22D3EE'] as const,
  gradientDark: ['#0D1321', '#060A14'] as const,

  // Glass
  glassBg: 'rgba(17,24,39,0.72)',
  glassBorder: 'rgba(255,255,255,0.09)',
  glassHighlight: 'rgba(255,255,255,0.06)',

  // Charts
  chartGrid: '#1E293B',
  chartLine: '#334155',
  chartLabels: '#64748B',

  // ---- Deprecated aliases (kept for migration, remove later) ----
  white: '#FFFFFF',
  gray: '#64748B',
  card: '#171F2F',
  cyan: '#22D3EE',
  subText: '#94A3B8',
} as const;

/**
 * Backwards-compatible alias so existing imports keep working while
 * screens migrate to `Palette`.
 */
export const Colors = Palette;

export type AppColor = keyof typeof Palette;