import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { getMe } from '../../api/userApi';

import API from '../../api/api';
import { AppButton, FormField, ScreenContainer } from '../../components/ui';
import { Palette, Radii, Spacing, Typography } from '../../theme';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Validation', 'Email & password are required.');
      return;
    }

    try {
      setLoading(true);

      const res = await API.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password,
      });

      await SecureStore.setItemAsync('jwt', res.data.token);

      const me = await getMe();

      navigation.reset({
        index: 0,
        routes: [{ name: me.role === 'ADMIN' ? 'Admin' : 'Main' }],
      });
    } catch (e: any) {
      console.log('Login error:', e?.response?.status, e?.response?.data);
      Alert.alert(
        'Login Failed',
        e?.response?.data?.error || 'Invalid credentials. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Brand hero */}
          <View style={styles.hero}>
            <LinearGradient
              colors={['rgba(124,58,237,0.22)', 'rgba(34,211,238,0.10)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoWrap}
            >
              <Ionicons name="fitness" size={34} color={Palette.primaryLight} />
            </LinearGradient>

            <Text style={styles.brand}>FITPULSE</Text>
            <Text style={styles.heroTitle}>Welcome back</Text>
            <Text style={styles.heroSub}>
              Sign in to continue your enterprise fitness journey
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <FormField
              label="Email"
              icon="mail-outline"
              placeholder="you@company.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />

            <FormField
              label="Password"
              icon="lock-closed-outline"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secure
              autoComplete="current-password"
              onSubmitEditing={login}
              returnKeyType="go"
            />

            <View style={styles.optionsRow}>
              <Pressable style={styles.checkboxRow} onPress={() => setRemember((r) => !r)}>
                <View style={[styles.checkbox, remember && styles.checkboxOn]}>
                  {remember ? <Ionicons name="checkmark" size={13} color="#fff" /> : null}
                </View>
                <Text style={styles.checkboxLabel}>Remember me</Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  Alert.alert('Password Reset', 'Contact your administrator to reset your password.')
                }
              >
                <Text style={styles.forgot}>Forgot password?</Text>
              </Pressable>
            </View>

            <AppButton
              label="Sign In"
              onPress={login}
              loading={loading}
              size="lg"
              fullWidth
              style={styles.submit}
            />
          </View>
{/* Trust footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>New to FITPulse?</Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.footerLink}>Create an account</Text>
            </Pressable>

            <View style={styles.securityRow}>
              <Ionicons name="shield-checkmark-outline" size={14} color={Palette.textMuted} />
              <Text style={styles.securityLabel}>Enterprise-grade security · SSO-ready</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 0 },
  flex: { flex: 1 },
  scroll: { paddingHorizontal: Spacing.xxl, paddingBottom: Spacing.xxl },

  hero: { alignItems: 'center', marginTop: Spacing.huge },
  logoWrap: {
    width: 72,
    height: 72,
    borderRadius: Radii.xxl,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Palette.glassBorder,
  },
  brand: {
    ...Typography.micro,
    color: Palette.primaryLight,
    letterSpacing: 6,
    marginTop: Spacing.md,
    fontWeight: '800',
  },
  heroTitle: {
    ...Typography.display,
    color: Palette.text,
    marginTop: Spacing.sm,
  },
  heroSub: {
    ...Typography.caption,
    color: Palette.textMuted,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },

  form: { marginTop: Spacing.xxxl },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Palette.borderStrong,
    backgroundColor: Palette.surfaceHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxOn: { backgroundColor: Palette.primary, borderColor: Palette.primary },
  checkboxLabel: { ...Typography.caption, color: Palette.textSecondary },
  forgot: { ...Typography.caption, color: Palette.primaryLight, fontWeight: '600' },

  submit: { marginTop: Spacing.xs },

  footer: { alignItems: 'center', marginTop: Spacing.xxxl },
  footerText: { ...Typography.caption, color: Palette.textMuted },
  footerLink: {
    ...Typography.caption,
    color: Palette.secondary,
    fontWeight: '700',
    marginTop: Spacing.xs,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.xxl,
  },
  securityLabel: { ...Typography.micro, color: Palette.textMuted },
});