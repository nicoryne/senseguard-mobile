import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'caregiver'>('patient');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      await signUp(email.trim(), password, role, { name: name.trim() });
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message || 'Unable to create account');
    } finally {
      setLoading(false);
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
            <Text className="text-3xl font-bold text-[#2A2D34] mt-4" style={{ fontFamily: 'Inter' }}>
              Create Account
            </Text>
            <Text className="text-base text-[#6B7280] mt-2" style={{ fontFamily: 'Roboto' }}>
              Join SenseGuard today
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            <View>
              <Text className="text-sm font-semibold text-[#2A2D34] mb-2" style={{ fontFamily: 'Roboto' }}>
                Full Name
              </Text>
              <View className="bg-white rounded-xl border border-[#E5E7EB] px-4 py-3">
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="words"
                  className="text-base text-[#2A2D34]"
                  style={{ fontFamily: 'Roboto' }}
                />
              </View>
            </View>

            <View>
              <Text className="text-sm font-semibold text-[#2A2D34] mb-2" style={{ fontFamily: 'Roboto' }}>
                Email
              </Text>
              <View className="bg-white rounded-xl border border-[#E5E7EB] px-4 py-3">
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  className="text-base text-[#2A2D34]"
                  style={{ fontFamily: 'Roboto' }}
                />
              </View>
            </View>

            <View>
              <Text className="text-sm font-semibold text-[#2A2D34] mb-2" style={{ fontFamily: 'Roboto' }}>
                Role
              </Text>
              <View className="flex-row gap-3">
                <Pressable
                  onPress={() => setRole('patient')}
                  className={`flex-1 rounded-xl py-3 px-4 border-2 ${
                    role === 'patient' ? 'bg-[#4982BB] border-[#4982BB]' : 'bg-white border-[#E5E7EB]'
                  }`}
                >
                  <Text
                    className={`text-center font-semibold text-base ${
                      role === 'patient' ? 'text-white' : 'text-[#2A2D34]'
                    }`}
                    style={{ fontFamily: 'Roboto' }}
                  >
                    Patient
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setRole('caregiver')}
                  className={`flex-1 rounded-xl py-3 px-4 border-2 ${
                    role === 'caregiver' ? 'bg-[#4982BB] border-[#4982BB]' : 'bg-white border-[#E5E7EB]'
                  }`}
                >
                  <Text
                    className={`text-center font-semibold text-base ${
                      role === 'caregiver' ? 'text-white' : 'text-[#2A2D34]'
                    }`}
                    style={{ fontFamily: 'Roboto' }}
                  >
                    Caregiver
                  </Text>
                </Pressable>
              </View>
            </View>

            <View>
              <Text className="text-sm font-semibold text-[#2A2D34] mb-2" style={{ fontFamily: 'Roboto' }}>
                Password
              </Text>
              <View className="bg-white rounded-xl border border-[#E5E7EB] px-4 py-3 flex-row items-center">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password-new"
                  className="flex-1 text-base text-[#2A2D34]"
                  style={{ fontFamily: 'Roboto' }}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#6B7280"
                  />
                </Pressable>
              </View>
            </View>

            <View>
              <Text className="text-sm font-semibold text-[#2A2D34] mb-2" style={{ fontFamily: 'Roboto' }}>
                Confirm Password
              </Text>
              <View className="bg-white rounded-xl border border-[#E5E7EB] px-4 py-3 flex-row items-center">
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoComplete="password-new"
                  className="flex-1 text-base text-[#2A2D34]"
                  style={{ fontFamily: 'Roboto' }}
                />
                <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#6B7280"
                  />
                </Pressable>
              </View>
            </View>

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
