import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import DashboardScreen from '../screens/dashboard/DashboardScreen';
import ActivitiesScreen from '../screens/activity/ActivitiesScreen';
import RecommendationScreen from '../screens/recommendation/RecommendationScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

import { Palette, Layout } from '../theme';

const Tab = createBottomTabNavigator();

function AddButton() {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate('AddActivity')}
    >
      <View style={styles.fabInner}>
        <Ionicons name="add" size={30} color="#fff" />
      </View>
    </TouchableOpacity>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Palette.primary,
        tabBarInactiveTintColor: Palette.textMuted,
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={focused ? Palette.primary : Palette.textMuted}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Activity"
        component={ActivitiesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="dumbbell"
              size={24}
              color={focused ? Palette.secondary : Palette.textMuted}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Add"
        component={DashboardScreen}
        options={{
          tabBarButton: () => <AddButton />,
        }}
      />

      <Tab.Screen
        name="AI"
        component={RecommendationScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'sparkles' : 'sparkles-outline'}
              size={24}
              color={focused ? Palette.accent : Palette.textMuted}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={focused ? Palette.primary : Palette.textMuted}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: Layout.tabBarMargin,
    right: Layout.tabBarMargin,
    bottom: Layout.tabBarMargin,
    height: Layout.tabBarHeight,
    borderRadius: Layout.tabBarRadius,
    backgroundColor: Palette.surface,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: Palette.border,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },

  fab: {
    top: -22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fabInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: Palette.bg,
    shadowColor: Palette.primary,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
});