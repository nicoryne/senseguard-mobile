import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CaregiverProfile } from '@/types/user';

interface CaregiverRowProps {
  caregiver: CaregiverProfile;
  onPress: () => void;
}

export default function CaregiverRow({ caregiver, onPress }: CaregiverRowProps) {
  // Mock online status (in real app, this would come from real-time data)
  const isOnline = Math.random() > 0.3;
  const connectedDate = '2024-01-15'; // Mock connection date

  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-xl p-4 mb-3 active:opacity-80 flex-row items-center"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <View className="w-12 h-12 rounded-full bg-[#4982BB] items-center justify-center mr-3">
        <Ionicons name="person" size={24} color="#FFFFFF" />
      </View>
      
      <View className="flex-1">
        <View className="flex-row items-center mb-1">
          <Text className="text-base font-semibold text-[#2A2D34] mr-2" style={{ fontFamily: 'Roboto' }}>
            {caregiver.name}
          </Text>
          <View className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[#10B981]' : 'bg-[#9CA3AF]'}`} />
        </View>
        
        <Text className="text-sm text-[#6B7280] mb-1" style={{ fontFamily: 'Roboto' }}>
          {caregiver.specialization || 'Healthcare Provider'}
        </Text>
        
        <Text className="text-xs text-[#9CA3AF]" style={{ fontFamily: 'Roboto' }}>
          Connected: {new Date(connectedDate).toLocaleDateString()} • {isOnline ? 'Online' : 'Offline'}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </Pressable>
  );
}

