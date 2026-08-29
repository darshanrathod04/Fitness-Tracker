import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette } from '../../theme/colors';
import { Radii } from '../../theme/radii';
import { Spacing } from '../../theme/spacing';
import AppCard from './AppCard';

export type MetricTone = 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface MetricCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon: keyof typeof Ionicons.glyphMap;
  tone?: MetricTone;
  trend?: 'up' | 'down' | 'flat';
  trendText?: string;
}

const TONES: Record<MetricTone, { bg: string; fg: string }> = {
  brand: { bg: Palette.primarySoft, fg: Palette.primaryLight },
  success: { bg: Palette.successSoft, fg: Palette.success },
  warning: { bg: Palette.warningSoft, fg: Palette.warning },
  danger: { bg: Palette.dangerSoft, fg: Palette.danger },
  info: { bg: Palette.infoSoft, fg: Palette.info },
  neutral: { bg: Palette.surfaceHigh, fg: Palette.textSecondary },
};

const TREND_ICON = { up: 'trending-up', down: 'trending-down', flat: 'remove' } as const;

/**
 * KPI stat card used across dashboards and admin views.
 */
export default function MetricCard({
  label,
  value,
  sublabel,
  icon,
  tone = 'brand',
  trend,
  trendText,
}: MetricCardProps) {
  const colors = TONES[tone];

  return (
    <AppCard style={styles.card} padded>
      <View style={[styles.iconWrap, { backgroundColor: colors.bg }]}>
        <Ionicons name={icon} size={20} color={colors.fg} />
      </View>

      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>

      {sublabel || trend ? (
        <View style={styles.footer}>
          {trend ? (
            <Ionicons
              name={TREND_ICON[trend]}
              size={14}
              color={trend === 'down' ? Palette.danger : Palette.success}
            />
          ) : null}
          <Text style={styles.sublabel} numberOfLines={1}>
            {trendText ?? sublabel}
          </Text>
        </View>
      ) : null}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1 },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radii.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  label: { fontSize: 13, color: Palette.textMuted, fontWeight: '600' },
  value: {
    fontSize: 26,
    fontWeight: '800',
    color: Palette.text,
    marginTop: 2,
  },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: Spacing.sm },
  sublabel: { fontSize: 12, color: Palette.textMuted, flexShrink: 1 },
});

export type { MetricCardProps };