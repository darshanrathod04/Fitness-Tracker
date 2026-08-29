import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Palette } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Typography } from '../../theme/typography';

export type BadgeTone = 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  icon?: React.ReactNode;
  size?: 'sm' | 'md';
}

const TONES: Record<BadgeTone, { bg: string; fg: string }> = {
  brand: { bg: Palette.primarySoft, fg: Palette.primaryLight },
  success: { bg: Palette.successSoft, fg: Palette.success },
  warning: { bg: Palette.warningSoft, fg: Palette.warning },
  danger: { bg: Palette.dangerSoft, fg: Palette.danger },
  info: { bg: Palette.infoSoft, fg: Palette.info },
  neutral: { bg: Palette.surfaceRaised, fg: Palette.textSecondary },
};

export default function Badge({ label, tone = 'neutral', icon, size = 'sm' }: BadgeProps) {
  const colors = TONES[tone];

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colors.bg },
        size === 'sm' ? styles.sm : styles.md,
      ]}
    >
      {icon}
      <Text style={[styles.label, { color: colors.fg }, size === 'md' && styles.labelMd]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radii.pill,
    alignSelf: 'flex-start',
    gap: 4,
  },
  sm: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  md: {
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  label: { ...Typography.caption, fontWeight: '700' },
  labelMd: { fontSize: 14 },
});

export type { BadgeProps };