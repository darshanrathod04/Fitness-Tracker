import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';
import { Palette } from './src/theme';

// Enterprise dark navigation theme — consistent chrome, no flash of light UI.
const navTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: Palette.primary,
    background: Palette.bg,
    card: Palette.surface,
    text: Palette.text,
    border: Palette.border,
    notification: Palette.primary,
  },
};

export default function App() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.root}>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="light" backgroundColor={Palette.bg} />
          <AppNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});