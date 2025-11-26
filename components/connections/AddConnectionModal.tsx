import { useState } from 'react';
import { View, Text, ScrollView, Modal, Pressable, SafeAreaView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';

interface AddConnectionModalProps {
  visible: boolean;
  onClose: () => void;
  type: 'caregiver' | 'patient';
  onAdd: (data: {
    name: string;
    email: string;
    phone: string;
    notes?: string;
  }) => void;
}

export default function AddConnectionModal({
  visible,
  onClose,
  type,
  onAdd,
}: AddConnectionModalProps) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    onAdd({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      notes: notes.trim() || undefined,
    });

    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    onClose();
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCancel}
    >
      <SafeAreaView className="flex-1 bg-[#F8F9FA]">
        <View className="flex-1">
          {/* Header */}
          <View 
            className="bg-white px-6 flex-row items-center border-b border-[#E5E7EB]"
            style={{ paddingTop: Math.max(insets.top, 32), paddingBottom: 16 }}
          >
            <Pressable onPress={handleCancel} className="mr-4" hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close" size={24} color="#2A2D34" />
            </Pressable>
            <Text className="text-xl font-bold text-[#2A2D34] flex-1" style={{ fontFamily: 'Inter' }}>
              Add {type === 'caregiver' ? 'Caregiver' : 'Patient'}
            </Text>
          </View>

          <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
            <Text className="text-sm text-[#6B7280] mb-6" style={{ fontFamily: 'Roboto' }}>
              Enter the details of the {type === 'caregiver' ? 'caregiver' : 'patient'} you want to connect with.
            </Text>

            <TextInput
              label="Full Name"
              placeholder={`Enter ${type === 'caregiver' ? 'caregiver' : 'patient'} name`}
              value={name}
              onChangeText={setName}
              icon="user"
              autoCapitalize="words"
            />

            <TextInput
              label="Email"
              placeholder="Enter email address"
              value={email}
              onChangeText={setEmail}
              icon="mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              label="Phone Number"
              placeholder="Enter phone number"
              value={phone}
              onChangeText={setPhone}
              icon="phone"
              keyboardType="phone-pad"
            />

            <TextInput
              label="Notes (Optional)"
              placeholder="Add any additional notes"
              value={notes}
              onChangeText={setNotes}
              icon="file-text"
              autoCapitalize="sentences"
            />

            <View className="flex-row gap-3 mt-4">
              <Button
                title="Cancel"
                onPress={handleCancel}
                variant="outline"
                className="flex-1"
              />
              <Button
                title="Add Connection"
                onPress={handleSubmit}
                variant="primary"
                className="flex-1"
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

