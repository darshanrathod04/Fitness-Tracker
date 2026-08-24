import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

type Props = {
  title: string;
  value: string;
};

export default function SummaryCard({ title, value }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 18,
  },
  title: {
    color: Colors.gray,
    fontSize: 13,
  },
  value: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '700',
    marginTop: 6,
  },
});