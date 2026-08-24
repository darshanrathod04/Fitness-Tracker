import { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Splash'
>;

export default function SplashScreen({
  navigation,
}: Props) {
  useEffect(() => {
    const init = async () => {
      const token = await SecureStore.getItemAsync('jwt');

      setTimeout(() => {
        if (token) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        } else {
          navigation.replace('Login');
        }
      }, 1800);
    };

    init();
  }, []);

  return (
    <LinearGradient
      colors={['#050816', '#111827', '#7C3AED']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <Image
        source={{
          uri: 'https://img.icons8.com/fluency/240/dumbbell.png',
        }}
        style={styles.logo}
      />

      <Text style={styles.brand}>FITPulse</Text>

      <Text style={styles.tag}>
        Enterprise Fitness Intelligence
      </Text>

      <View style={styles.loader}>
        <View style={styles.dot} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 120,
    height: 120,
  },

  brand: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    marginTop: 18,
    letterSpacing: 1,
  },

  tag: {
    color: '#C4B5FD',
    marginTop: 8,
    fontSize: 15,
  },

  loader: {
    marginTop: 50,
    width: 70,
    height: 8,
    backgroundColor: '#312E81',
    borderRadius: 20,
    overflow: 'hidden',
  },

  dot: {
    width: 35,
    height: 8,
    backgroundColor: '#22D3EE',
    borderRadius: 20,
  },
});