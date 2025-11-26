import { useState } from 'react';
import { ScrollView, View, Text, SafeAreaView } from 'react-native';
import { usePressureData } from '@/hooks/usePressureData';
import { useGaitData } from '@/hooks/useGaitData';
import PressureVisualization from '@/components/sensors/PressureVisualization';
import TemperatureDisplay from '@/components/sensors/TemperatureDisplay';
import GaitTrendChart from '@/components/charts/GaitTrendChart';
import VPTFeedback from '@/components/sensors/VPTFeedback';
import Slider from '@/components/ui/Slider';
import Card from '@/components/ui/Card';
import FAB from '@/components/ui/FAB';

export default function HomeScreen() {
  const { latest: pressureData } = usePressureData();
  const { activity: gaitActivity } = useGaitData();
  const [vptIntensity, setVptIntensity] = useState(50);

  // Mock temperature data (in real app, this would come from sensors)
  const leftFootTemp = 32.5;
  const rightFootTemp = 32.8;

  // Transform activity data for gait chart
  const gaitChartData = gaitActivity.map((item) => ({
    day: item.day,
    score: item.compliance,
  }));

  if (!pressureData) {
    return (
      <SafeAreaView className="flex-1 bg-[#F8F9FA]">
        <View className="flex-1 justify-center items-center">
          <Text className="text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
            No pressure data available
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <ScrollView className="flex-1" contentContainerClassName="pb-32">
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-3xl font-bold text-[#2A2D34]" style={{ fontFamily: 'Inter' }}>
            Home
          </Text>
          <Text className="text-base text-[#6B7280] mt-1" style={{ fontFamily: 'Roboto' }}>
            Real-time monitoring dashboard
          </Text>
        </View>

        {/* Plantar Pressure Visualization */}
        <View className="px-6 mb-4">
          <PressureVisualization
            leftFoot={pressureData.left}
            rightFoot={pressureData.right}
            maxPressure={pressureData.summary.max}
            avgPressure={pressureData.summary.avg}
          />
        </View>

        {/* Temperature Display */}
        <View className="px-6 mb-4">
          <TemperatureDisplay leftFoot={leftFootTemp} rightFoot={rightFootTemp} />
        </View>

        {/* Gait Trend Chart */}
        <View className="px-6 mb-4">
          <GaitTrendChart data={gaitChartData} />
        </View>

        {/* VPT Sensor Feedback */}
        <View className="px-6 mb-4">
          <VPTFeedback intensity={vptIntensity} active={vptIntensity > 0} />
        </View>

        {/* VPT Vibration Slider */}
        <View className="px-6 mb-4">
          <Card className="p-4">
            <Slider
              value={vptIntensity}
              onValueChange={setVptIntensity}
              minimumValue={0}
              maximumValue={100}
              label="VPT Vibration Strength"
              unit="%"
            />
            <Text className="text-xs text-[#6B7280] mt-2" style={{ fontFamily: 'Roboto' }}>
              Adjust the vibration intensity of the VPT sensor. Higher values provide stronger feedback.
            </Text>
          </Card>
        </View>
      </ScrollView>

      {/* Emergency FAB */}
      <FAB caregiverPhone="+1234567890" />
    </SafeAreaView>
  );
}

