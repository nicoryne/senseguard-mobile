import { View, Text, ScrollView, Modal, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CaregiverProfile } from '@/types/user';
import Card from '../ui/Card';

interface CaregiverDetailProps {
  caregiver: CaregiverProfile | null;
  visible: boolean;
  onClose: () => void;
}

export default function CaregiverDetail({ caregiver, visible, onClose }: CaregiverDetailProps) {
  if (!caregiver) return null;

  // Mock data about what they see from you
  const patientData = {
    lastSync: '2 hours ago',
    monitoring: ['Pressure readings', 'Gait analysis', 'Temperature data', 'VPT feedback'],
    alerts: 2,
    reports: 5,
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView className="flex-1 bg-[#F8F9FA]">
        <View className="flex-1">
          {/* Header */}
          <View className="bg-white px-6 py-4 flex-row items-center border-b border-[#E5E7EB]">
            <Pressable onPress={onClose} className="mr-4">
              <Ionicons name="close" size={24} color="#2A2D34" />
            </Pressable>
            <Text className="text-xl font-bold text-[#2A2D34] flex-1" style={{ fontFamily: 'Inter' }}>
              Caregiver Details
            </Text>
          </View>

          <ScrollView className="flex-1" contentContainerClassName="p-6">
            {/* Caregiver Info */}
            <Card className="p-4 mb-4">
              <View className="flex-row items-center mb-4">
                <View className="w-16 h-16 rounded-full bg-[#4982BB] items-center justify-center mr-4">
                  <Ionicons name="person" size={32} color="#FFFFFF" />
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-bold text-[#2A2D34] mb-1" style={{ fontFamily: 'Inter' }}>
                    {caregiver.name}
                  </Text>
                  <Text className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                    {caregiver.specialization || 'Healthcare Provider'}
                  </Text>
                </View>
              </View>
              
              <View className="pt-4 border-t border-[#E5E7EB]">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                    Email
                  </Text>
                  <Text className="text-sm font-semibold text-[#2A2D34]" style={{ fontFamily: 'Roboto' }}>
                    {caregiver.email}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                    Location
                  </Text>
                  <Text className="text-sm font-semibold text-[#2A2D34]" style={{ fontFamily: 'Roboto' }}>
                    {caregiver.location || 'Not specified'}
                  </Text>
                </View>
              </View>
            </Card>

            {/* What They See From You */}
            <Card className="p-4">
              <Text className="text-lg font-bold text-[#2A2D34] mb-4" style={{ fontFamily: 'Inter' }}>
                What They See From You
              </Text>
              
              <View className="mb-4">
                <Text className="text-sm text-[#6B7280] mb-2" style={{ fontFamily: 'Roboto' }}>
                  Last Sync: {patientData.lastSync}
                </Text>
                
                <Text className="text-sm font-semibold text-[#2A2D34] mb-2" style={{ fontFamily: 'Roboto' }}>
                  Monitoring Data:
                </Text>
                {patientData.monitoring.map((item, index) => (
                  <View key={index} className="flex-row items-center mb-2">
                    <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                    <Text className="text-sm text-[#6B7280] ml-2" style={{ fontFamily: 'Roboto' }}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>

              <View className="pt-4 border-t border-[#E5E7EB] flex-row justify-between">
                <View>
                  <Text className="text-xs text-[#6B7280] mb-1" style={{ fontFamily: 'Roboto' }}>
                    Active Alerts
                  </Text>
                  <Text className="text-lg font-bold text-[#EF4444]" style={{ fontFamily: 'Inter' }}>
                    {patientData.alerts}
                  </Text>
                </View>
                <View>
                  <Text className="text-xs text-[#6B7280] mb-1" style={{ fontFamily: 'Roboto' }}>
                    Reports Generated
                  </Text>
                  <Text className="text-lg font-bold text-[#4982BB]" style={{ fontFamily: 'Inter' }}>
                    {patientData.reports}
                  </Text>
                </View>
              </View>
            </Card>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

