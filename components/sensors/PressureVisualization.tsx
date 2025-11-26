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

  const renderFootVisualization = (data: number[], side: 'left' | 'right') => {
    // Map pressure data to zones (6 data points map to 5 zones)
    const zonePressures = [
      Math.max(data[0] || 0, data[1] || 0), // Heel (2 sensors combined)
      data[2] || 0,                          // Midfoot
      data[3] || 0,                          // Forefoot lateral
      data[4] || 0,                          // Forefoot medial
      data[5] || 0,                          // Toes
    ];

    // Realistic foot SVG path (plantar view - bottom of foot)
    const footPath = side === 'left' 
      ? "M 30 15 Q 25 12 20 15 L 15 20 Q 10 25 12 35 L 15 50 Q 18 60 25 68 L 35 72 Q 45 74 55 72 L 65 68 Q 72 60 75 50 L 78 35 Q 80 25 75 20 L 70 15 Q 65 12 60 15 L 55 18 Q 50 20 45 18 L 40 16 Q 35 14 30 15 Z"
      : "M 70 15 Q 75 12 80 15 L 85 20 Q 90 25 88 35 L 85 50 Q 82 60 75 68 L 65 72 Q 55 74 45 72 L 35 68 Q 28 60 25 50 L 22 35 Q 20 25 25 20 L 30 15 Q 35 12 40 15 L 45 18 Q 50 20 55 18 L 60 16 Q 65 14 70 15 Z";

    // Pressure zones on foot (anatomically accurate positions)
    const pressureZones = [
      { x: side === 'left' ? 30 : 70, y: 68, radius: 12 },      // Heel
      { x: 50, y: 55, radius: 10 },                             // Midfoot/Arch
      { x: side === 'left' ? 60 : 40, y: 35, radius: 9 },       // Forefoot (lateral)
      { x: side === 'left' ? 55 : 45, y: 35, radius: 9 },       // Forefoot (medial)
      { x: side === 'left' ? 65 : 35, y: 20, radius: 7 },      // Toes
    ];

    return (
      <View className="flex-1 items-center">
        <Text className="text-sm font-semibold text-[#2A2D34] mb-3 text-center" style={{ fontFamily: 'Roboto' }}>
          {side === 'left' ? 'Left Foot' : 'Right Foot'}
        </Text>
        <View className="relative">
          <Svg width="120" height="120" viewBox="0 0 100 100">
            {/* Foot outline with gradient fill */}
            <defs>
              <linearGradient id={`footGradient-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F8F9FA" stopOpacity="1" />
                <stop offset="100%" stopColor="#E5E7EB" stopOpacity="1" />
              </linearGradient>
            </defs>
            <Path
              d={footPath}
              fill={`url(#footGradient-${side})`}
              stroke="#D1D5DB"
              strokeWidth="1.5"
            />
            {/* Pressure zones as heatmap overlays */}
            {pressureZones.map((zone, index) => {
              const pressure = zonePressures[index] || 0;
              if (pressure === 0) return null;
              
              const color = getPressureColor(pressure, maxPressure);
              const opacity = 0.5 + (pressure / maxPressure) * 0.5;
              const radius = zone.radius * (0.7 + (pressure / maxPressure) * 0.6);
              
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
            {/* Foot outline overlay for better definition */}
            <Path
              d={footPath}
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="1"
              opacity="0.3"
            />
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

