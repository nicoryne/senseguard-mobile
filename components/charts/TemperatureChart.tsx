import { View, Text } from 'react-native';
import Card from '../ui/Card';
import { Ionicons } from '@expo/vector-icons';

interface TemperatureChartProps {
  leftFoot: number;
  rightFoot: number;
  className?: string;
}

export default function TemperatureChart({ leftFoot, rightFoot, className = '' }: TemperatureChartProps) {
  const getTemperatureColor = (temp: number) => {
    if (temp < 30) return '#0EA5E9'; // Low - Blue
    if (temp < 33) return '#10B981'; // Normal - Green
    if (temp < 35) return '#F59E0B'; // Elevated - Orange
    return '#EF4444'; // High - Red
  };

  const getTemperatureStatus = (temp: number) => {
    if (temp < 30) return 'Low';
    if (temp < 33) return 'Normal';
    if (temp < 35) return 'Elevated';
    return 'High';
  };

  return (
    <Card className={`p-4 ${className}`}>
      <Text className="text-lg font-bold text-[#2A2D34] mb-4" style={{ fontFamily: 'Inter' }}>
        Temperature
      </Text>
      
      <View className="flex-row justify-between">
        <View className="flex-1 items-center">
          <View className="w-20 h-20 rounded-full items-center justify-center mb-2" style={{ backgroundColor: `${getTemperatureColor(leftFoot)}20` }}>
            <Ionicons name="thermometer" size={32} color={getTemperatureColor(leftFoot)} />
          </View>
          <Text className="text-2xl font-bold mb-1" style={{ color: getTemperatureColor(leftFoot), fontFamily: 'Inter' }}>
            {leftFoot.toFixed(1)}°C
          </Text>
          <Text className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
            Left Foot
          </Text>
          <Text className="text-xs text-[#6B7280] mt-1" style={{ fontFamily: 'Roboto' }}>
            {getTemperatureStatus(leftFoot)}
          </Text>
        </View>

        <View className="w-px bg-[#E5E7EB] mx-4" />

        <View className="flex-1 items-center">
          <View className="w-20 h-20 rounded-full items-center justify-center mb-2" style={{ backgroundColor: `${getTemperatureColor(rightFoot)}20` }}>
            <Ionicons name="thermometer" size={32} color={getTemperatureColor(rightFoot)} />
          </View>
          <Text className="text-2xl font-bold mb-1" style={{ color: getTemperatureColor(rightFoot), fontFamily: 'Inter' }}>
            {rightFoot.toFixed(1)}°C
          </Text>
          <Text className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
            Right Foot
          </Text>
          <Text className="text-xs text-[#6B7280] mt-1" style={{ fontFamily: 'Roboto' }}>
            {getTemperatureStatus(rightFoot)}
          </Text>
        </View>
      </View>
    </Card>
  );
}

