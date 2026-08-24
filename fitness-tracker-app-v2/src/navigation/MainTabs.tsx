import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import DashboardScreen from '../screens/dashboard/DashboardScreen';
import ActivitiesScreen from '../screens/activity/ActivitiesScreen';
import RecommendationScreen from '../screens/recommendation/RecommendationScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

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
              color={focused ? '#7C3AED' : '#7B849C'}
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
              color={focused ? '#22D3EE' : '#7B849C'}
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
              color={focused ? '#8B5CF6' : '#7B849C'}
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
              color={focused ? '#7C3AED' : '#7B849C'}
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
    left: 18,
    right: 18,
    bottom: 18,
    height: 72,
    borderRadius: 22,
    backgroundColor: '#111827',
    borderTopWidth: 0,
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
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#070B16',
  },
});