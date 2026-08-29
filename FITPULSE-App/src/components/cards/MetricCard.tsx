import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: MetricCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: `${color}20` }]}>
          <Ionicons name={icon} size={22} color={color} />
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={[styles.value, { color }]}>{value}</Text>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 16,
    minHeight: 125,
    justifyContent: 'space-between',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
  },

  value: {
    fontSize: 30,
    fontWeight: '800',
    marginTop: 4,
  },

  subtitle: {
    color: '#D1D5DB',
    fontSize: 12,
    marginTop: 6,
  },
});