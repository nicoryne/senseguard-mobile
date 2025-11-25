import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { useGaitData } from '../../hooks/useGaitData';
import { COLORS } from '../../utils/colors';

const chartWidth = Dimensions.get('window').width - 48;

const chartConfig = {
  backgroundGradientFrom: COLORS.surface.background,
  backgroundGradientTo: COLORS.surface.background,
  color: () => COLORS.primary,
  labelColor: () => COLORS.neutral.medium,
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: COLORS.neutral.lightest,
  },
};

const GaitQualityChart = () => {
  const { metrics } = useGaitData();

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: metrics.map((metric) => metric.label.split(' ')[0]),
          datasets: [
            {
              data: metrics.map((metric) => metric.score),
              color: () => COLORS.primary,
            },
          ],
        }}
        width={chartWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{ borderRadius: 16 }}
        fromZero
        yAxisSuffix="%"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.surface.background,
  },
});

export default GaitQualityChart;

