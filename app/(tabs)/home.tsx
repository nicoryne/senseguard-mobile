import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSimulatedPressureData } from '@/hooks/useSimulatedPressureData';
import { useTemperatureData } from '@/hooks/useTemperatureData';
import { useGaitData } from '@/hooks/useGaitData';
import { useSensorNotifications } from '@/hooks/useSensorNotifications';
import PressureVisualization from '@/components/sensors/PressureVisualization';
import TemperatureDisplay from '@/components/sensors/TemperatureDisplay';
import GaitTrendChart from '@/components/charts/GaitTrendChart';
import VPTFeedback from '@/components/sensors/VPTFeedback';
import NotificationBanner from '@/components/ui/NotificationBanner';
import Slider from '@/components/ui/Slider';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FAB from '@/components/ui/FAB';
import PageHeader from '@/components/ui/PageHeader';

export default function HomeScreen() {
  const pressureData = useSimulatedPressureData(true);
  const { activity: gaitActivity } = useGaitData();
  const temperature = useTemperatureData(true);
  const [vptIntensity, setVptIntensity] = useState(50);
  const [gaitAsymmetry, setGaitAsymmetry] = useState(0);
  const insets = useSafeAreaInsets();
  const tabBarHeight = Platform.OS === 'ios' ? 88 : 64;
  const bottomPadding = tabBarHeight + insets.bottom + 20;

  // Simulate gait asymmetry (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate occasional gait asymmetry spikes (foot drag simulation)
      const time = Date.now() / 1000;
      const asymmetry = Math.max(0, Math.sin(time * 0.3) * 30 + (Math.random() - 0.5) * 10);
      // Occasionally spike to simulate foot drag
      if (Math.random() > 0.95) {
        setGaitAsymmetry(Math.min(100, asymmetry + 40));
      } else {
        setGaitAsymmetry(Math.max(0, asymmetry));
      }
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Sensor notifications
  const { 
    currentNotification, 
    dismissNotification,
    triggerVPTNotification,
    triggerHotspotNotification,
    triggerGaitNotification,
    triggerTemperatureNotification,
    triggerPressureNotification,
  } = useSensorNotifications({
    temperature,
    pressure: {
      max: pressureData.summary.max,
      avg: pressureData.summary.avg,
      left: pressureData.left,
      right: pressureData.right,
    },
    vptActive: vptIntensity > 0,
    vptIntensity,
    gaitAsymmetry,
  });

  const [showDemoControls, setShowDemoControls] = useState(false);

  // Transform activity data for gait chart
  const gaitChartData = gaitActivity.map((item) => ({
    day: item.day,
    score: item.compliance,
  }));

  return (
    <View className="flex-1 bg-[#F8F9FA]">
      <PageHeader 
        title="Home" 
        subtitle="Real-time monitoring dashboard" 
      />
      
      <ScrollView 
        className="flex-1 px-4 py-6" 
        contentContainerStyle={{ paddingBottom: bottomPadding }}
      >
        {/* Notification Banner - positioned inside ScrollView */}
        <View style={{ marginTop: 8, marginBottom: currentNotification ? 8 : 0 }}>
          <NotificationBanner
            notification={currentNotification}
            onDismiss={dismissNotification}
            autoHideDuration={6000}
          />
        </View>

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
          <TemperatureDisplay leftFoot={temperature.leftFoot} rightFoot={temperature.rightFoot} />
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

        {/* Demo Controls - Manual Notification Triggers */}
        <View className="mb-4">
          <Card className="p-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-bold text-[#2A2D34]" style={{ fontFamily: 'Inter' }}>
                Demo Controls
              </Text>
              <Button
                title={showDemoControls ? 'Hide' : 'Show'}
                onPress={() => setShowDemoControls(!showDemoControls)}
                variant="outline"
                className="px-4 py-2"
              />
            </View>
            
            {showDemoControls && (
              <View className="gap-2">
                <Text className="text-sm text-[#6B7280] mb-2" style={{ fontFamily: 'Roboto' }}>
                  Manually trigger sensor notifications for demo:
                </Text>
                
                <View className="flex-row flex-wrap gap-2">
                  <Button
                    title="VPT Alert"
                    onPress={triggerVPTNotification}
                    variant="primary"
                    className="flex-1 min-w-[100px]"
                  />
                  <Button
                    title="Hotspot"
                    onPress={triggerHotspotNotification}
                    variant="secondary"
                    className="flex-1 min-w-[100px]"
                  />
                  <Button
                    title="Gait Asymmetry"
                    onPress={triggerGaitNotification}
                    variant="danger"
                    className="flex-1 min-w-[100px]"
                  />
                  <Button
                    title="Temperature"
                    onPress={triggerTemperatureNotification}
                    variant="secondary"
                    className="flex-1 min-w-[100px]"
                  />
                  <Button
                    title="Pressure"
                    onPress={triggerPressureNotification}
                    variant="secondary"
                    className="flex-1 min-w-[100px]"
                  />
                </View>
                
                <Text className="text-xs text-[#9CA3AF] mt-2" style={{ fontFamily: 'Roboto' }}>
                  💡 Tip: Notifications also trigger automatically when sensor thresholds are exceeded.
                </Text>
              </View>
            )}
          </Card>
        </View>
      </ScrollView>

      {/* Emergency FAB */}
      <FAB caregiverPhone="+1234567890" />
    </View>
  );
}

