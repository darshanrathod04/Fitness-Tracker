import { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import ScreenHeader from '../../components/ScreenHeader';
import { getAchievements, Achievement } from '../../api/achievementApi';

export default function AchievementsScreen() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setAchievements(await getAchievements(true));
    } catch (e) {
      Alert.alert('Error', 'Could not load achievements');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const earned = achievements.filter((a) => a.earned);
  const locked = achievements.filter((a) => !a.earned);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Achievements" subtitle="Earn badges and build streaks" />

      <ScrollView
        style={styles.body}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
      >
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>
            {earned.length} / {achievements.length}
          </Text>
          <Text style={styles.summaryLabel}>Badges earned</Text>
        </View>

        <Text style={styles.section}>Earned</Text>

        {earned.length === 0 && (
          <Text style={styles.empty}>No badges yet. Keep going!</Text>
        )}

        {earned.map((a) => (
          <View key={a.code} style={styles.badgeCard}>
            <View style={styles.badgeIcon}>
              <Ionicons name={iconOf(a.icon) as any} size={24} color="#FBBF24" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.badgeTitle}>{a.title}</Text>
              <Text style={styles.badgeDesc}>{a.description}</Text>
            </View>

            <Ionicons name="checkmark-circle" size={22} color="#4ADE80" />
          </View>
        ))}

        <Text style={styles.section}>Locked</Text>

        {locked.map((a) => (
          <View key={a.code} style={[styles.badgeCard, styles.lockedCard]}>
            <View style={[styles.badgeIcon, styles.lockedIcon]}>
              <Ionicons name="lock-closed" size={20} color="#64748B" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.lockedTitle}>{a.title}</Text>
              <Text style={styles.badgeDesc}>{a.description}</Text>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${Math.round(a.progress * 100)}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {Math.round(a.progress * 100)}%
              </Text>
            </View>
          </View>
        ))}

        <View style={{ height: 110 }} />
      </ScrollView>
    </View>
  );
}

const iconOf = (icon: string) =>
  ({
    flame: 'flame',
    trophy: 'trophy',
    calendar: 'calendar',
    bonfire: 'bonfire',
    flag: 'flag',
    scale: 'scale',
    water: 'water',
  }[icon] ?? 'trophy');
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070B16' },
  body: { padding: 18 },
  summaryCard: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 22,
    alignItems: 'center',
  },
  summaryValue: { color: '#fff', fontSize: 34, fontWeight: '800' },
  summaryLabel: { color: '#94A3B8', marginTop: 4 },
  section: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 14,
  },
  empty: { color: '#94A3B8', textAlign: 'center', paddingVertical: 24 },
  badgeCard: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#3B2F0B',
  },
  lockedCard: { borderColor: '#1F2937' },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  lockedIcon: { backgroundColor: '#0F172A' },
  badgeTitle: { color: '#FBBF24', fontWeight: '700', fontSize: 16 },
  lockedTitle: { color: '#94A3B8', fontWeight: '700', fontSize: 16 },
  badgeDesc: { color: '#64748B', fontSize: 13, marginTop: 4 },
  progressTrack: {
    height: 6,
    borderRadius: 4,
    backgroundColor: '#1E293B',
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: { height: 6, borderRadius: 4, backgroundColor: '#8B5CF6' },
  progressText: { color: '#8B5CF6', fontSize: 11, marginTop: 4, fontWeight: '600' },
});