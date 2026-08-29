import React from "react";
import { View, Text } from "react-native";

import { useAIStore } from "../../store/aiStore";

export default function WeeklyReflectionCard(){

  const { reflection } = useAIStore();

  if(!reflection) return null;

  return(

    <View style={styles.card}>

      <Text>Weekly Reflection</Text>

      <Text>
        {reflection.overallStatus}
      </Text>

      <Text numberOfLines={3}>
        {reflection.reflection}
      </Text>

    </View>
  );
}