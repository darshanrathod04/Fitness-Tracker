import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { createActivity } from '../../api/activityApi';

const types = [
  { name: 'GYM', icon: 'barbell' },
  { name: 'RUNNING', icon: 'walk' },
  { name: 'YOGA', icon: 'leaf' },
  { name: 'CYCLING', icon: 'bicycle' },
];

export default function AddActivityScreen({
  navigation,
}: any) {
  const [type, setType] = useState('GYM');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const [loading, setLoading] = useState(false);

 const saveActivity = async () => {
   if (!duration || !calories || !date) {
     Alert.alert("Validation", "Please fill all fields");
     return;
   }

   try {
     setLoading(true);

     const payload = {
       type,
       duration: Number(duration),
       calories: Number(calories),
       activityDate: date,
     };

     console.log("SEND =>", payload);

     await createActivity(payload);

     Alert.alert("Success", "Activity Saved");
     navigation.goBack();

   } catch (e: any) {
     console.log("STATUS =>", e?.response?.status);
     console.log("DATA =>", e?.response?.data);

     Alert.alert(
       "Save Failed",
       JSON.stringify(e?.response?.data || e.message)
     );
   } finally {
     setLoading(false);
   }
 };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#7C3AED', '#312E81']}
        style={styles.hero}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            color="#fff"
            size={26}
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          New Workout
        </Text>

        <Text style={styles.sub}>
          Track today's fitness session
        </Text>
      </LinearGradient>

      <ScrollView style={styles.body}>
        <Text style={styles.section}>
          Workout Type
        </Text>

        <View style={styles.grid}>
          {types.map((item) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => setType(item.name)}
              style={[
                styles.typeCard,
                type === item.name &&
                  styles.activeType,
              ]}
            >
              <Ionicons
                name={item.icon as any}
                size={28}
                color={
                  type === item.name
                    ? '#fff'
                    : '#22D3EE'
                }
              />

              <Text
                style={[
                  styles.typeText,
                  type === item.name &&
                    { color: '#fff' },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.section}>
          Duration
        </Text>

        <TextInput
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
          placeholder="45"
          placeholderTextColor="#64748B"
          style={styles.input}
        />

        <Text style={styles.section}>
          Calories Burned
        </Text>

        <TextInput
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
          placeholder="320"
          placeholderTextColor="#64748B"
          style={styles.input}
        />

        <Text style={styles.section}>
          Activity Date
        </Text>

        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="2026-08-24"
          placeholderTextColor="#64748B"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={saveActivity}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons
                name="checkmark-circle"
                color="#fff"
                size={22}
              />
              <Text style={styles.buttonText}>
                Save Activity
              </Text>
            </>
          )}
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B16',
  },

  hero: {
    paddingTop: 60,
    paddingHorizontal: 22,
    paddingBottom: 26,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 20,
  },

  sub: {
    color: '#DDD6FE',
    marginTop: 6,
  },

  body: {
    padding: 18,
  },

  section: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
    marginTop: 10,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  typeCard: {
    width: '48%',
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  activeType: {
    backgroundColor: '#7C3AED',
    borderColor: '#8B5CF6',
  },

  typeText: {
    color: '#E2E8F0',
    marginTop: 10,
    fontWeight: '700',
  },

  input: {
    backgroundColor: '#111827',
    color: '#fff',
    borderRadius: 18,
    padding: 16,
    fontSize: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  button: {
    height: 58,
    backgroundColor: '#7C3AED',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 12,
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 8,
  },
});