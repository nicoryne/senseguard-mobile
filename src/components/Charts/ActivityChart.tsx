import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

import { useGaitData } from '../../hooks/useGaitData';
import { COLORS } from '../../utils/colors';

const chartWidth = Dimensions.get('window').width - 48;

const chartConfig = {
  backgroundGradientFrom: COLORS.surface.background,
  backgroundGradientTo: COLORS.surface.background,
  color: () => COLORS.primary,
  labelColor: () => COLORS.neutral.medium,
};

const ActivityChart = () => {
  const { activity } = useGaitData();

  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels: activity.map((item) => item.day),
          datasets: [{ data: activity.map((item) => item.steps) }],
        }}
        width={chartWidth}
        height={200}
        chartConfig={chartConfig}
        fromZero
        style={{ borderRadius: 16 }}
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

export default ActivityChart;

