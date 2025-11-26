import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Card from '../ui/Card';

interface PressureChartProps {
  leftFoot: number[];
  rightFoot: number[];
  className?: string;
}

export default function PressureChart({ leftFoot, rightFoot, className = '' }: PressureChartProps) {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 64;

  const chartData = {
    labels: ['Heel', 'Mid', 'Fore', 'Toe'],
    datasets: [
      {
        data: [
          Math.max(...leftFoot.slice(0, 2)),
          Math.max(...leftFoot.slice(2, 4)),
          Math.max(...leftFoot.slice(4, 5)),
          Math.max(...leftFoot.slice(5)),
        ],
        color: (opacity = 1) => `rgba(73, 130, 187, ${opacity})`,
      },
      {
        data: [
          Math.max(...rightFoot.slice(0, 2)),
          Math.max(...rightFoot.slice(2, 4)),
          Math.max(...rightFoot.slice(4, 5)),
          Math.max(...rightFoot.slice(5)),
        ],
        color: (opacity = 1) => `rgba(231, 163, 141, ${opacity})`,
      },
    ],
    legend: ['Left Foot', 'Right Foot'],
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
    barPercentage: 0.7,
  };

  return (
    <Card className={`p-4 ${className}`}>
      <Text className="text-lg font-bold text-[#2A2D34] mb-4" style={{ fontFamily: 'Inter' }}>
        Pressure Distribution
      </Text>
      <BarChart
        data={chartData}
        width={chartWidth}
        height={220}
        chartConfig={chartConfig}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        yAxisLabel=""
        yAxisSuffix=" kPa"
        showValuesOnTopOfBars
        withInnerLines={false}
        withHorizontalLabels={true}
        withVerticalLabels={true}
      />
      <View className="flex-row justify-center gap-4 mt-2">
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-[#4982BB] mr-2" />
          <Text className="text-xs text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
            Left
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-[#e7a38d] mr-2" />
          <Text className="text-xs text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
            Right
          </Text>
        </View>
      </View>
    </Card>
  );
}

