import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette } from '../theme/colors';
import { Spacing } from '../theme/spacing';
import { Typography } from '../theme/typography';
import AppButton from './ui/AppButton';

interface ErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

/**
 * Root crash boundary. Shows a professional fallback instead of a blank
 * screen when an unexpected render error occurs.
 */
export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren<Record<string, unknown>>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error) {
    console.error('[FITPulse] Unhandled render error:', error);
  }

  private reset = () => this.setState({ hasError: false, message: undefined });

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <Ionicons name="shield-checkmark-outline" size={40} color={Palette.warning} />
        </View>
        <Text style={styles.title}>Unexpected Error</Text>
        <Text style={styles.message}>
          {this.state.message ?? 'Something went wrong. Please restart the app.'}
        </Text>
        <View style={styles.action}>
          <AppButton label="Reload App" onPress={this.reset} variant="primary" size="md" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxxl,
  },
  iconWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: Palette.warningSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: { ...Typography.title, color: Palette.text, textAlign: 'center' },
  message: {
    ...Typography.caption,
    color: Palette.textMuted,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  action: { marginTop: Spacing.xxl },
});