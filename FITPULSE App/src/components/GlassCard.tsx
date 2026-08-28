import { View, StyleSheet } from 'react-native';

export default function GlassCard({ children, style }: any) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#151C2C',
    borderRadius: 22,
    padding: 16,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',

    shadowColor: '#7C3AED',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});