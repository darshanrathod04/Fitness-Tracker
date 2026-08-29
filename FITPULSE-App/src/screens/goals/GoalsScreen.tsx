import { useCallback, useState } from 'react';

import { useAIStore } from "../../store/aiStore";
import { useAuthStore } from "../../store/authStore";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import ScreenHeader from '../../components/ScreenHeader';
import { getGoals, createGoal, updateGoalStatus, deleteGoal, Goal, GoalType, GoalStatus } from '../../api/goalApi';

const GOAL_TYPES: { type: GoalType; label: string; icon: any }[] = [
  { type: 'DAILY_CALORIES', label: 'Calories', icon: 'flame' },
  { type: 'DAILY_STEPS', label: 'Steps', icon: 'footsteps' },
  { type: 'DAILY_ACTIVE_MINUTES', label: 'Minutes', icon: 'time' },
  { type: 'WATER', label: 'Water', icon: 'water' },
  { type: 'WEIGHT_TARGET', label: 'Weight', icon: 'scale' },
];

export default function GoalsScreen() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<GoalType>('DAILY_CALORIES');
  const [target, setTarget] = useState('');

  const { saveGoal, loading } = useAIStore();
  const { user } = useAuthStore();

  const [experience, setExperience] = useState("Beginner");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");

  const load = useCallback(async () => {
    try {
      setGoals(await getGoals());
    } catch (e) {
      Alert.alert('Error', 'Could not load goals');
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

 const save = async () => {

   if (!title.trim() || !target) {
     return Alert.alert(
       "Validation",
       "Title and target are required"
     );
   }

   if (!user?.id) {
     return Alert.alert(
       "Error",
       "You must be signed in to save a goal."
     );
   }

   try {

     // Existing Fitness Goal
     await createGoal({
       title: title.trim(),
       type,
       targetValue: Number(target),
     });

     // AI Goal
     await saveGoal(user.id, {
       goal: title.trim(),
       experience,
       targetCalories: Number(calories),
       targetProtein: Number(protein),
     });

     setModal(false);

     setTitle("");
     setTarget("");
     setCalories("");
     setProtein("");
     setExperience("Beginner");

     await load();

     Alert.alert(
       "Success",
       "Goal saved and AI Coach updated."
     );

   } catch {

     Alert.alert(
       "Error",
       "Could not save AI Goal"
     );
   }
 };

  const onToggle = async (g: Goal) => {
    const next: GoalStatus = g.completed ? 'ACTIVE' : 'COMPLETED';
    await updateGoalStatus(g.id, next);
    await load();
  };

  const onDelete = (g: Goal) => {
    Alert.alert('Delete goal?', g.title, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteGoal(g.id);
          await load();
        },
      },
    ]);
  };

  const progressColor = (p: number) =>
    p >= 100 ? '#4ADE80' : p >= 50 ? '#22D3EE' : '#F472B6';

  return (
    <View style={styles.container}>
      <ScreenHeader title="My Goals" subtitle="Set targets and track progress" />
<Modal visible={modal} transparent animationType="slide">
        <View style={styles.modalWrap}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>New Goal</Text>

            <TextInput
              style={styles.input}
              placeholder="Goal title"
              placeholderTextColor="#64748B"
              value={title}
              onChangeText={setTitle}
            />

            <View style={styles.typeGrid}>
              {GOAL_TYPES.map((t) => (
                <TouchableOpacity
                  key={t.type}
                  style={[styles.typeChip, type === t.type && styles.typeChipActive]}
                  onPress={() => setType(t.type)}
                >
                  <Ionicons
                    name={t.icon}
                    size={18}
                    color={type === t.type ? '#fff' : '#22D3EE'}
                  />
                  <Text
                    style={[
                      styles.typeChipText,
                      type === t.type && { color: '#fff' },
                    ]}
                  >
                    {t.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Target value"
              placeholderTextColor="#64748B"
              keyboardType="numeric"
              value={target}
              onChangeText={setTarget}
            />

            <TextInput
              style={styles.input}
              placeholder="Experience (Beginner / Intermediate)"
              value={experience}
              onChangeText={setExperience}
            />

            <TextInput
              style={styles.input}
              placeholder="Daily Calories"
              keyboardType="numeric"
              value={calories}
              onChangeText={setCalories}
            />

            <TextInput
              style={styles.input}
              placeholder="Daily Protein (g)"
              keyboardType="numeric"
              value={protein}
              onChangeText={setProtein}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancel} onPress={() => setModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.save} onPress={save} disabled={loading}>
                <Text style={styles.saveText}>
                  {loading ? "Saving..." : "Create"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#070B16' },
  body: { padding: 18 },
  empty: {
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardTitle: { color: '#fff', fontSize: 17, fontWeight: '700' },
  cardSub: { color: '#94A3B8', marginTop: 4, fontSize: 13 },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
    backgroundColor: '#1E293B',
  },
  badgeDone: { backgroundColor: '#14532D' },
  badgeText: { color: '#8B5CF6', fontWeight: '700', fontSize: 12 },
  badgeTextDone: { color: '#4ADE80' },
  barTrack: {
    height: 8,
    borderRadius: 6,
    backgroundColor: '#1E293B',
    marginTop: 16,
    overflow: 'hidden',
  },
  barFill: { height: 8, borderRadius: 6 },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  toggle: { color: '#22D3EE', fontWeight: '600' },
  fab: {
    position: 'absolute',
    right: 22,
    bottom: 90,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  modalWrap: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 22,
  },
  modal: {
    backgroundColor: '#111827',
    borderRadius: 26,
    padding: 22,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 18,
  },
  input: {
    backgroundColor: '#0F172A',
    color: '#fff',
    borderRadius: 16,
    padding: 14,
    fontSize: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  typeChipActive: { backgroundColor: '#7C3AED', borderColor: '#8B5CF6' },
  typeChipText: { color: '#22D3EE', marginLeft: 6, fontWeight: '600' },
  modalActions: { flexDirection: 'row', gap: 12 },
  cancel: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  save: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: { color: '#94A3B8', fontWeight: '700' },
  saveText: { color: '#fff', fontWeight: '700' },
});