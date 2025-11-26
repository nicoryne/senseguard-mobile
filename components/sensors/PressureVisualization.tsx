import { View, Text } from 'react-native';
import { Svg, Path, Circle, LinearGradient, Stop, Defs } from 'react-native-svg';
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

    // Foot SVG path from foot-svgrepo-com.svg (main foot shape only, no toe circles)
    // Original viewBox: 0 0 24 24, scaled and positioned for our use
    const footPath = "M7.95965,7.25709 C9.35656,6.20969 11.3117,5.74588 13.2081,6.13844 C16.9707,6.91731 18.9332,9.929 18.9989,13.6782 C19.0523,16.7248 17.1181,20.4774 14.1763,21.6909 C12.4161,22.417 10.1297,21.6748 9.41342,19.8177 C9.14612,19.1247 9.1986562,18.4516488 9.31077943,17.7743923 L9.3915,17.322 C9.44945,17.0085 9.50776,16.6931 9.541,16.3732 C9.608425,15.724225 9.23701,15.3203312 8.76829234,14.9854703 L8.52740615,14.8229775 L7.97239,14.4721 L7.7056577,14.2896426 C7.07520406,13.838725 6.4085,13.19665 6.13179,12.0511 C5.64736,10.0455 6.54109,8.32073 7.95965,7.25709 Z";

    // Pressure zones on foot (adjusted for the new SVG path)
    // Coordinates are relative to the 24x24 viewBox, scaled to our 100x100 viewBox
    const pressureZones = [
      { x: side === 'left' ? 12 : 12, y: 20, radius: 3 },       // Heel (centered, bottom)
      { x: 12, y: 14, radius: 2.5 },                            // Midfoot/Arch (center)
      { x: side === 'left' ? 15 : 9, y: 10, radius: 2 },         // Forefoot (lateral)
      { x: side === 'left' ? 13.5 : 10.5, y: 10, radius: 2 },    // Forefoot (medial)
      { x: side === 'left' ? 16 : 8, y: 6, radius: 1.5 },      // Toes (front)
    ];

    return (
      <View className="flex-1 items-center">
        <Text className="text-sm font-semibold text-[#2A2D34] mb-3 text-center" style={{ fontFamily: 'Roboto' }}>
          {side === 'left' ? 'Left Foot' : 'Right Foot'}
        </Text>
        <View className="relative">
          <Svg width="120" height="120" viewBox="0 0 24 24">
            <Defs>
              <LinearGradient id={`footGradient-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#F8F9FA" stopOpacity="1" />
                <Stop offset="100%" stopColor="#E5E7EB" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            {/* Foot silhouette from SVG */}
            <Path
              d={footPath}
              fill={`url(#footGradient-${side})`}
              stroke="#D1D5DB"
              strokeWidth="0.3"
              transform={side === 'right' ? 'scale(-1, 1) translate(-24, 0)' : ''}
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
                  transform={side === 'right' ? 'scale(-1, 1) translate(-24, 0)' : ''}
                />
              );
            })}
            {/* Foot outline overlay for better definition */}
            <Path
              d={footPath}
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="0.2"
              opacity="0.3"
              transform={side === 'right' ? 'scale(-1, 1) translate(-24, 0)' : ''}
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

