import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Palette } from '../../theme/colors';
import { Radii } from '../../theme/radii';

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  radius?: number;
  style?: ViewStyle | ViewStyle[];
}

/**
 * Animated placeholder block used during async data loading.
 */
export default function Skeleton({
  width = '100%',
  height = 16,
  radius = Radii.sm,
  style,
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.85,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.block,
        { width, height, borderRadius: radius, opacity },
        style,
      ]}
    />
  );
}

export function SkeletonRow({ lines = 1 }: { lines?: number }) {
  return (
    <View style={styles.row}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height={14} width="100%" style={i > 0 ? styles.gap : undefined} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  block: { backgroundColor: Palette.surfaceRaised },
  row: { gap: 10 },
  gap: { marginTop: 6 },
});

export type { SkeletonProps };