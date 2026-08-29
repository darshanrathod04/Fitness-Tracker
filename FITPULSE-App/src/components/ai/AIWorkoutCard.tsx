import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAIStore } from "../../store/aiStore";
import { Palette, Radii, Spacing, Typography } from "../../theme";

export default function AIWorkoutCard() {
  const { workout } = useAIStore();

  if (!workout) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons name="sparkles" size={16} color={Palette.secondary} />
        </View>
        <Text style={styles.label}>Today's AI Workout</Text>
      </View>

      <Text style={styles.title}>{workout.workouts[0]}</Text>

      <Text style={styles.goal}>{workout.goal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surface,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  header: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: Radii.sm,
    backgroundColor: Palette.secondarySoft,
    justifyContent: "center",
    alignItems: "center",
  },
  label: { ...Typography.caption, color: Palette.secondary, fontWeight: "700" },
  title: {
    ...Typography.heading,
    color: Palette.text,
    marginTop: Spacing.md,
  },
  goal: { ...Typography.caption, color: Palette.textMuted, marginTop: Spacing.xs },
});