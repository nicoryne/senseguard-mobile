import { useState } from 'react';
import { View, Text, Pressable, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import TextInput from '@/components/ui/TextInput';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await logIn(email.trim(), password);
      // Navigation will be handled by auth context's onAuthStateChanged
      // This allows immediate navigation without waiting for profile fetch
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Sign In Failed', error.message || 'Invalid email or password');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#F8F9FA]"
    >
      <ScrollView contentContainerClassName="flex-grow" keyboardShouldPersistTaps="handled">
        <View className="flex-1 justify-center px-6 py-12">
          {/* Logo/Header */}
          <View className="items-center mb-12">
            <View className="w-24 h-24 rounded-full items-center justify-center mb-4 overflow-hidden">
              <Image
                source={require('@/assets/images/icon.png')}
                style={{ width: 96, height: 96 }}
                contentFit="contain"
              />
            </View>
            <Text className="text-3xl font-bold text-[#2A2D34] mt-4" style={{ fontFamily: 'Inter' }}>
              SenseGuard
            </Text>
            <Text className="text-base text-[#6B7280] mt-2" style={{ fontFamily: 'Roboto' }}>
              Sign in to continue
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
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

            <Pressable
              onPress={handleSignIn}
              disabled={loading}
              className="bg-[#4982BB] rounded-xl py-4 mt-6 active:opacity-80"
            >
              <Text className="text-center text-white font-semibold text-base" style={{ fontFamily: 'Roboto' }}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/(auth)/sign-up')}
              className="mt-4"
            >
              <Text className="text-center text-[#4982BB] font-semibold text-base" style={{ fontFamily: 'Roboto' }}>
                Don&apos;t have an account? Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
