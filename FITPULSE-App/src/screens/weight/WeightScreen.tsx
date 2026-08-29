import { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import ScreenHeader from '../../components/ScreenHeader';
import {
  getWeightHistory,
  addWeightLog,
  deleteWeightLog,
  WeightLog,
} from '../../api/weightApi';

export default function WeightScreen() {
  const [history, setHistory] = useState<WeightLog[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [weight, setWeight] = useState('');
  const [note, setNote] = useState('');

  const load = useCallback(async () => {
    try {
      setHistory(await getWeightHistory());
    } catch (e) {
      Alert.alert('Error', 'Could not load weight history');
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

  const latest = history[history.length - 1];
  const first = history[0];

  const delta = latest && first ? latest.weightKg - first.weightKg : 0;
  const trendColor = delta <= 0 ? '#4ADE80' : '#F87171';

  const save = async () => {
    if (!weight) {
      return Alert.alert('Validation', 'Enter your weight in kg');
    }
    await addWeightLog({
      weightKg: Number(weight),
      note: note.trim() || undefined,
    });
    setWeight('');
    setNote('');
    await load();
  };

  const remove = (id: number) => {
    Alert.alert('Remove entry?', undefined, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          await deleteWeightLog(id);
          await load();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Weight Log" subtitle="Track body weight and BMI" />

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
        <View style={styles.heroCard}>
          <Text style={styles.heroValue}>
            {latest ? `${latest.weightKg} kg` : '--'}
          </Text>

          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{latest?.bmi ?? '--'}</Text>
              <Text style={styles.heroStatLabel}>BMI</Text>
            </View>

            <View style={styles.heroStat}>
              <Text style={[styles.heroStatValue, { color: trendColor }]}>
                {first ? (delta > 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1)) : '--'}
              </Text>
              <Text style={styles.heroStatLabel}>Change</Text>
            </View>
          </View>
        </View>

        <Text style={styles.section}>Add Entry</Text>

        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          keyboardType="numeric"
          placeholderTextColor="#64748B"
          value={weight}
          onChangeText={setWeight}
        />

        <TextInput
          style={styles.input}
          placeholder="Note (optional)"
          placeholderTextColor="#64748B"
          value={note}
          onChangeText={setNote}
        />

        <TouchableOpacity style={styles.button} onPress={save}>
          <Ionicons name="scale" size={20} color="#fff" />
          <Text style={styles.buttonText}>Log Weight</Text>
        </TouchableOpacity>

        <Text style={styles.section}>History</Text>

        {history.length === 0 && (
          <Text style={styles.empty}>No weight entries yet.</Text>
        )}

        {history.map((w) => (
          <View key={w.id} style={styles.listCard}>
            <View style={styles.listIcon}>
              <Ionicons name="scale" size={18} color="#22D3EE" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.listValue}>{w.weightKg} kg</Text>
              <Text style={styles.listSub}>{w.loggedDate}{w.note ? ` · ${w.note}` : ''}</Text>
            </View>

            <Text style={styles.listBmi}>BMI {w.bmi ?? '--'}</Text>

            <TouchableOpacity onPress={() => remove(w.id)} style={{ marginLeft: 12 }}>
              <Ionicons name="trash-outline" size={18} color="#F87171" />
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ height: 110 }} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070B16' },
  body: { padding: 18 },
  heroCard: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
  },
  heroValue: { color: '#fff', fontSize: 40, fontWeight: '800' },
  heroStats: { flexDirection: 'row', gap: 40, marginTop: 18 },
  heroStat: { alignItems: 'center' },
  heroStatValue: { color: '#fff', fontSize: 22, fontWeight: '700' },
  heroStatLabel: { color: '#94A3B8', marginTop: 4, fontSize: 13 },
  section: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 14,
  },
  input: {
    backgroundColor: '#111827',
    color: '#fff',
    borderRadius: 16,
    padding: 14,
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C3AED',
    borderRadius: 16,
    height: 52,
    marginTop: 4,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16, marginLeft: 8 },
  empty: { color: '#94A3B8', textAlign: 'center', paddingVertical: 24 },
  listCard: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  listIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listValue: { color: '#fff', fontWeight: '700', fontSize: 16 },
  listSub: { color: '#64748B', fontSize: 12, marginTop: 2 },
  listBmi: { color: '#22D3EE', fontWeight: '600', fontSize: 13 },
});