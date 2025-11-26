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
    colors={['#4982BB', '#355F88', '#213B55']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    className="px-4 pt-16 pb-6"
  >
    <View className="flex-row items-center justify-between">
      <View className="flex-1">
        {showBack && (
          <TouchableOpacity onPress={handleBack} className="mb-2">
            <Feather name="arrow-left" size={24} color="#ffffff" />
          </TouchableOpacity>
        )}
        <Text className="text-text font-heading font-bold text-2xl">{title}</Text>
        {subtitle && (
          <Text className="text-text-secondary font-sans text-sm mt-1">{subtitle}</Text>
        )}
      </View>
      {showLogo && (
        <View className="ml-4">
          <View
            className="w-12 h-12 rounded-lg items-center justify-center"
            style={{ borderWidth: 2, borderColor: '#f9a825' }}
          >
            <Image
              source={require('@/assets/icon.png')}
              className="w-10 h-10"
              resizeMode="contain"
            />
          </View>
        </View>
      )}
    </View>
  </LinearGradient>
  );
}

