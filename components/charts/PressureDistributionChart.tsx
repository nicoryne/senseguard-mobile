import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

import { usePressureData } from '../../hooks/usePressureData';
import { COLORS } from '../../lib/colors';

const chartWidth = Dimensions.get('window').width - 48;

const chartConfig = {
  backgroundGradientFrom: COLORS.surface.background,
  backgroundGradientTo: COLORS.surface.background,
  color: () => COLORS.accent,
  labelColor: () => COLORS.neutral.medium,
};

const PressureDistributionChart = () => {
  const { latest } = usePressureData();

  const data = latest
    ? {
        labels: ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5', 'Zone 6'],
        datasets: [
          {
            data: latest.left.map(
              (value, index) => (value + latest.right[index]) / 2
            ),
          },
        ],
      }
    : {
        labels: [],
        datasets: [{ data: [] }],
      };

  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        width={chartWidth}
        height={220}
        chartConfig={chartConfig}
        style={{ borderRadius: 16 }}
        fromZero
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: COLORS.surface.background,
    paddingVertical: 8,
  },
});

export default PressureDistributionChart;



