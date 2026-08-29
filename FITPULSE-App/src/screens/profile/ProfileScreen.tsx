import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';

import { getMe } from '../../api/userApi';
import {
  AppCard,
  Avatar,
  Badge,
  ScreenContainer,
  SectionHeader,
} from '../../components/ui';
import { Palette, Radii, Spacing, Typography } from '../../theme';

const FEATURES = [
  { name: 'Goals', icon: 'flag' as any, screen: 'Goals', tint: '#F472B6' },
  { name: 'Nutrition', icon: 'restaurant' as any, screen: 'Nutrition', tint: '#22D3EE' },
  { name: 'Weight Log', icon: 'scale' as any, screen: 'Weight', tint: '#FBBF24' },
  { name: 'Achievements', icon: 'trophy' as any, screen: 'Achievements', tint: '#FBBF24' },
  { name: 'Progress', icon: 'stats-chart' as any, screen: 'Progress', tint: '#4ADE80' },
];

interface UserData {
  name?: string;
  email?: string;
  role?: string;
  age?: number | null;
  height?: number | null;
  weight?: number | null;
  id?: number;
}

export default function ProfileScreen({ navigation }: any) {
  const [user, setUser] = useState<UserData | null>(null);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await getMe();
      setUser(data);
    } catch (e) {
      console.log('Profile load error:', e);
    }
  };

  const bmi =
    user?.weight && user?.height
      ? (user.weight / Math.pow(user.height / 100, 2)).toFixed(1)
      : '—';

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Profile header */}
        <LinearGradient
          colors={[Palette.primary, Palette.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Avatar name={user?.name} size="xl" />
          <Text style={styles.name}>{user?.name ?? 'Loading…'}</Text>
          <Text style={styles.email}>{user?.email ?? ''}</Text>

          <View style={styles.badges}>
            <Badge
              label={isAdmin ? 'Administrator' : 'Member'}
              tone={isAdmin ? 'warning' : 'info'}
              icon={
                <Ionicons
                  name={isAdmin ? 'shield-checkmark' : 'person-circle'}
                  size={13}
                  color={isAdmin ? Palette.warning : Palette.info}
                />
              }
            />
            <Badge label={`ID #${user?.id ?? '—'}`} tone="neutral" />
          </View>
        </LinearGradient>

        {/* Metric strip */}
        <View style={styles.metrics}>
          <MetricBox label="Age" value={user?.age ? `${user.age} yrs` : '—'} icon="calendar-outline" />
          <MetricBox label="Height" value={user?.height ? `${user.height} cm` : '—'} icon="resize-outline" />
          <MetricBox label="Weight" value={user?.weight ? `${user.weight} kg` : '—'} icon="barbell-outline" />
          <MetricBox label="BMI" value={bmi} icon="pulse-outline" />
        </View>

        {/* Features */}
        <View style={styles.section}>
          <SectionHeader title="Features" subtitle="Your fitness toolkit" />
          <AppCard padded>
            {FEATURES.map((f, i) => (
              <TouchableOpacity
                key={f.screen}
                style={[styles.featureRow, i < FEATURES.length - 1 && styles.featureDivider]}
                onPress={() => navigation.navigate(f.screen)}
                activeOpacity={0.7}
              >
                <View style={[styles.featureIcon, { backgroundColor: `${f.tint}22` }]}>
                  <Ionicons name={f.icon} size={18} color={f.tint} />
                </View>
                <Text style={styles.featureLabel}>{f.name}</Text>
                <Ionicons name="chevron-forward" size={18} color={Palette.textMuted} />
              </TouchableOpacity>
            ))}
          </AppCard>
        </View>
{/* Account */}
        <View style={styles.section}>
          <SectionHeader title="Account" subtitle="Security & membership" />
          <AppCard padded>
            <InfoRow label="Role" value={isAdmin ? 'Administrator' : 'Member'} />
            <InfoRow label="Email" value={user?.email ?? '—'} />
            <InfoRow label="Member ID" value={user?.id ? `#${user.id}` : '—'} last />
          </AppCard>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logout} onPress={handleLogout} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Sign out</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>FITPULSE · Enterprise Fitness Intelligence v1.0</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

function MetricBox({ label, value, icon }: { label: string; value: string; icon: any }) {
  return (
    <View style={styles.metricBox}>
      <Ionicons name={icon} size={16} color={Palette.primaryLight} />
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function InfoRow({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.row, !last && styles.rowDivider]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: Spacing.xxxl },

  header: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
    borderRadius: Radii.xxl,
    marginBottom: Spacing.lg,
  },
  name: { ...Typography.heading, color: '#fff', marginTop: Spacing.md },
  email: { ...Typography.caption, color: Palette.textOnDark, marginTop: Spacing.xs },
  badges: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.md },

  metrics: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  metricBox: {
    flex: 1,
    backgroundColor: Palette.surface,
    borderRadius: Radii.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Palette.border,
  },
  metricValue: {
    ...Typography.caption,
    color: Palette.text,
    fontWeight: '700',
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  metricLabel: {
    ...Typography.micro,
    color: Palette.textMuted,
    marginTop: 2,
  },

  section: { marginBottom: Spacing.lg },
  featureRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md },
  featureDivider: { borderBottomWidth: 1, borderBottomColor: Palette.border },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: Radii.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  featureLabel: { ...Typography.bodyStrong, color: Palette.text, flex: 1 },

  row: { paddingVertical: Spacing.md },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: Palette.border },
  label: { ...Typography.caption, color: Palette.textMuted },
  value: { ...Typography.caption, color: Palette.text, fontWeight: '700', marginTop: 2 },

  logout: {
    flexDirection: 'row',
    backgroundColor: Palette.dangerDark,
    height: 54,
    borderRadius: Radii.lg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoutText: { color: '#fff', fontWeight: '700', fontSize: 15 },

  footer: {
    ...Typography.micro,
    color: Palette.textMuted,
    textAlign: 'center',
    marginTop: Spacing.xxl,
  },
});