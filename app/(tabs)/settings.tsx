import { useState } from 'react';
import { ScrollView, View, Text, SafeAreaView, Pressable, Switch, Alert, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FAB from '@/components/ui/FAB';
import PageHeader from '@/components/ui/PageHeader';

export default function SettingsScreen() {
  const { currentUser, userData, logOut } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tabBarHeight = Platform.OS === 'ios' ? 88 : 64;
  const bottomPadding = tabBarHeight + insets.bottom + 32;
  const headerHeight = insets.top + 100;
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(78); // Mock battery level

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logOut();
            router.replace('/(auth)/sign-in');
          },
        },
      ]
    );
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return '#10B981';
    if (level > 20) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <PageHeader 
        title="Settings" 
        subtitle="Manage your account and preferences" 
      />
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ 
          paddingBottom: bottomPadding, 
          paddingTop: headerHeight + 8 
        }}
      >
        <View className="px-6 pt-6">

        {/* Profile Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-[#2A2D34] mb-3" style={{ fontFamily: 'Inter' }}>
            Profile
          </Text>
          <Card className="p-4">
            <View className="flex-row items-center mb-4">
              <View className="w-16 h-16 rounded-full bg-[#4982BB] items-center justify-center mr-4">
                <Ionicons name="person" size={32} color="#FFFFFF" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-[#2A2D34] mb-1" style={{ fontFamily: 'Inter' }}>
                  {userData?.name || currentUser?.displayName || 'User'}
                </Text>
                <Text className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                  {currentUser?.email}
                </Text>
              </View>
            </View>
            <Pressable className="flex-row items-center justify-between py-3 border-t border-[#E5E7EB]">
              <View className="flex-row items-center">
                <Ionicons name="create-outline" size={20} color="#4982BB" />
                <Text className="text-base text-[#2A2D34] ml-3" style={{ fontFamily: 'Roboto' }}>
                  Edit Profile
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </Pressable>
          </Card>
        </View>

        {/* Account Settings */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-[#2A2D34] mb-3" style={{ fontFamily: 'Inter' }}>
            Account
          </Text>
          <Card className="p-4">
            <Pressable className="flex-row items-center justify-between py-3 border-b border-[#E5E7EB]">
              <View className="flex-row items-center">
                <Ionicons name="lock-closed-outline" size={20} color="#4982BB" />
                <Text className="text-base text-[#2A2D34] ml-3" style={{ fontFamily: 'Roboto' }}>
                  Change Password
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </Pressable>
            <Pressable className="flex-row items-center justify-between py-3 border-b border-[#E5E7EB]">
              <View className="flex-row items-center">
                <Ionicons name="shield-checkmark-outline" size={20} color="#4982BB" />
                <Text className="text-base text-[#2A2D34] ml-3" style={{ fontFamily: 'Roboto' }}>
                  Privacy Settings
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </Pressable>
            <Pressable className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center">
                <Ionicons name="document-text-outline" size={20} color="#4982BB" />
                <Text className="text-base text-[#2A2D34] ml-3" style={{ fontFamily: 'Roboto' }}>
                  Terms & Conditions
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </Pressable>
          </Card>
        </View>

        {/* Notifications */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-[#2A2D34] mb-3" style={{ fontFamily: 'Inter' }}>
            Notifications
          </Text>
          <Card className="p-4">
            <View className="flex-row items-center justify-between py-3">
              <View className="flex-1">
                <Text className="text-base font-semibold text-[#2A2D34] mb-1" style={{ fontFamily: 'Roboto' }}>
                  Push Notifications
                </Text>
                <Text className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                  Receive alerts and updates
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E5E7EB', true: '#4982BB' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </Card>
        </View>

        {/* App Preferences */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-[#2A2D34] mb-3" style={{ fontFamily: 'Inter' }}>
            App Preferences
          </Text>
          <Card className="p-4">
            <Pressable className="flex-row items-center justify-between py-3 border-b border-[#E5E7EB]">
              <View className="flex-row items-center">
                <Ionicons name="color-palette-outline" size={20} color="#4982BB" />
                <Text className="text-base text-[#2A2D34] ml-3" style={{ fontFamily: 'Roboto' }}>
                  Theme
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-sm text-[#6B7280] mr-2" style={{ fontFamily: 'Roboto' }}>
                  Light
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </Pressable>
            <Pressable className="flex-row items-center justify-between py-3 border-b border-[#E5E7EB]">
              <View className="flex-row items-center">
                <Ionicons name="language-outline" size={20} color="#4982BB" />
                <Text className="text-base text-[#2A2D34] ml-3" style={{ fontFamily: 'Roboto' }}>
                  Language
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-sm text-[#6B7280] mr-2" style={{ fontFamily: 'Roboto' }}>
                  English
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </Pressable>
            <Pressable className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center">
                <Ionicons name="information-circle-outline" size={20} color="#4982BB" />
                <Text className="text-base text-[#2A2D34] ml-3" style={{ fontFamily: 'Roboto' }}>
                  About
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </Pressable>
          </Card>
        </View>

        {/* Insole Settings (Scrollable bottom section) */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-[#2A2D34] mb-3" style={{ fontFamily: 'Inter' }}>
            Insole Device
          </Text>
          
          {/* Battery Level */}
          <Card className="p-4 mb-3">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <Ionicons name="battery-half" size={24} color={getBatteryColor(batteryLevel)} />
                <Text className="text-base font-semibold text-[#2A2D34] ml-3" style={{ fontFamily: 'Roboto' }}>
                  Battery Level
                </Text>
              </View>
              <Text
                className="text-lg font-bold"
                style={{ color: getBatteryColor(batteryLevel), fontFamily: 'Inter' }}
              >
                {batteryLevel}%
              </Text>
            </View>
            <View className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${batteryLevel}%`,
                  backgroundColor: getBatteryColor(batteryLevel),
                }}
              />
            </View>
            <Text className="text-xs text-[#6B7280] mt-2" style={{ fontFamily: 'Roboto' }}>
              Estimated {Math.round(batteryLevel / 10)} days remaining
            </Text>
          </Card>

          {/* Haptic Feedback */}
          <Card className="p-4 mb-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <Ionicons name="phone-portrait-outline" size={20} color="#4982BB" />
                  <Text className="text-base font-semibold text-[#2A2D34] ml-3" style={{ fontFamily: 'Roboto' }}>
                    Haptic Feedback
                  </Text>
                </View>
                <Text className="text-sm text-[#6B7280] ml-8" style={{ fontFamily: 'Roboto' }}>
                  Vibration alerts for pressure warnings
                </Text>
              </View>
              <Switch
                value={hapticEnabled}
                onValueChange={setHapticEnabled}
                trackColor={{ false: '#E5E7EB', true: '#4982BB' }}
                thumbColor="#FFFFFF"
              />
            </View>
            {hapticEnabled && (
              <View className="mt-3 pt-3 border-t border-[#E5E7EB]">
                <Text className="text-xs text-[#6B7280] mb-2" style={{ fontFamily: 'Roboto' }}>
                  Haptic Intensity
                </Text>
                <View className="flex-row items-center">
                  <View className="flex-1 h-1 bg-[#E5E7EB] rounded-full mr-2">
                    <View className="h-1 bg-[#4982BB] rounded-full" style={{ width: '75%' }} />
                  </View>
                  <Text className="text-xs text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                    75%
                  </Text>
                </View>
              </View>
            )}
          </Card>
        </View>

        {/* Logout Button */}
        <View className="mb-6">
          <Button onPress={handleLogout} variant="danger" title="Logout" className="w-full" />
        </View>
        </View>
      </ScrollView>

      {/* Emergency FAB */}
      <FAB caregiverPhone="+1234567890" />
    </SafeAreaView>
  );
}

