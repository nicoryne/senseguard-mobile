import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Card from '../ui/Card';

interface GaitTrendChartProps {
  data: Array<{ day: string; score: number }>;
  className?: string;
}

export default function GaitTrendChart({ data, className = '' }: GaitTrendChartProps) {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 64; // Account for padding

  const chartData = {
    labels: data.map((d) => d.day),
    datasets: [
      {
        data: data.map((d) => d.score),
        color: (opacity = 1) => `rgba(73, 130, 187, ${opacity})`, // #4982BB
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(73, 130, 187, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#4982BB',
    },
  };

  return (
    <Card className={`p-4 ${className}`}>
      <Text className="text-lg font-bold text-[#2A2D34] mb-4" style={{ fontFamily: 'Inter' }}>
        Gait Trend
      </Text>
      <LineChart
        data={chartData}
        width={chartWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        withInnerLines={false}
        withOuterLines={true}
        withVerticalLines={false}
        withHorizontalLines={true}
        withDots={true}
        withShadow={false}
      />
      <View className="flex-row justify-between mt-2">
        <Text className="text-xs text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
          Quality Score (0-100)
        </Text>
        <Text className="text-xs text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
          Last 7 days
        </Text>
      </View>
    </Card>
  );
}

