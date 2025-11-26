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

    // Foot SVG path from foot.svg (viewBox: 0 0 100 100)
    // Main foot shape path
    const footPath = "M72.903,74.043c-1.387-2.237-2.202-4.867-2.202-7.693c0-2.464,0.616-4.782,1.692-6.82l-0.034-0.051c2.168-3.252,3.436-7.155,3.436-11.356c0-11.326-9.182-20.507-20.507-20.507c-11.326,0-20.507,9.181-20.507,20.507c0,2.212,0.36,4.338,1.009,6.335c0.436,1.792,1.139,3.475,2.068,5.011l-0.096,0.055l14.854,25.729c1.568,4.64,5.947,7.984,11.115,7.984c6.484,0,11.743-5.256,11.743-11.741c0-2.813-0.992-5.394-2.643-7.416L72.903,74.043z";

    // Toe circles from the SVG (for reference, we'll render them too)
    const toeCircles = [
      { cx: 28.549, cy: 35.885, r: 4.342 },
      { cx: 65.794, cy: 15.531, r: 8.767 },
      { cx: 47.712, cy: 18.329, r: 5.469 },
      { cx: 36.161, cy: 26.693, r: 4.342 },
    ];

    // Pressure zones on foot (adjusted for 100x100 viewBox)
    // Coordinates based on anatomical positions in the SVG
    const pressureZones = [
      { x: side === 'left' ? 72.903 : 27.097, y: 74.043, radius: 8 },      // Heel (bottom of foot path)
      { x: side === 'left' ? 55 : 45, y: 50, radius: 6 },                 // Midfoot/Arch (center)
      { x: side === 'left' ? 65.794 : 34.206, y: 15.531, radius: 5 },     // Forefoot (lateral - using toe circle position)
      { x: side === 'left' ? 47.712 : 52.288, y: 18.329, radius: 5 },     // Forefoot (medial - using toe circle position)
      { x: side === 'left' ? 36.161 : 63.839, y: 26.693, radius: 4 },     // Toes (using toe circle position)
    ];

    return (
      <View className="flex-1 items-center">
        <Text className="text-sm font-semibold text-[#2A2D34] mb-3 text-center" style={{ fontFamily: 'Roboto' }}>
          {side === 'left' ? 'Left Foot' : 'Right Foot'}
        </Text>
        <View className="relative">
          <Svg width="120" height="120" viewBox="0 0 100 100">
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
              strokeWidth="0.5"
              transform={side === 'right' ? 'scale(-1, 1) translate(-100, 0)' : ''}
            />
            {/* Toe circles from SVG (subtle, for anatomical reference) */}
            {toeCircles.map((circle, idx) => (
              <Circle
                key={`toe-${idx}`}
                cx={side === 'right' ? 100 - circle.cx : circle.cx}
                cy={circle.cy}
                r={circle.r * 0.3}
                fill="#D1D5DB"
                opacity="0.2"
              />
            ))}
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
              strokeWidth="0.4"
              opacity="0.3"
              transform={side === 'right' ? 'scale(-1, 1) translate(-100, 0)' : ''}
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

