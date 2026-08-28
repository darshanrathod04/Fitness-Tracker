import { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import API from '../../api/api';

export default function RegisterScreen({
  navigation,
}: any) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    height: '',
    weight: '',
  });

  const update = (k: string, v: string) =>
    setForm({ ...form, [k]: v });

  const register = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {
      return Alert.alert(
        'Required',
        'Please fill mandatory fields'
      );
    }

    try {
      setLoading(true);

      await API.post("/auth/register", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        age: parseInt(form.age),
        height: parseFloat(form.height),
        weight: parseFloat(form.weight),
      });

      Alert.alert(
        'Success',
        'Account created successfully'
      );

      navigation.replace('Login');
    } catch (e: any) {
        console.log("REGISTER ERROR =>", e.response?.data);

        Alert.alert(
          "Registration Failed",
          JSON.stringify(e.response?.data || e.message)
        );
      } finally {
      setLoading(false);
    }
  };

  const Field = (
    icon: any,
    placeholder: string,
    key: string,
    numeric = false,
    secure = false
  ) => (
    <View style={styles.field}>
      <Ionicons
        name={icon}
        size={20}
        color="#94A3B8"
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#64748B"
        value={(form as any)[key]}
        onChangeText={(v) => update(key, v)}
        style={styles.input}
        keyboardType={
          numeric ? 'numeric' : 'default'
        }
        secureTextEntry={secure}
        autoCapitalize="none"
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#7C3AED', '#312E81']}
        style={styles.hero}
      >
        <Text style={styles.logo}>FITPulse</Text>

        <Text style={styles.heroTitle}>
          Create Account
        </Text>

        <Text style={styles.heroSub}>
          Join enterprise fitness platform
        </Text>
      </LinearGradient>

      <View style={styles.card}>
        {Field(
          'person-outline',
          'Full Name',
          'name'
        )}

        {Field(
          'mail-outline',
          'Email',
          'email'
        )}

        {Field(
          'lock-closed-outline',
          'Password',
          'password',
          false,
          true
        )}

        {Field(
          'calendar-outline',
          'Age',
          'age',
          true
        )}

        {Field(
          'resize-outline',
          'Height (cm)',
          'height',
          true
        )}

        {Field(
          'barbell-outline',
          'Weight (kg)',
          'weight',
          true
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={register}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              Create Account
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.replace('Login')
          }
        >
          <Text style={styles.link}>
            Already have account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B16',
  },

  hero: {
    paddingTop: 70,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },

  logo: {
    color: '#22D3EE',
    fontSize: 28,
    fontWeight: '800',
  },

  heroTitle: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 14,
  },

  heroSub: {
    color: '#DDD6FE',
    marginTop: 6,
  },

  card: {
    margin: 18,
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 20,
  },

  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 58,
    marginBottom: 16,
  },

  input: {
    color: '#fff',
    flex: 1,
    marginLeft: 10,
  },

  button: {
    backgroundColor: '#7C3AED',
    borderRadius: 18,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  link: {
    color: '#22D3EE',
    textAlign: 'center',
    marginTop: 18,
  },
});