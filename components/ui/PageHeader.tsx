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
    <LinearGradient
      colors={['#E7A38D', '#FF7F56']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="px-4 py-4"
      style={{ paddingTop: insets.top + 16 }}
    >
    <View className="flex-row items-center justify-between">
      <View className="flex-1">
        {showBack && (
          <TouchableOpacity onPress={handleBack} className="mb-2">
            <Feather name="arrow-left" size={24} color="#ffffff" />
          </TouchableOpacity>
        )}
        <Text className="text-white font-bold text-2xl" style={{ fontFamily: 'Inter' }}>{title}</Text>
        {subtitle && (
          <Text className="text-white text-sm mt-1" style={{ fontFamily: 'Roboto' }}>{subtitle}</Text>
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
  );
}

