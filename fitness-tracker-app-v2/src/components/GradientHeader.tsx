import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientHeader() {
  return (
    <LinearGradient
      colors={['#7C5CFF', '#22D3EE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View>
        <Text style={styles.small}>Welcome Back</Text>
        <Text style={styles.title}>Let's Crush It!</Text>
        <Text style={styles.date}>24 Aug · Sunday</Text>
      </View>

      <Image
        source={{
          uri: 'https://i.pravatar.cc/150?img=12',
        }}
        style={styles.avatar}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    padding: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  small: {
    color: '#E9D5FF',
    fontSize: 14,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 4,
  },
  date: {
    color: 'rgba(255,255,255,0.8)',
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: 'white',
  },
});