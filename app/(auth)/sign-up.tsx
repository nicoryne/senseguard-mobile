import { useState } from 'react';
import { View, Text, Pressable, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import TextInput from '@/components/ui/TextInput';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await signUp(email.trim(), password, { name: name.trim() });
      // Navigation will be handled by auth context's onAuthStateChanged
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Sign Up Failed', error.message || 'Unable to create account');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#F8F9FA]"
    >
      <ScrollView contentContainerClassName="flex-grow" keyboardShouldPersistTaps="handled">
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header */}
          <View className="items-center mb-8">
            <Pressable
              onPress={() => router.back()}
              className="absolute left-0 top-0"
            >
              <Ionicons name="arrow-back" size={24} color="#2A2D34" />
            </Pressable>
            <View className="w-20 h-20 rounded-full items-center justify-center mb-4 mt-4 overflow-hidden">
              <Image
                source={require('@/assets/images/icon.png')}
                style={{ width: 80, height: 80 }}
                contentFit="contain"
              />
            </View>
            <Text className="text-3xl font-bold text-[#2A2D34] mt-2" style={{ fontFamily: 'Inter' }}>
              Create Account
            </Text>
            <Text className="text-base text-[#6B7280] mt-2" style={{ fontFamily: 'Roboto' }}>
              Join SenseGuard today
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              icon="user"
              autoCapitalize="words"
            />

            <TextInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              icon="mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              icon="lock"
              secureTextEntry
              autoCapitalize="none"
            />

            <TextInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              icon="lock"
              secureTextEntry
              autoCapitalize="none"
            />

            <Pressable
              onPress={handleSignUp}
              disabled={loading}
              className="bg-[#4982BB] rounded-xl py-4 mt-6 active:opacity-80"
            >
              <Text className="text-center text-white font-semibold text-base" style={{ fontFamily: 'Roboto' }}>
                {loading ? 'Creating account...' : 'Sign Up'}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.back()}
              className="mt-4"
            >
              <Text className="text-center text-[#4982BB] font-semibold text-base" style={{ fontFamily: 'Roboto' }}>
                Already have an account? Sign In
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
