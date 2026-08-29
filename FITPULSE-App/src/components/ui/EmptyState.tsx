import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { Typography } from '../../theme/typography';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon = 'file-tray-outline',
  title,
  message,
  action,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={34} color={Palette.textMuted} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.xxl,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Palette.surfaceHigh,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: { ...Typography.subheading, color: Palette.text, textAlign: 'center' },
  message: {
    ...Typography.caption,
    color: Palette.textMuted,
    textAlign: 'center',
    marginTop: Spacing.sm,
    lineHeight: 20,
  },
  action: { marginTop: Spacing.xl },
});

export type { EmptyStateProps };