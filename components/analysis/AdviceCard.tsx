import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../ui/Card';
import { useState } from 'react';

interface AdviceCardProps {
  title: string;
  advice: string;
  category: 'exercise' | 'lifestyle' | 'medical' | 'prevention';
  priority?: 'high' | 'medium' | 'low';
  className?: string;
}

export default function AdviceCard({
  title,
  advice,
  category,
  priority = 'medium',
  className = '',
}: AdviceCardProps) {
  const [expanded, setExpanded] = useState(false);

  const categoryIcons = {
    exercise: 'fitness',
    lifestyle: 'heart',
    medical: 'medical',
    prevention: 'shield-checkmark',
  };

  const priorityColors = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#10B981',
  };

  return (
    <Card className={`p-4 ${className}`}>
      <Pressable onPress={() => setExpanded(!expanded)}>
        <View className="flex-row items-start">
          <View
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: `${priorityColors[priority]}20` }}
          >
            <Ionicons
              name={categoryIcons[category] as any}
              size={20}
              color={priorityColors[priority]}
            />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-base font-bold text-[#2A2D34] flex-1" style={{ fontFamily: 'Inter' }}>
                {title}
              </Text>
              <Ionicons
                name={expanded ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#6B7280"
              />
            </View>
            <View className="flex-row items-center mb-2">
              <View
                className="px-2 py-0.5 rounded-full mr-2"
                style={{ backgroundColor: `${priorityColors[priority]}20` }}
              >
                <Text
                  className="text-xs font-semibold capitalize"
                  style={{ color: priorityColors[priority], fontFamily: 'Roboto' }}
                >
                  {priority} priority
                </Text>
              </View>
              <Text className="text-xs text-[#6B7280] capitalize" style={{ fontFamily: 'Roboto' }}>
                {category}
              </Text>
            </View>
            {expanded && (
              <Text className="text-sm text-[#6B7280] leading-5 mt-2" style={{ fontFamily: 'Roboto' }}>
                {advice}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </Card>
  );
}

