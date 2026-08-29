import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette } from '../../theme/colors';
import { Layout } from '../../theme/layout';
import { Radii } from '../../theme/radii';

interface AvatarProps {
  name?: string | null;
  uri?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: keyof typeof Ionicons.glyphMap;
}

const SIZES = {
  sm: Layout.avatarSm,
  md: Layout.avatarMd,
  lg: Layout.avatarLg,
  xl: Layout.avatarXl,
} as const;

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Initials-based avatar — professional and offline-safe (no remote image
 * dependency). Pass `uri` to render a photo instead.
 */
export default function Avatar({ name, uri, size = 'md', icon }: AvatarProps) {
  const dim = SIZES[size];
  const radius = dim / 2;

  if (uri) {
    return (
      <View style={[styles.circle, { width: dim, height: dim, borderRadius: radius }]}>
        <Ionicons name="person" size={dim * 0.5} color={Palette.textInverse} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.circle,
        styles.fallback,
        { width: dim, height: dim, borderRadius: radius },
      ]}
    >
      {icon ? (
        <Ionicons name={icon} size={dim * 0.48} color={Palette.primaryLight} />
      ) : (
        <Text style={[styles.text, { fontSize: dim * 0.38 }]}>
          {name ? initials(name) : 'FP'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  fallback: {
    backgroundColor: Palette.primarySoft,
    borderWidth: 1,
    borderColor: Palette.primaryDark,
  },
  text: {
    color: Palette.primaryLight,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});

export type { AvatarProps };