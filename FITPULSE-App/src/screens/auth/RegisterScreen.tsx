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
import { Ionicons } from '@expo/vector-icons';
import API from '../../api/api';
import { AppButton, FormField, ScreenContainer } from '../../components/ui';
import { Palette, Radii, Spacing, Typography } from '../../theme';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirm: string;
  age: string;
  height: string;
  weight: string;
}

const EMPTY: RegisterForm = {
  name: '',
  email: '',
  password: '',
  confirm: '',
  age: '',
  height: '',
  weight: '',
};

export default function RegisterScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<RegisterForm>(EMPTY);

  const update = <K extends keyof RegisterForm>(key: K, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const register = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      Alert.alert('Required', 'Name, email & password are mandatory.');
      return;
    }

    if (form.password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    if (form.password !== form.confirm) {
      Alert.alert('Mismatch', 'Passwords do not match.');
      return;
    }

    try {
      setLoading(true);

      await API.post('/auth/register', {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        age: form.age ? parseInt(form.age, 10) : null,
        height: form.height ? parseFloat(form.height) : null,
        weight: form.weight ? parseFloat(form.weight) : null,
      });

      Alert.alert('Success', 'Account created successfully. Please sign in.');
      navigation.replace('Login');
    } catch (e: any) {
      console.log('Register error:', e?.response?.data);
      Alert.alert(
        'Registration Failed',
        e?.response?.data?.error || e?.response?.data?.email ||
          'Something went wrong. Please try again.',
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
          {/* Header */}
          <View style={styles.header}>
            <Pressable style={styles.back} onPress={() => navigation.goBack()} hitSlop={8}>
              <Ionicons name="arrow-back" size={22} color={Palette.text} />
            </Pressable>
            <Text style={styles.eyebrow}>FITPULSE</Text>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>
              Join the enterprise fitness intelligence platform
            </Text>
          </View>

          {/* Personal */}
          <Text style={styles.sectionLabel}>Personal</Text>
          <FormField
            label="Full name"
            icon="person-outline"
            placeholder="Alex Carter"
            value={form.name}
            onChangeText={(v) => update('name', v)}
            autoComplete="name"
          />
          <FormField
            label="Email"
            icon="mail-outline"
            placeholder="you@company.com"
            value={form.email}
            onChangeText={(v) => update('email', v)}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
{/* Security */}
          <Text style={styles.sectionLabel}>Security</Text>
          <FormField
            label="Password"
            icon="lock-closed-outline"
            placeholder="Min 6 characters"
            value={form.password}
            onChangeText={(v) => update('password', v)}
            secure
            autoComplete="new-password"
          />
          <FormField
            label="Confirm password"
            icon="shield-checkmark-outline"
            placeholder="Re-enter password"
            value={form.confirm}
            onChangeText={(v) => update('confirm', v)}
            secure
            autoComplete="new-password"
          />

          {/* Optional metrics */}
          <Text style={styles.sectionLabel}>Body metrics (optional)</Text>
          <View style={styles.metricRow}>
            <View style={styles.metricItem}>
              <FormField
                label="Age"
                icon="calendar-outline"
                placeholder="28"
                value={form.age}
                onChangeText={(v) => update('age', v)}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.metricItem}>
              <FormField
                label="Height (cm)"
                icon="resize-outline"
                placeholder="175"
                value={form.height}
                onChangeText={(v) => update('height', v)}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <View style={styles.metricRow}>
            <View style={styles.metricItem}>
              <FormField
                label="Weight (kg)"
                icon="barbell-outline"
                placeholder="72"
                value={form.weight}
                onChangeText={(v) => update('weight', v)}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <AppButton
            label="Create Account"
            onPress={register}
            loading={loading}
            size="lg"
            fullWidth
            style={styles.submit}
          />

          <Pressable style={styles.loginLink} onPress={() => navigation.replace('Login')}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginBold}>Sign in</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 0 },
  flex: { flex: 1 },
  scroll: { paddingHorizontal: Spacing.xxl, paddingBottom: Spacing.xxl },

  header: { marginTop: Spacing.xl },
  back: {
    width: 40,
    height: 40,
    borderRadius: Radii.md,
    backgroundColor: Palette.surfaceHigh,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  eyebrow: {
    ...Typography.micro,
    color: Palette.primaryLight,
    letterSpacing: 5,
    fontWeight: '800',
  },
  title: { ...Typography.title, color: Palette.text, marginTop: Spacing.sm },
  subtitle: {
    ...Typography.caption,
    color: Palette.textMuted,
    marginTop: Spacing.xs,
  },

  sectionLabel: {
    ...Typography.label,
    color: Palette.textSecondary,
    marginTop: Spacing.xxl,
    marginBottom: Spacing.md,
  },

  metricRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  metricItem: { flex: 1 },

  submit: { marginTop: Spacing.xl },
  loginLink: { alignItems: 'center', marginTop: Spacing.xl },
  loginText: { ...Typography.caption, color: Palette.textMuted },
  loginBold: { color: Palette.secondary, fontWeight: '700' },
});