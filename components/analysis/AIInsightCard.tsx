import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../ui/Card';

interface AIInsightCardProps {
  title: string;
  insight: string;
  severity?: 'info' | 'warning' | 'critical';
  icon?: string;
  className?: string;
}

export default function AIInsightCard({
  title,
  insight,
  severity = 'info',
  icon,
  className = '',
}: AIInsightCardProps) {
  const severityColors = {
    info: { bg: '#4982BB', icon: 'information-circle', text: '#4982BB' },
    warning: { bg: '#F59E0B', icon: 'warning', text: '#F59E0B' },
    critical: { bg: '#EF4444', icon: 'alert-circle', text: '#EF4444' },
  };

  const color = severityColors[severity];

  return (
    <Card className={`p-4 ${className}`}>
      <View className="flex-row items-start">
        <View
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: `${color.bg}20` }}
        >
          <Ionicons name={(icon as any) || color.icon} size={20} color={color.bg} />
        </View>
        <View className="flex-1">
          <Text className="text-base font-bold text-[#2A2D34] mb-2" style={{ fontFamily: 'Inter' }}>
            {title}
          </Text>
          <Text className="text-sm text-[#6B7280] leading-5" style={{ fontFamily: 'Roboto' }}>
            {insight}
          </Text>
        </View>
      </View>
    </Card>
  );
}

