import { View, Text, ScrollView, Modal, Pressable, SafeAreaView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PatientSummary } from '@/types/user';
import Card from '../ui/Card';
import { LineChart } from 'react-native-chart-kit';
import { usePressureData } from '@/hooks/usePressureData';
import { useGaitData } from '@/hooks/useGaitData';

interface PatientDetailProps {
  patient: PatientSummary | null;
  visible: boolean;
  onClose: () => void;
}

export default function PatientDetail({ patient, visible, onClose }: PatientDetailProps) {
  const insets = useSafeAreaInsets();
  const { history: pressureHistory } = usePressureData();
  const { activity: gaitActivity } = useGaitData();
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 64;

  if (!patient) return null;

  // Prepare chart data
  const pressureChartData = {
    labels: pressureHistory.slice(0, 7).map((_, i) => `Day ${i + 1}`),
    datasets: [
      {
        data: pressureHistory.slice(0, 7).map((p) => p.summary.avg),
        color: (opacity = 1) => `rgba(73, 130, 187, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const gaitChartData = {
    labels: gaitActivity.map((a) => a.day),
    datasets: [
      {
        data: gaitActivity.map((a) => a.compliance),
        color: (opacity = 1) => `rgba(231, 163, 141, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(73, 130, 187, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

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
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView className="flex-1 bg-[#F8F9FA]">
        <View className="flex-1">
          {/* Header */}
          <View 
            className="bg-white px-6 flex-row items-center border-b border-[#E5E7EB]"
            style={{ paddingTop: Math.max(insets.top, 32), paddingBottom: 16 }}
          >
            <Pressable 
              onPress={onClose} 
              className="mr-4"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={24} color="#2A2D34" />
            </Pressable>
            <Text className="text-xl font-bold text-[#2A2D34] flex-1" style={{ fontFamily: 'Inter' }}>
              Patient Details
            </Text>
          </View>

          <ScrollView className="flex-1" contentContainerClassName="p-6">
            {/* Patient Info */}
            <Card className="p-4 mb-4">
              <View className="flex-row items-center mb-4">
                <View className="w-16 h-16 rounded-full bg-[#e7a38d] items-center justify-center mr-4">
                  <Ionicons name="person" size={32} color="#FFFFFF" />
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-bold text-[#2A2D34] mb-1" style={{ fontFamily: 'Inter' }}>
                    {patient.name}
                  </Text>
                  <View
                    className="px-3 py-1 rounded-full self-start"
                    style={{ backgroundColor: `${getRiskColor(patient.riskLevel)}20` }}
                  >
                    <Text
                      className="text-xs font-semibold capitalize"
                      style={{ color: getRiskColor(patient.riskLevel), fontFamily: 'Roboto' }}
                    >
                      {patient.riskLevel} Risk
                    </Text>
                  </View>
                </View>
              </View>
              
              <View className="pt-4 border-t border-[#E5E7EB]">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                    Email
                  </Text>
                  <Text className="text-sm font-semibold text-[#2A2D34]" style={{ fontFamily: 'Roboto' }}>
                    {patient.email}
                  </Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                    Location
                  </Text>
                  <Text className="text-sm font-semibold text-[#2A2D34]" style={{ fontFamily: 'Roboto' }}>
                    {patient.location || 'Not specified'}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                    Status
                  </Text>
                  <Text className="text-sm font-semibold text-[#2A2D34] capitalize" style={{ fontFamily: 'Roboto' }}>
                    {patient.status}
                  </Text>
                </View>
              </View>
            </Card>

            {/* Pressure Metrics */}
            <Card className="p-4 mb-4">
              <Text className="text-lg font-bold text-[#2A2D34] mb-4" style={{ fontFamily: 'Inter' }}>
                Pressure Metrics
              </Text>
              
              <View className="flex-row justify-between mb-4">
                <View className="flex-1">
                  <Text className="text-xs text-[#6B7280] mb-1" style={{ fontFamily: 'Roboto' }}>
                    Max Pressure
                  </Text>
                  <Text className="text-2xl font-bold text-[#2A2D34]" style={{ fontFamily: 'Inter' }}>
                    {patient.maxPressure}
                  </Text>
                  <Text className="text-xs text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                    kPa
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-[#6B7280] mb-1" style={{ fontFamily: 'Roboto' }}>
                    Avg Pressure
                  </Text>
                  <Text className="text-2xl font-bold text-[#2A2D34]" style={{ fontFamily: 'Inter' }}>
                    {patient.avgPressure}
                  </Text>
                  <Text className="text-xs text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                    kPa
                  </Text>
                </View>
              </View>

              <LineChart
                data={pressureChartData}
                width={chartWidth}
                height={180}
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                withInnerLines={false}
                withOuterLines={true}
                withVerticalLines={false}
                withHorizontalLines={true}
                withDots={true}
                withShadow={false}
              />
            </Card>

            {/* Gait Analysis */}
            <Card className="p-4 mb-4">
              <Text className="text-lg font-bold text-[#2A2D34] mb-4" style={{ fontFamily: 'Inter' }}>
                Gait Analysis
              </Text>
              
              <LineChart
                data={gaitChartData}
                width={chartWidth}
                height={180}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(231, 163, 141, ${opacity})`,
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                withInnerLines={false}
                withOuterLines={true}
                withVerticalLines={false}
                withHorizontalLines={true}
                withDots={true}
                withShadow={false}
              />
              
              <Text className="text-xs text-[#6B7280] mt-2 text-center" style={{ fontFamily: 'Roboto' }}>
                Compliance Score (Last 7 days)
              </Text>
            </Card>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

