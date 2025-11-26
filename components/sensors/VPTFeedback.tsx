import { View, Text } from 'react-native';
import Card from '../ui/Card';
import { Ionicons } from '@expo/vector-icons';

interface VPTFeedbackProps {
  intensity: number;
  active: boolean;
  className?: string;
}

export default function VPTFeedback({ intensity, active, className = '' }: VPTFeedbackProps) {
  const getIntensityColor = (intensity: number) => {
    if (intensity < 25) return '#0EA5E9';
    if (intensity < 50) return '#84CC16';
    if (intensity < 75) return '#FBBF24';
    return '#EF4444';
  };

  const getIntensityLabel = (intensity: number) => {
    if (intensity < 25) return 'Low';
    if (intensity < 50) return 'Moderate';
    if (intensity < 75) return 'High';
    return 'Maximum';
  };

  return (
    <Card className={`p-4 ${className}`}>
      <Text className="text-lg font-bold text-[#2A2D34] mb-4" style={{ fontFamily: 'Inter' }}>
        VPT Sensor Feedback
      </Text>
      
      <View className="items-center">
        <View
          className="w-24 h-24 rounded-full items-center justify-center mb-4"
          style={{
            backgroundColor: active ? `${getIntensityColor(intensity)}20` : '#F3F4F6',
          }}
        >
          <Ionicons
            name={active ? 'pulse' : 'pulse-outline'}
            size={48}
            color={active ? getIntensityColor(intensity) : '#9CA3AF'}
          />
        </View>
        
        <Text
          className="text-3xl font-bold mb-2"
          style={{
            color: active ? getIntensityColor(intensity) : '#9CA3AF',
            fontFamily: 'Inter',
          }}
        >
          {intensity}%
        </Text>
        
        <Text className="text-sm text-[#6B7280] mb-1" style={{ fontFamily: 'Roboto' }}>
          {getIntensityLabel(intensity)} Intensity
        </Text>
        
        <View className={`px-3 py-1 rounded-full mt-2 ${active ? 'bg-[#10B981]' : 'bg-[#9CA3AF]'}`}>
          <Text className="text-xs font-semibold text-white" style={{ fontFamily: 'Roboto' }}>
            {active ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>
    </Card>
  );
}

