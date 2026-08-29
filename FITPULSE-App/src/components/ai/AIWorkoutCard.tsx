import React from "react";
import { View, Text } from "react-native";

import { useAIStore } from "../../store/aiStore";

export default function AIWorkoutCard() {

  const { workout } = useAIStore();

  if (!workout) return null;

  return (
    <View style={styles.card}>

      <Text style={styles.label}>AI Workout</Text>

      <Text style={styles.title}>
        {workout.workouts[0]}
      </Text>

      <Text style={styles.goal}>
        {workout.goal}
      </Text>

    </View>
  );
}