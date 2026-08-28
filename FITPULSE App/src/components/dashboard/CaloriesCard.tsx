import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

export default function CaloriesCard() {
  const calories = 1450;
  const goal = 2200;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Today's Calories</Text>

      <Text style={styles.value}>{calories}</Text>

      <Text style={styles.goal}>Goal {goal} kcal</Text>

      <View style={styles.bar}>
        <View
          style={[
            styles.progress,
            { width: `${(calories / goal) * 100}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
  },
  title: {
    color: Colors.gray,
    fontSize: 15,
  },
  value: {
    color: Colors.white,
    fontSize: 42,
    fontWeight: '700',
    marginVertical: 6,
  },
  goal: {
    color: Colors.gray,
    marginBottom: 14,
  },
  bar: {
    height: 10,
    backgroundColor: '#334155',
    borderRadius: 20,
  },
  progress: {
    height: 10,
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
});
