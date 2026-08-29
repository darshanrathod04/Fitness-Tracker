import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import GlassCard from '../../components/GlassCard';
import ProgressRing from '../../components/ProgressRing';
import { Colors } from '../../theme/colors';

import { getActivities } from '../../api/activityApi';
import { getMe } from '../../api/userApi';

const QUICK_LINKS = [
  { name: 'Goals', icon: 'flag' as any, color: '#F472B6' },
  { name: 'Nutrition', icon: 'restaurant' as any, color: '#22D3EE' },
  { name: 'Weight', icon: 'scale' as any, color: '#FBBF24' },
  { name: 'Achievements', icon: 'trophy' as any, color: '#FBBF24' },
  { name: 'Progress', icon: 'stats-chart' as any, color: '#4ADE80' },
];

interface Activity {
  id: number;
  type: string;
  duration: number;
  calories: number;
}

interface User {
  name?: string;
  fullName?: string;
  email: string;
}

export default function DashboardScreen() {
  const navigation = useNavigation<any>();

  const [user, setUser] = useState<User | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboard = useCallback(async () => {
    try {
      const [userData, activityData] = await Promise.all([
        getMe(),
        getActivities(),
      ]);

      setUser(userData);
      setActivities(activityData);
    } catch (error) {
      console.log('Dashboard Error:', error);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboard();
    setRefreshing(false);
  };

  const totalCalories = useMemo(
    () =>
      activities.reduce(
        (sum, item) => sum + item.calories,
        0,
      ),
    [activities],
  );

  const totalMinutes = useMemo(
    () =>
      activities.reduce(
        (sum, item) => sum + item.duration,
        0,
      ),
    [activities],
  );

  const totalSteps = useMemo(
    () => totalMinutes * 140,
    [totalMinutes],
  );

  const distance = useMemo(
    () =>
      (
        totalMinutes * 0.12
      ).toFixed(1),
    [totalMinutes],
  );

  const progress = Math.min(
    Math.round((totalCalories / 600) * 100),
    100,
  );

  const weekData = [85, 60, 35, 72, 45, 65, 50];

  const {
    generateWorkout,
    analyzeRecovery,
    weeklyReflection
  } = useAIStore();

  useEffect(() => {

    generateWorkout(1,22);

    analyzeRecovery({
      sleepHours:7,
      soreness:"LOW",
      fatigue:"LOW"
    });

    weeklyReflection({
      userId:1,
      workoutsCompleted:5,
      recoveryDays:2,
      averageProtein:145,
      averageSleep:7
    });

  },[]);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
      >
        <LinearGradient
          colors={['#7C3AED', '#5B21B6', '#312E81']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Text style={styles.hello}>
            Welcome Back 👋
          </Text>

          <Text style={styles.title}>
            {user?.name ?? user?.fullName ?? 'Fitness Athlete'}
          </Text>

          <Text style={styles.date}>
            Your Daily Fitness Journey
          </Text>

          <GlassCard style={styles.heroCard}>
            <View style={styles.row}>
              <View>
                <Text style={styles.small}>
                  Overall Progress
                </Text>

                <Text style={styles.big}>
                  {progress}%
                </Text>
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.metric}>
                  👣 {totalSteps}
                </Text>

                <Text style={styles.metric}>
                  🔥 {totalCalories}
                </Text>

                <Text style={styles.metric}>
                  ⏱ {(
                    totalMinutes / 60
                  ).toFixed(1)}
                  h
                </Text>
              </View>
            </View>
          </GlassCard>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.section}>
            Today's Dashboard
          </Text>

          <GlassCard>
            <View style={styles.row}>
              <ProgressRing
                progress={progress}
              />

              <View>
                <Text style={styles.number}>
                  {totalMinutes} min
                </Text>

                <Text style={styles.sub}>
                  Active Minutes
                </Text>

                <View
                  style={{ height: 16 }}
                />

                <Text style={styles.number}>
                  {totalCalories} kcal
                </Text>

                <Text style={styles.sub}>
                  Calories Burned
                </Text>
              </View>
            </View>
          </GlassCard>

          <View style={styles.grid}>
            <GlassCard
              style={styles.box}
            >
              <Text style={styles.icon}>
                👟
              </Text>

              <Text
                style={styles.boxValue}
              >
                {totalSteps}
              </Text>

              <Text
                style={styles.boxLabel}
              >
                Steps
              </Text>
            </GlassCard>

            <GlassCard
              style={styles.box}
            >
              <Text style={styles.icon}>
                🏃
              </Text>

              <Text
                style={styles.boxValue}
              >
                {distance} km
              </Text>

              <Text
                style={styles.boxLabel}
              >
                Distance
              </Text>
            </GlassCard>
          </View>

          <GlassCard>
            <Text style={styles.cardTitle}>
              Quick Features
            </Text>

            <View style={styles.quickGrid}>
              {QUICK_LINKS.map((link) => (
                <TouchableOpacity
                  key={link.name}
                  style={styles.quickTile}
                  onPress={() => navigation.navigate(link.name)}
                >
                  <View style={[styles.quickIcon, { backgroundColor: link.color + '22' }]}>
                    <Ionicons name={link.icon} size={24} color={link.color} />
                  </View>
                  <Text style={styles.quickLabel}>{link.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </GlassCard>

          <GlassCard>
            <Text
              style={styles.cardTitle}
            >
              Weekly Activity
            </Text>

            <View style={styles.chart}>
              {weekData.map(
                (height, index) => (
                  <View
                    key={index}
                    style={
                      styles.barWrap
                    }
                  >
                    <View
                      style={[
                        styles.bar,
                        {
                          height,
                          backgroundColor:
                            index === 6
                              ? '#22D3EE'
                              : '#7C3AED',
                        },
                      ]}
                    />

                    <Text
                      style={
                        styles.day
                      }
                    >
                      {
                        [
                          'M',
                          'T',
                          'W',
                          'T',
                          'F',
                          'S',
                          'S',
                        ][index]
                      }
                    </Text>
                  </View>
                ),
              )}
            </View>
          </GlassCard>

          <GlassCard>
            <Text
              style={styles.cardTitle}
            >
              Recent Workout
            </Text>

            {activities.length === 0 ? (
              <Text
                style={styles.empty}
              >
                No workouts yet.
              </Text>
            ) : (
              activities
                .slice(0, 5)
                .map(
                  (
                    item,
                  ) => (
                    <View
                      key={
                        item.id
                      }
                      style={
                        styles.workout
                      }
                    >
                      <Text
                        style={
                          styles.workoutIcon
                        }
                      >
                        🏋️
                      </Text>

                      <View
                        style={{
                          flex: 1,
                        }}
                      >
                        <Text
                          style={
                            styles.workoutTitle
                          }
                        >
                          {
                            item.type
                          }
                        </Text>

                        <Text
                          style={
                            styles.sub
                          }
                        >
                          {
                            item.duration
                          }{' '}
                          min •{' '}
                          {
                            item.calories
                          }{' '}
                          kcal
                        </Text>
                      </View>
                    </View>
                  ),
                )
            )}
          </GlassCard>

          <View
            style={{ height: 110 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },

  hero: {
    paddingTop: 70,
    paddingHorizontal: 22,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  hello: {
    color: '#E9D5FF',
    fontSize: 15,
  },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 4,
  },

  date: {
    color: '#DDD6FE',
    marginTop: 4,
  },

  heroCard: {
    marginTop: 22,
    backgroundColor:
      'rgba(17,24,39,0.65)',
  },

  row: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  small: {
    color: '#CBD5E1',
    fontSize: 13,
  },

  big: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 2,
  },

  metric: {
    color: '#fff',
    marginVertical: 2,
    fontWeight: '600',
  },

  content: {
    padding: 18,
    gap: 18,
  },

  section: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  number: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  sub: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 2,
  },

  grid: {
    flexDirection: 'row',
    gap: 14,
  },

  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },

  quickTile: {
    width: '29%',
    alignItems: 'center',
  },

  quickIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quickLabel: {
    color: '#CBD5E1',
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
  },

  box: {
    flex: 1,
    alignItems: 'center',
  },

  icon: {
    fontSize: 28,
  },

  boxValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 8,
  },

  boxLabel: {
    color: '#94A3B8',
    marginTop: 4,
  },

  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },

  chart: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'flex-end',
    height: 120,
  },

  barWrap: {
    alignItems: 'center',
  },

  bar: {
    width: 18,
    borderRadius: 10,
  },

  day: {
    color: '#64748B',
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
  },

  workout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  workoutIcon: {
    fontSize: 28,
    marginRight: 14,
  },

  workoutTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  empty: {
    color: '#94A3B8',
    textAlign: 'center',
    paddingVertical: 20,
  },
});