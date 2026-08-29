/**
 * FITPulse Enterprise Design System — Typography
 */

export const Typography = {
  display: { fontSize: 38, lineHeight: 44, fontWeight: '800' as const },
  title: { fontSize: 28, lineHeight: 34, fontWeight: '800' as const },
  heading: { fontSize: 22, lineHeight: 28, fontWeight: '700' as const },
  subheading: { fontSize: 18, lineHeight: 24, fontWeight: '700' as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontWeight: '600' as const },
  label: { fontSize: 14, lineHeight: 20, fontWeight: '600' as const },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '500' as const },
  small: { fontSize: 12, lineHeight: 16, fontWeight: '500' as const },
  micro: { fontSize: 11, lineHeight: 14, fontWeight: '600' as const },
  numeric: { fontSize: 32, lineHeight: 38, fontWeight: '800' as const },
} as const;

export type TypographyVariant = keyof typeof Typography;