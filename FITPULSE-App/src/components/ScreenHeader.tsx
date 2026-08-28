import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ScreenHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const navigation = useNavigation<any>();

  return (
    <LinearGradient
      colors={['#7C3AED', '#5B21B6', '#1E1B4B']}
      style={styles.header}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" color="#fff" size={26} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 66,
    paddingHorizontal: 22,
    paddingBottom: 26,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 12,
  },

  subtitle: {
    color: '#DDD6FE',
    marginTop: 6,
  },
});