import { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import ScreenHeader from '../../components/ScreenHeader';
import { getAnalytics, Analytics } from '../../api/analyticsApi';

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function ProgressScreen() {
  const [range, setRange] = useState<'WEEK' | 'MONTH'>('WEEK');
  const [data, setData] = useState<Analytics | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setData(await getAnalytics(range));
    } catch (e) {
      console.log('Progress load error', e);
    } finally {
      setLoading(false);
    }
  }, [range]);

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

  const days = (data?.dailySeries ?? []).reduce<Record<string, number>>(
    (acc, p) => {
      const d = new Date(p.date);
      const label = DAY_LABELS[(d.getDay() + 6) % 7]; // Monday-first
      acc[label] = (acc[label] ?? 0) + p.minutes;
      return acc;
    },
    {},
  );
  const maxDay = Math.max(...Object.values(days), 1);
  const breakdownValues = Object.values(data?.activityBreakdown ?? {});
  const breakdownTotal = breakdownValues.reduce((a, b) => a + b, 0) || 1;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Progress" subtitle="Your weekly & monthly analytics" />

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
        <View style={styles.segRow}>
          {(['WEEK', 'MONTH'] as const).map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.seg, range === r && styles.segActive]}
              onPress={() => setRange(r)}
            >
              <Text style={[styles.segText, range === r && styles.segTextActive]}>
                {r === 'WEEK' ? '7 Days' : '30 Days'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading && !data ? (
          <ActivityIndicator size="large" color="#22D3EE" style={{ marginTop: 40 }} />
        ) : (
          <>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Ionicons name="flame" size={22} color="#FB7185" />
                <Text style={styles.statValue}>{Math.round(data?.totalCalories ?? 0)}</Text>
                <Text style={styles.statLabel}>kcal burned</Text>
              </View>

              <View style={styles.statCard}>
                <Ionicons name="time" size={22} color="#22D3EE" />
                <Text style={styles.statValue}>
                  {Math.round(data?.totalActiveMinutes ?? 0)}m
                </Text>
                <Text style={styles.statLabel}>active time</Text>
              </View>

              <View style={styles.statCard}>
                <Ionicons name="footsteps" size={22} color="#4ADE80" />
                <Text style={styles.statValue}>
                  {(data?.totalSteps ?? 0).toLocaleString()}
                </Text>
                <Text style={styles.statLabel}>steps</Text>
              </View>

              <View style={styles.statCard}>
                <Ionicons name="calendar" size={22} color="#C084FC" />
                <Text style={styles.statValue}>{data?.daysActive ?? 0}</Text>
                <Text style={styles.statLabel}>days active</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Streak</Text>
              <View style={styles.streakRow}>
                <View style={styles.streakBox}>
                  <Text style={styles.streakValue}>{data?.streak.current ?? 0}</Text>
                  <Text style={styles.streakLabel}>current (days)</Text>
                </View>
                <View style={styles.streakBox}>
                  <Text style={styles.streakValue}>{data?.streak.best ?? 0}</Text>
                  <Text style={styles.streakLabel}>best (days)</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Active Minutes by Day</Text>
              <View style={styles.chart}>
                {DAY_LABELS.map((day, i) => {
                  const v = days[day] ?? 0;
                  const h = (v / maxDay) * 120;
                  return (
                    <View key={`${day}-${i}`} style={styles.barWrap}>
                      <View style={[styles.bar, { height: Math.max(h, 4) }]} />
                      <Text style={styles.dayLabel}>{day}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          <View style={styles.card}>
              <Text style={styles.cardTitle}>Weight Trend</Text>
              {!data?.weightHistory?.length ? (
                <Text style={styles.emptyText}>Log weight to see your trend.</Text>
              ) : (
                <View style={styles.trendRow}>
                  <View style={styles.trendBox}>
                    <Text style={styles.trendValue}>
                      {data?.weightChange?.start} kg
                    </Text>
                    <Text style={styles.trendLabel}>start</Text>
                  </View>

                  <Ionicons name="arrow-forward" size={20} color="#64748B" />

                  <View style={styles.trendBox}>
                    <Text style={styles.trendValue}>
                      {data?.weightChange?.end} kg
                    </Text>
                    <Text style={styles.trendLabel}>end</Text>
                  </View>

                  <Ionicons name="arrow-forward" size={20} color="#64748B" />

                  <View style={styles.trendBox}>
                    <Text
                      style={[
                        styles.trendValue,
                        {
                          color:
                            (data?.weightChange?.delta ?? 0) <= 0
                              ? '#4ADE80'
                              : '#F87171',
                        },
                      ]}
                    >
                      {data?.weightChange?.delta} kg
                    </Text>
                    <Text style={styles.trendLabel}>change</Text>
                  </View>
                </View>
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Activity Mix</Text>
              {breakdownValues.length === 0 ? (
                <Text style={styles.emptyText}>No activities in this range.</Text>
              ) : (
                Object.entries(data?.activityBreakdown ?? {}).map(([type, count]) => (
                  <View key={type} style={styles.mixRow}>
                    <Text style={styles.mixType}>{type}</Text>
                    <View style={styles.mixTrack}>
                      <View
                        style={[
                          styles.mixFill,
                          { width: `${Math.min((count / breakdownTotal) * 100, 100)}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.mixCount}>{count}</Text>
                  </View>
                ))
              )}
            </View>

            <View style={{ height: 110 }} />
          </>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070B16' },
  body: { padding: 18 },
  segRow: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderRadius: 40,
    padding: 4,
    marginBottom: 18,
  },
  seg: { flex: 1, paddingVertical: 12, borderRadius: 40, alignItems: 'center' },
  segActive: { backgroundColor: '#7C3AED' },
  segText: { color: '#94A3B8', fontWeight: '700' },
  segTextActive: { color: '#fff' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: {
    width: '48%',
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 16,
  },
  statValue: { color: '#fff', fontSize: 24, fontWeight: '800', marginTop: 10 },
  statLabel: { color: '#94A3B8', fontSize: 13, marginTop: 4 },
  card: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 18,
    marginTop: 14,
  },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 16 },
  streakRow: { flexDirection: 'row', gap: 14 },
  streakBox: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  streakValue: { color: '#22D3EE', fontSize: 30, fontWeight: '800' },
  streakLabel: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
  chart: {
    height: 140,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  barWrap: { alignItems: 'center' },
  bar: {
    width: 18,
    borderRadius: 8,
    backgroundColor: '#7C3AED',
  },
  dayLabel: { color: '#64748B', fontSize: 12, marginTop: 8 },
  emptyText: { color: '#94A3B8', textAlign: 'center', paddingVertical: 20 },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trendBox: { alignItems: 'center' },
  trendValue: { color: '#fff', fontSize: 18, fontWeight: '800' },
  trendLabel: { color: '#64748B', fontSize: 12, marginTop: 4 },
  mixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mixType: { color: '#94A3B8', width: 90, fontWeight: '600' },
  mixTrack: {
    flex: 1,
    height: 8,
    borderRadius: 6,
    backgroundColor: '#1E293B',
    overflow: 'hidden',
  },
  mixFill: { height: 8, borderRadius: 6, backgroundColor: '#22D3EE' },
  mixCount: { color: '#fff', width: 36, textAlign: 'right', fontWeight: '700' },
});