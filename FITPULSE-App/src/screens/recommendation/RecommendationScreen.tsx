import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import RecommendationCard from './RecommendationCard';

import {
  getRecommendations,
  getActivityRecommendation,
} from '../../api/recommendationApi';

const types = [
  'RUNNING',
  'YOGA',
  'GYM',
  'CYCLING',
];

export default function RecommendationScreen() {
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState('RUNNING');

  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);

    const data = await getRecommendations();

    setList(data);

    setLoading(false);
  };

  const filterType = async (type: string) => {
    setSelected(type);

    setLoading(true);

    const data =
      await getActivityRecommendation(type);

    setList(data);

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#7C3AED', '#312E81']}
        style={styles.hero}
      >
        <Text style={styles.small}>AI Coach</Text>

        <Text style={styles.title}>
          Smart Recommendations
        </Text>

        <Text style={styles.sub}>
          Personalized workout & recovery insights
        </Text>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.body}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {types.map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.chip,
                selected === t && styles.activeChip,
              ]}
              onPress={() => filterType(t)}
            >
              <Text
                style={[
                  styles.chipText,
                  selected === t &&
                    styles.activeChipText,
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#22D3EE"
            style={{ marginTop: 40 }}
          />
        ) : (
          list.map((item: any, i) => (
            <RecommendationCard
              key={i}
              item={item}
            />
          ))
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B16',
  },

  hero: {
    paddingTop: 70,
    paddingHorizontal: 22,
    paddingBottom: 30,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  small: {
    color: '#DDD6FE',
    fontSize: 14,
  },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 8,
  },

  sub: {
    color: '#C4B5FD',
    marginTop: 6,
  },

  body: {
    padding: 18,
  },

  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#111827',
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 18,
  },

  activeChip: {
    backgroundColor: '#22D3EE',
  },

  chipText: {
    color: '#94A3B8',
    fontWeight: '600',
  },

  activeChipText: {
    color: '#000',
  },
});