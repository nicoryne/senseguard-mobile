import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../ui/Card';

interface PredictionCardProps {
  title: string;
  prediction: string;
  confidence: number;
  timeframe: string;
  trend?: 'up' | 'down' | 'stable';
  className?: string;
}

export default function PredictionCard({
  title,
  prediction,
  confidence,
  timeframe,
  trend = 'stable',
  className = '',
}: PredictionCardProps) {
  const trendColors = {
    up: { color: '#10B981', icon: 'trending-up' },
    down: { color: '#EF4444', icon: 'trending-down' },
    stable: { color: '#4982BB', icon: 'remove' },
  };

  const trendData = trendColors[trend];

  return (
    <Card className={`p-4 ${className}`}>
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-[#2A2D34]" style={{ fontFamily: 'Inter' }}>
          {title}
        </Text>
        <View className="flex-row items-center">
          <Ionicons name={trendData.icon as any} size={20} color={trendData.color} />
        </View>
      </View>
      
      <Text className="text-sm text-[#6B7280] mb-3 leading-5" style={{ fontFamily: 'Roboto' }}>
        {prediction}
      </Text>
      
      <View className="flex-row items-center justify-between pt-3 border-t border-[#E5E7EB]">
        <View>
          <Text className="text-xs text-[#6B7280] mb-1" style={{ fontFamily: 'Roboto' }}>
            Confidence
          </Text>
          <Text className="text-base font-bold text-[#4982BB]" style={{ fontFamily: 'Inter' }}>
            {confidence}%
          </Text>
        </View>
        <View>
          <Text className="text-xs text-[#6B7280] mb-1" style={{ fontFamily: 'Roboto' }}>
            Timeframe
          </Text>
          <Text className="text-base font-semibold text-[#2A2D34]" style={{ fontFamily: 'Roboto' }}>
            {timeframe}
          </Text>
        </View>
      </View>
    </Card>
  );
}

