import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { getMe } from '../../api/userApi';

import API from '../../api/api';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      Alert.alert("Validation", "Email & Password required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email: email.trim(),
        password,
      });

      console.log("LOGIN SUCCESS =>", res.data);

      await SecureStore.setItemAsync("jwt", res.data.token);

      const me = await getMe();

      navigation.reset({
        index: 0,
        routes: [
          { name: me.role === "ADMIN" ? "Admin" : "Main" }
        ],
      });

    } catch (e: any) {
        console.log("STATUS:", e?.response?.status);
        console.log("DATA:", e?.response?.data);
        console.log("MESSAGE:", e?.message);

        Alert.alert(
          "Login Failed",
          JSON.stringify(e?.response?.data || e?.message)
        );
      }finally {
      setLoading(false);
    }
  };
  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200',
      }}
      blurRadius={3}
      style={styles.bg}
    >
      <LinearGradient
        colors={[
          'rgba(5,8,22,.88)',
          'rgba(17,24,39,.95)',
        ]}
        style={styles.overlay}
      >
        <Text style={styles.logo}>FITPulse</Text>

        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.sub}>
          Sign in to continue your transformation
        </Text>

        <View style={styles.card}>
          <View style={styles.inputBox}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#94A3B8"
            />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#64748B"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#94A3B8"
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#64748B"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={login}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Register')
            }
          >
            <Text style={styles.link}>
              Create new account
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 26,
  },

  logo: {
    color: '#22D3EE',
    fontSize: 34,
    fontWeight: '800',
  },

  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    marginTop: 12,
  },

  sub: {
    color: '#CBD5E1',
    marginTop: 8,
    marginBottom: 30,
  },

  card: {
    backgroundColor: 'rgba(17,24,39,.75)',
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.08)',
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 16,
    height: 58,
  },

  input: {
    color: '#fff',
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },

  btn: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  btnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },

  link: {
    color: '#22D3EE',
    textAlign: 'center',
    marginTop: 18,
    fontWeight: '600',
  },
});