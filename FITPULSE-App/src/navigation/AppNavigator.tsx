import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

import MainTabs from './MainTabs';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AddActivityScreen from '../screens/activity/AddActivityScreen';

// Phase 3 feature screens
import GoalsScreen from '../screens/goals/GoalsScreen';
import NutritionScreen from '../screens/nutrition/NutritionScreen';
import WeightScreen from '../screens/weight/WeightScreen';
import AchievementsScreen from '../screens/achievements/AchievementsScreen';
import ProgressScreen from '../screens/progress/ProgressScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={MainTabs} />

      <Stack.Screen
        name="AddActivity"
        component={AddActivityScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />

      <Stack.Screen name="Goals" component={GoalsScreen} />
      <Stack.Screen name="Nutrition" component={NutritionScreen} />
      <Stack.Screen name="Weight" component={WeightScreen} />
      <Stack.Screen name="Achievements" component={AchievementsScreen} />
      <Stack.Screen name="Progress" component={ProgressScreen} />

      <Stack.Screen name="Admin" component={AdminDashboardScreen} />
    </Stack.Navigator>
  );
}