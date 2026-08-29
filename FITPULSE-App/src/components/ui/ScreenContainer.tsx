import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Palette } from '../../theme/colors';
import { Layout } from '../../theme/layout';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  padded?: boolean;
  statusBarStyle?: 'light-content' | 'dark-content';
}

/**
 * Consistent top-level screen shell: safe areas, status bar theming,
 * optional gutter padding.
 */
export default function ScreenContainer({
  children,
  style,
  padded = true,
  statusBarStyle = 'light',
}: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle={statusBarStyle} backgroundColor={Palette.bg} />
      <View style={[padded && styles.padded, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Palette.bg,
  },
  padded: {
    paddingHorizontal: Layout.screenPadding,
    paddingTop: Layout.screenPaddingTop,
  },
});

export type { ScreenContainerProps };