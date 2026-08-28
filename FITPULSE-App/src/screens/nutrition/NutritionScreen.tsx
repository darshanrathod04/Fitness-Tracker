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
  getDailyNutrition,
  addFood,
  addWater,
  deleteFood,
  DailyNutrition,
  MealType,
} from '../../api/nutritionApi';

const MEALS: { type: MealType; label: string; icon: any }[] = [
  { type: 'BREAKFAST', label: 'Breakfast', icon: 'sunny' },
  { type: 'LUNCH', label: 'Lunch', icon: 'restaurant' },
  { type: 'DINNER', label: 'Dinner', icon: 'moon' },
  { type: 'SNACK', label: 'Snack', icon: 'cafe' },
];

export default function NutritionScreen() {
  const [data, setData] = useState<DailyNutrition | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [meal, setMeal] = useState<MealType>('BREAKFAST');
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [water, setWater] = useState('');

  const load = useCallback(async () => {
    try {
      setData(await getDailyNutrition());
    } catch (e) {
      Alert.alert('Error', 'Could not load nutrition');
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

  const saveFood = async () => {
    if (!name.trim() || !calories) {
      return Alert.alert('Validation', 'Food name and calories are required');
    }
    await addFood({
      mealType: meal,
      name: name.trim(),
      calories: Number(calories),
      proteinG: protein ? Number(protein) : 0,
      carbsG: carbs ? Number(carbs) : 0,
      fatG: fat ? Number(fat) : 0,
    });
    setName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
    await load();
  };

  const saveWater = async () => {
    if (!water) {
      return Alert.alert('Validation', 'Enter amount in ml');
    }
    await addWater(Number(water));
    setWater('');
    await load();
  };

  const removeFood = (id: number) => {
    Alert.alert('Remove food?', undefined, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          await deleteFood(id);
          await load();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Nutrition" subtitle="Track meals, macros and water" />

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
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { flex: 1.4 }]}>
            <Text style={styles.summaryValue}>{data?.totalCalories ?? 0}</Text>
            <Text style={styles.summaryLabel}>kcal today</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{data?.totalWaterMl ?? 0}ml</Text>
            <Text style={styles.summaryLabel}>water</Text>
          </View>
        </View>

        <View style={styles.macroRow}>
          <View style={[styles.macro, { borderColor: '#F472B6' }]}>
            <Text style={styles.macroValue}>{data?.totalProtein ?? 0}</Text>
            <Text style={styles.macroLabel}>Protein g</Text>
          </View>
          <View style={[styles.macro, { borderColor: '#22D3EE' }]}>
            <Text style={styles.macroValue}>{data?.totalCarbs ?? 0}</Text>
            <Text style={styles.macroLabel}>Carbs g</Text>
          </View>
          <View style={[styles.macro, { borderColor: '#FBBF24' }]}>
            <Text style={styles.macroValue}>{data?.totalFat ?? 0}</Text>
            <Text style={styles.macroLabel}>Fat g</Text>
          </View>
        </View>

        <Text style={styles.section}>Add Food</Text>

        <View style={styles.mealRow}>
          {MEALS.map((m) => (
            <TouchableOpacity
              key={m.type}
              style={[styles.mealChip, meal === m.type && styles.mealChipActive]}
              onPress={() => setMeal(m.type)}
            >
              <Ionicons
                name={m.icon}
                size={16}
                color={meal === m.type ? '#fff' : '#22D3EE'}
              />
              <Text style={[styles.mealText, meal === m.type && { color: '#fff' }]}>
                {m.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
<TextInput
          style={styles.input}
          placeholder="Food name"
          placeholderTextColor="#64748B"
          value={name}
          onChangeText={setName}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="kcal"
            keyboardType="numeric"
            placeholderTextColor="#64748B"
            value={calories}
            onChangeText={setCalories}
          />
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="protein g"
            keyboardType="numeric"
            placeholderTextColor="#64748B"
            value={protein}
            onChangeText={setProtein}
          />
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="carbs g"
            keyboardType="numeric"
            placeholderTextColor="#64748B"
            value={carbs}
            onChangeText={setCarbs}
          />
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="fat g"
            keyboardType="numeric"
            placeholderTextColor="#64748B"
            value={fat}
            onChangeText={setFat}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={saveFood}>
          <Text style={styles.buttonText}>Add Food</Text>
        </TouchableOpacity>

        <Text style={styles.section}>Log Water</Text>

        <View style={styles.waterRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Amount (ml)"
            keyboardType="numeric"
            placeholderTextColor="#64748B"
            value={water}
            onChangeText={setWater}
          />
          <TouchableOpacity style={styles.waterButton} onPress={saveWater}>
            <Ionicons name="water" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.section}>Today&apos;s Meals</Text>

        {data?.foodEntries.length === 0 && (
          <Text style={styles.empty}>No food logged today.</Text>
        )}

        {data?.foodEntries.map((f) => (
          <View key={f.id} style={styles.foodCard}>
            <View style={styles.foodIcon}>
              <Ionicons
                name={MEALS.find((m) => m.type === f.mealType)?.icon ?? 'restaurant'}
                size={18}
                color="#22D3EE"
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.foodName}>{f.name}</Text>
              <Text style={styles.foodSub}>
                {f.proteinG}p · {f.carbsG}c · {f.fatG}f
              </Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.foodCal}>{f.calories} kcal</Text>
              <TouchableOpacity onPress={() => removeFood(f.id)}>
                <Ionicons name="close" size={18} color="#F87171" />
              </TouchableOpacity>
            </View>
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
  summaryRow: { flexDirection: 'row', gap: 12 },
  summaryCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 18,
  },
  summaryValue: { color: '#fff', fontSize: 26, fontWeight: '800' },
  summaryLabel: { color: '#94A3B8', marginTop: 4, fontSize: 13 },
  macroRow: { flexDirection: 'row', gap: 10, marginTop: 14, marginBottom: 8 },
  macro: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 14,
    borderLeftWidth: 3,
  },
  macroValue: { color: '#fff', fontSize: 20, fontWeight: '800' },
  macroLabel: { color: '#94A3B8', fontSize: 12, marginTop: 2 },
  section: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 14,
  },
  mealRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  mealChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 30,
  },
  mealChipActive: { backgroundColor: '#7C3AED' },
  mealText: { color: '#22D3EE', marginLeft: 6, fontWeight: '600' },
  input: {
    backgroundColor: '#111827',
    color: '#fff',
    borderRadius: 16,
    padding: 14,
    fontSize: 15,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  inputRow: { flexDirection: 'row', gap: 10 },
  inputHalf: { flex: 1 },
  button: {
    backgroundColor: '#7C3AED',
    borderRadius: 16,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  waterRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  waterButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#0EA5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  empty: { color: '#94A3B8', textAlign: 'center', paddingVertical: 24 },
  foodCard: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  foodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  foodName: { color: '#fff', fontWeight: '600' },
  foodSub: { color: '#64748B', fontSize: 12, marginTop: 2 },
  foodCal: { color: '#F472B6', fontWeight: '700' },
});