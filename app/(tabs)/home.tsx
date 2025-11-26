import { useState } from 'react';
import { ScrollView, View, Text, SafeAreaView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePressureData } from '@/hooks/usePressureData';
import { useGaitData } from '@/hooks/useGaitData';
import PressureVisualization from '@/components/sensors/PressureVisualization';
import TemperatureDisplay from '@/components/sensors/TemperatureDisplay';
import GaitTrendChart from '@/components/charts/GaitTrendChart';
import VPTFeedback from '@/components/sensors/VPTFeedback';
import Slider from '@/components/ui/Slider';
import Card from '@/components/ui/Card';
import FAB from '@/components/ui/FAB';
import PageHeader from '@/components/ui/PageHeader';

export default function HomeScreen() {
  const { latest: pressureData } = usePressureData();
  const { activity: gaitActivity } = useGaitData();
  const [vptIntensity, setVptIntensity] = useState(50);
  const insets = useSafeAreaInsets();
  const tabBarHeight = Platform.OS === 'ios' ? 88 : 64;
  const bottomPadding = tabBarHeight + insets.bottom + 32;
  // Header height: safe area top + padding + content (approximately 100-120px)
  const headerHeight = insets.top + 100;

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
        <PageHeader 
          title="Home" 
          subtitle="Real-time monitoring dashboard" 
        />
        <View className="flex-1 justify-center items-center" style={{ marginTop: headerHeight }}>
          <Text className="text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
            No pressure data available
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <PageHeader 
        title="Home" 
        subtitle="Real-time monitoring dashboard" 
      />
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ 
          paddingBottom: bottomPadding, 
          paddingTop: headerHeight + 8 
        }}
      >
        <View className="px-6 pt-6">

        {/* Plantar Pressure Visualization */}
        <View className="mb-4">
          <PressureVisualization
            leftFoot={pressureData.left}
            rightFoot={pressureData.right}
            maxPressure={pressureData.summary.max}
            avgPressure={pressureData.summary.avg}
          />
        </View>

        {/* Temperature Display */}
        <View className="mb-4">
          <TemperatureDisplay leftFoot={leftFootTemp} rightFoot={rightFootTemp} />
        </View>

        {/* Gait Trend Chart */}
        <View className="mb-4">
          <GaitTrendChart data={gaitChartData} />
        </View>

        {/* VPT Sensor Feedback */}
        <View className="mb-4">
          <VPTFeedback intensity={vptIntensity} active={vptIntensity > 0} />
        </View>

        {/* VPT Vibration Slider */}
        <View className="mb-4">
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
        </View>
      </ScrollView>

      {/* Emergency FAB */}
      <FAB caregiverPhone="+1234567890" />
    </SafeAreaView>
  );
}

