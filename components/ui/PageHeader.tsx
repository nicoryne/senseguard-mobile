import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showLogo?: boolean;
  className?: string;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  showBack = false,
  showLogo = true,
  className = '' 
}: PageHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        paddingTop: insets.top,
      }}
    >
      <LinearGradient
        colors={['#4982BB', '#2A2D34', '#4982BB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className={`px-4 pt-4 pb-6 ${className}`}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            {showBack && (
              <TouchableOpacity onPress={handleBack} className="mb-2">
                <Feather name="arrow-left" size={24} color="#ffffff" />
              </TouchableOpacity>
            )}
            <Text className="text-white font-bold text-2xl" style={{ fontFamily: 'Inter' }}>
              {title}
            </Text>
            {subtitle && (
              <Text className="text-white/70 text-sm mt-1" style={{ fontFamily: 'Roboto' }}>
                {subtitle}
              </Text>
            )}
          </View>
          {showLogo && (
            <View className="ml-4">
              <Image
                source={require('@/assets/images/icon-transparent.png')}
                style={{ width: 48, height: 48 }}
                contentFit="contain"
              />
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

