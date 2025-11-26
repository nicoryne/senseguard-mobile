import { Pressable, View, Text, Modal, Platform, Linking } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface FABProps {
  caregiverPhone?: string;
}

export default function FAB({ caregiverPhone }: FABProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const tabBarHeight = Platform.OS === 'ios' ? 88 : 64;
  const bottomPosition = insets.bottom;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setMenuVisible(true);
  };

  const handleCall = (phone: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(`tel:${phone}`);
    setMenuVisible(false);
  };

  const handleCall911 = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Linking.openURL('tel:911');
    setMenuVisible(false);
  };

  return (
    <>
      <Pressable
        onPress={handlePress}
        className="absolute right-6 w-16 h-16  rounded-full bg-[#4982BB] items-center justify-center shadow-lg active:opacity-80 z-50"
        style={{
          bottom: bottomPosition,
          shadowColor: '#4982BB',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Ionicons name="call" size={28} color="#FFFFFF" />
      </Pressable>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setMenuVisible(false)}
        >
          <View className="bg-white rounded-t-3xl p-6 pb-12">
            <View className="w-12 h-1 bg-[#E5E7EB] rounded-full self-center mb-6" />
            
            <Text className="text-xl font-bold text-[#2A2D34] mb-4" style={{ fontFamily: 'Inter' }}>
              Emergency Contacts
            </Text>

            {caregiverPhone && (
              <Pressable
                onPress={() => handleCall(caregiverPhone)}
                className="bg-[#4982BB] rounded-xl p-4 mb-3 active:opacity-80 flex-row items-center"
              >
                <Ionicons name="person" size={24} color="#FFFFFF" />
                <Text className="text-white font-semibold text-base ml-3" style={{ fontFamily: 'Roboto' }}>
                  Call Caregiver
                </Text>
              </Pressable>
            )}

            <Pressable
              onPress={handleCall911}
              className="bg-[#EF4444] rounded-xl p-4 active:opacity-80 flex-row items-center"
            >
              <Ionicons name="call" size={24} color="#FFFFFF" />
              <Text className="text-white font-semibold text-base ml-3" style={{ fontFamily: 'Roboto' }}>
                Call 911
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setMenuVisible(false)}
              className="mt-4 py-3"
            >
              <Text className="text-center text-[#6B7280] font-semibold" style={{ fontFamily: 'Roboto' }}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

