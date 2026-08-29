import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { Palette, Radii, Spacing, Typography } from '../../theme';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const init = async () => {
      const token = await SecureStore.getItemAsync('jwt');

      setTimeout(() => {
        if (token) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        } else {
          navigation.replace('Login');
        }
      }, 1600);
    };

    init();
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#050816', '#0D1321', Palette.primaryDark]}
      style={styles.container}
    >
      <View style={styles.logoWrap}>
        <LinearGradient
          colors={[Palette.primary, Palette.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoInner}
        >
          <Ionicons name="fitness" size={44} color="#fff" />
        </LinearGradient>
      </View>

      <Text style={styles.brand}>FITPULSE</Text>

      <Text style={styles.tag}>
        Enterprise Fitness Intelligence
      </Text>

      <View style={styles.loader}>
        <View style={styles.loaderTrack}>
          <View style={styles.dot} />
        </View>
      </View>

      <Text style={styles.version}>v1.0.0 · SOC2-ready</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoWrap: {
    width: 112,
    height: 112,
    borderRadius: Radii.xxl,
    padding: 3,
    backgroundColor: Palette.glassBorder,
  },

  logoInner: {
    flex: 1,
    borderRadius: Radii.xl,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Palette.primary,
    shadowOpacity: 0.5,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },

  brand: {
    ...Typography.display,
    color: '#fff',
    marginTop: Spacing.xxl,
    letterSpacing: 2,
  },

  tag: {
    ...Typography.caption,
    color: '#C4B5FD',
    marginTop: Spacing.sm,
  },

  loader: {
    marginTop: Spacing.huge,
    width: 140,
    height: 6,
    borderRadius: Radii.pill,
    backgroundColor: Palette.surfaceRaised,
    overflow: 'hidden',
  },

  loaderTrack: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },

  dot: {
    width: 45,
    height: 6,
    borderRadius: Radii.pill,
    backgroundColor: Palette.secondary,
    alignSelf: 'flex-start',
  },

  version: {
    ...Typography.micro,
    color: Palette.textMuted,
    position: 'absolute',
    bottom: 48,
  },
});