import { View, Text } from 'react-native';
import Card from '../ui/Card';

interface PressureVisualizationProps {
  leftFoot: number[];
  rightFoot: number[];
  maxPressure: number;
  avgPressure: number;
  className?: string;
}

export default function PressureVisualization({
  leftFoot,
  rightFoot,
  maxPressure,
  avgPressure,
  className = '',
}: PressureVisualizationProps) {
  const getPressureColor = (pressure: number, max: number) => {
    const ratio = pressure / max;
    if (ratio < 0.3) return '#0EA5E9'; // Low - Blue
    if (ratio < 0.5) return '#84CC16'; // Moderate - Green
    if (ratio < 0.7) return '#FBBF24'; // High - Yellow
    return '#EF4444'; // Critical - Red
  };

  const renderFootGrid = (data: number[], side: 'left' | 'right') => {
    return (
      <View className="flex-1">
        <Text className="text-sm font-semibold text-[#2A2D34] mb-2 text-center" style={{ fontFamily: 'Roboto' }}>
          {side === 'left' ? 'Left Foot' : 'Right Foot'}
        </Text>
        <View className="flex-row flex-wrap justify-center gap-1">
          {data.map((pressure, index) => (
            <View
              key={index}
              className="w-8 h-8 rounded"
              style={{
                backgroundColor: getPressureColor(pressure, maxPressure),
                opacity: 0.7 + (pressure / maxPressure) * 0.3,
              }}
            />
          ))}
        </View>
        <Text className="text-xs text-[#6B7280] mt-2 text-center" style={{ fontFamily: 'Roboto' }}>
          Max: {Math.max(...data).toFixed(0)} kPa
        </Text>
      </View>
    );
  };

  return (
    <Card className={`p-4 ${className}`}>
      <Text className="text-lg font-bold text-[#2A2D34] mb-4" style={{ fontFamily: 'Inter' }}>
        Plantar Pressure
      </Text>
      
      <View className="flex-row gap-4 mb-4">
        {renderFootGrid(leftFoot, 'left')}
        <View className="w-px bg-[#E5E7EB]" />
        {renderFootGrid(rightFoot, 'right')}
      </View>

      <View className="flex-row justify-between pt-4 border-t border-[#E5E7EB]">
        <View>
          <Text className="text-xs text-[#6B7280] mb-1" style={{ fontFamily: 'Roboto' }}>
            Max Pressure
          </Text>
          <Text className="text-lg font-bold text-[#2A2D34]" style={{ fontFamily: 'Inter' }}>
            {maxPressure} kPa
          </Text>
        </View>
        <View>
          <Text className="text-xs text-[#6B7280] mb-1" style={{ fontFamily: 'Roboto' }}>
            Avg Pressure
          </Text>
          <Text className="text-lg font-bold text-[#2A2D34]" style={{ fontFamily: 'Inter' }}>
            {avgPressure.toFixed(0)} kPa
          </Text>
        </View>
      </View>

      <View className="flex-row justify-center gap-4 mt-4">
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded bg-[#0EA5E9] mr-2" />
          <Text className="text-xs text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
            Low
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded bg-[#84CC16] mr-2" />
          <Text className="text-xs text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
            Moderate
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded bg-[#FBBF24] mr-2" />
          <Text className="text-xs text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
            High
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded bg-[#EF4444] mr-2" />
          <Text className="text-xs text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
            Critical
          </Text>
        </View>
      </View>
    </Card>
  );
}

