import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function PageHeader({ title, subtitle, className = '' }: PageHeaderProps) {
  return (
    <View className={`px-6 pt-6 pb-4 ${className}`}>
      <View className="flex-row items-center mb-3">
        <LinearGradient
          colors={['#4982BB', '#e7a38d']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-12 h-12 rounded-xl items-center justify-center mr-3"
        >
          <Image
            source={require('@/assets/images/icon-transparent.png')}
            style={{ width: 32, height: 32 }}
            contentFit="contain"
          />
        </LinearGradient>
        <View className="flex-1">
          <Text className="text-3xl font-bold text-[#2A2D34]" style={{ fontFamily: 'Inter' }}>
            {title}
          </Text>
          {subtitle && (
            <Text className="text-base text-[#6B7280] mt-1" style={{ fontFamily: 'Roboto' }}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

