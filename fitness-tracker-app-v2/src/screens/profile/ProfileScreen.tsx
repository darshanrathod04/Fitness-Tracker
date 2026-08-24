import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import { getMe } from '../../api/userApi';

export default function ProfileScreen({
  navigation,
}: any) {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getMe();
    setUser(data);
  };

  const bmi = (
    user?.weight /
    Math.pow(user?.height / 100, 2)
  ).toFixed(1);

  const logout = async () => {
    await SecureStore.deleteItemAsync('jwt');

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#7C3AED', '#312E81']}
        style={styles.header}
      >
        <View style={styles.avatar}>
          <Ionicons
            name="person"
            color="#fff"
            size={44}
          />
        </View>

        <Text style={styles.name}>
          {user?.name}
        </Text>

        <Text style={styles.email}>
          {user?.email}
        </Text>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.section}>
            Body Metrics
          </Text>

          <Row
            title="Age"
            value={`${user?.age} yrs`}
          />

          <Row
            title="Height"
            value={`${user?.height} cm`}
          />

          <Row
            title="Weight"
            value={`${user?.weight} kg`}
          />

          <Row
            title="BMI"
            value={bmi}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>
            Account
          </Text>

          <Row
            title="Role"
            value={user?.role}
          />

          <Row
            title="Member ID"
            value={`#${user?.id}`}
          />
        </View>

        <TouchableOpacity
          style={styles.logout}
          onPress={logout}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#fff"
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const Row = ({
  title,
  value,
}: any) => (
  <View style={styles.row}>
    <Text style={styles.label}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B16',
  },

  header: {
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 12,
  },

  email: {
    color: '#DDD6FE',
  },

  body: {
    padding: 18,
    gap: 18,
  },

  card: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 18,
  },

  section: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },

  label: {
    color: '#94A3B8',
  },

  value: {
    color: '#fff',
    fontWeight: '700',
  },

  logout: {
    backgroundColor: '#EF4444',
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  logoutText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 8,
  },
});