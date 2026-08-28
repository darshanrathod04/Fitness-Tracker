import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RecommendationCard({ item }: any) {
  const colors = (
    item.level === 'HIGH'
      ? ['#DC2626', '#7F1D1D']
      : item.level === 'MEDIUM'
      ? ['#EA580C', '#9A3412']
      : ['#2563EB', '#1E3A8A']
  ) as [string, string];

  return (
    <LinearGradient colors={colors} style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.level}</Text>
      </View>

      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.desc}>
        {item.description}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,.18)',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 14,
  },

  desc: {
    color: '#E2E8F0',
    marginTop: 8,
    lineHeight: 22,
  },
});