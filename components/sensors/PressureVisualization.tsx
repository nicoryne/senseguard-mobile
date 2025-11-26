import { View, Text } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';
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

  // Foot SVG path (simplified foot shape)
  const footPath = "M 50 20 Q 45 15 40 20 L 30 25 L 25 40 L 30 60 L 40 70 L 50 75 L 60 70 L 70 60 L 75 40 L 70 25 L 60 20 Q 55 15 50 20 Z";

  // Pressure zones on foot (heel, midfoot, forefoot, toes)
  const pressureZones = [
    { x: 50, y: 70, label: 'Heel' },      // Heel
    { x: 50, y: 50, label: 'Mid' },       // Midfoot
    { x: 50, y: 30, label: 'Fore' },      // Forefoot
    { x: 50, y: 15, label: 'Toe' },       // Toes
  ];

  const renderFootVisualization = (data: number[], side: 'left' | 'right') => {
    // Map pressure data to zones (assuming 6 data points map to 4 zones)
    const zonePressures = [
      Math.max(data[0] || 0, data[1] || 0), // Heel (2 sensors)
      Math.max(data[2] || 0, data[3] || 0), // Midfoot (2 sensors)
      data[4] || 0,                          // Forefoot
      data[5] || 0,                          // Toes
    ];

    return (
      <View className="flex-1 items-center">
        <Text className="text-sm font-semibold text-[#2A2D34] mb-3 text-center" style={{ fontFamily: 'Roboto' }}>
          {side === 'left' ? 'Left Foot' : 'Right Foot'}
        </Text>
        <View className="relative">
          <Svg width="100" height="100" viewBox="0 0 100 100">
            {/* Foot outline */}
            <Path
              d={footPath}
              fill="#F3F4F6"
              stroke="#E5E7EB"
              strokeWidth="2"
            />
            {/* Pressure zones */}
            {pressureZones.map((zone, index) => {
              const pressure = zonePressures[index] || 0;
              const color = getPressureColor(pressure, maxPressure);
              const opacity = 0.6 + (pressure / maxPressure) * 0.4;
              const radius = 8 + (pressure / maxPressure) * 6;
              
              return (
                <Circle
                  key={index}
                  cx={zone.x}
                  cy={zone.y}
                  r={radius}
                  fill={color}
                  opacity={opacity}
                />
              );
            })}
          </Svg>
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
        {renderFootVisualization(leftFoot, 'left')}
        <View className="w-px bg-[#E5E7EB]" />
        {renderFootVisualization(rightFoot, 'right')}
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

