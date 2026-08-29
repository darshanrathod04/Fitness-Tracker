import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette } from '../../theme/colors';
import { Radii } from '../../theme/radii';
import { Spacing } from '../../theme/spacing';
import { Typography } from '../../theme/typography';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function SectionHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
  icon,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {icon ? (
          <View style={styles.iconWrap}>
            <Ionicons name={icon} size={16} color={Palette.primaryLight} />
          </View>
        ) : null}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>

      {actionLabel && onAction ? (
        <TouchableOpacity onPress={onAction} style={styles.action} hitSlop={8}>
          <Text style={styles.actionLabel}>{actionLabel}</Text>
          <Ionicons name="chevron-forward" size={15} color={Palette.primaryLight} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, flex: 1 },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: Radii.sm,
    backgroundColor: Palette.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { ...Typography.subheading, color: Palette.text },
  subtitle: { ...Typography.small, color: Palette.textMuted, marginTop: 1 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  actionLabel: { ...Typography.caption, color: Palette.primaryLight, fontWeight: '700' },
});

export type { SectionHeaderProps };