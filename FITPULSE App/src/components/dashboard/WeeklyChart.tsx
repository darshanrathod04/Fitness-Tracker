import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '../../theme/colors';

const width = Dimensions.get('window').width - 32;

export default function WeeklyChart() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Weekly Progress</Text>

      <LineChart
        data={{
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          datasets: [
            {
              data: [420, 680, 510, 900, 760, 1100, 980],
            },
          ],
        }}
        width={width - 32}
        height={180}
        yAxisSuffix=" cal"
        withDots
        withInnerLines={false}
        withOuterLines={false}
        withShadow={false}
        chartConfig={{
          backgroundGradientFrom: Colors.surface,
          backgroundGradientTo: Colors.surface,
          decimalPlaces: 0,
          color: () => Colors.primary,
          labelColor: () => Colors.gray,
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: Colors.secondary,
          },
        }}
        bezier
        style={{ borderRadius: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 22,
    padding: 16,
    marginTop: 18,
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
});