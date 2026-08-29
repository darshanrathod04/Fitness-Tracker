import Svg, { Circle } from 'react-native-svg';
import { View, Text, StyleSheet } from 'react-native';
import { Palette } from '../theme/colors';

export default function ProgressRing({
  progress = 75,
  size = 140,
  strokeWidth = 10,
  label = 'Goal',
  subtitle,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  subtitle?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  const circumference = 2 * Math.PI * radius;

  const clamped = Math.max(0, Math.min(100, progress));

  const offset = circumference - (clamped / 100) * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={Palette.surfaceRaised}
          strokeWidth={strokeWidth}
          fill="none"
        />

        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={Palette.primary}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${center},${center}`}
          fill="none"
        />
      </Svg>

      <View style={styles.center}>
        <Text style={styles.value}>{clamped}%</Text>
        <Text style={styles.label}>{label}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
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
    color: Palette.text,
    fontSize: 28,
    fontWeight: '800',
  },

  label: {
    color: Palette.textMuted,
    fontSize: 13,
  },

  subtitle: {
    color: Palette.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
});