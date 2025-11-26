import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PatientSummary } from '@/types/user';

interface PatientRowProps {
  patient: PatientSummary;
  onPress: () => void;
}

export default function PatientRow({ patient, onPress }: PatientRowProps) {
  // Mock online status
  const isOnline = Math.random() > 0.4;
  const connectedDate = '2024-01-20'; // Mock connection date

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return '#10B981';
      case 'medium':
        return '#F59E0B';
      case 'high':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

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
      <View className="w-12 h-12 rounded-full bg-[#e7a38d] items-center justify-center mr-3">
        <Ionicons name="person" size={24} color="#FFFFFF" />
      </View>
      
      <View className="flex-1">
        <View className="flex-row items-center mb-1">
          <Text className="text-base font-semibold text-[#2A2D34] mr-2" style={{ fontFamily: 'Roboto' }}>
            {patient.name}
          </Text>
          <View className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[#10B981]' : 'bg-[#9CA3AF]'}`} />
        </View>
        
        <View className="flex-row items-center mb-1">
          <View
            className="px-2 py-0.5 rounded-full mr-2"
            style={{ backgroundColor: `${getRiskColor(patient.riskLevel)}20` }}
          >
            <Text
              className="text-xs font-semibold capitalize"
              style={{ color: getRiskColor(patient.riskLevel), fontFamily: 'Roboto' }}
            >
              {patient.riskLevel} Risk
            </Text>
          </View>
          <Text className="text-xs text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
            Max: {patient.maxPressure} kPa
          </Text>
        </View>
        
        <Text className="text-xs text-[#9CA3AF]" style={{ fontFamily: 'Roboto' }}>
          Connected: {new Date(connectedDate).toLocaleDateString()} • {isOnline ? 'Online' : 'Offline'}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </Pressable>
  );
}

