import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAIStore } from "../../store/aiStore";
import { Palette, Radii, Spacing, Typography } from "../../theme";

export default function WeeklyReflectionCard() {
  const { reflection } = useAIStore();

  if (!reflection) return null;

  const positive = /progress|good|great|consistent/i.test(reflection.overallStatus);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons name="journal-outline" size={16} color={Palette.primaryLight} />
        </View>
        <Text style={styles.label}>Weekly Reflection</Text>
      </View>

      <View style={styles.statusRow}>
        <Text
          style={[
            styles.status,
            { color: positive ? Palette.success : Palette.warning },
          ]}
        >
          {reflection.overallStatus}
        </Text>
      </View>

      <Text style={styles.body} numberOfLines={3}>
        {reflection.reflection}
      </Text>
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
    backgroundColor: Palette.primarySoft,
    justifyContent: "center",
    alignItems: "center",
  },
  label: { ...Typography.caption, color: Palette.primaryLight, fontWeight: "700" },
  statusRow: { marginTop: Spacing.md },
  status: { ...Typography.subheading },
  body: {
    ...Typography.caption,
    color: Palette.textSecondary,
    marginTop: Spacing.xs,
    lineHeight: 20,
  },
});