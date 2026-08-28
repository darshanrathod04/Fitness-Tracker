import Svg, { Circle } from 'react-native-svg';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgressRing({
  progress = 75,
}: {
  progress: number;
}) {
  const radius = 58;
  const stroke = 10;

  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={140} height={140}>
        <Circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#263247"
          strokeWidth={stroke}
          fill="none"
        />

        <Circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#7C3AED"
          strokeWidth={stroke}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation="-90"
          origin="70,70"
          fill="none"
        />
      </Svg>

      <View style={styles.center}>
        <Text style={styles.value}>{progress}%</Text>
        <Text style={styles.label}>Goal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  center: {
    position: 'absolute',
    alignItems: 'center',
  },

  value: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },

  label: {
    color: '#94A3B8',
    fontSize: 13,
  },
});