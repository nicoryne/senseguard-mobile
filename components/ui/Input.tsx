import { TextInput, TextInputProps, View, Text } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export default function Input({
  label,
  error,
  containerClassName = '',
  className = '',
  ...props
}: InputProps) {
  return (
    <View className={containerClassName}>
      {label && (
        <Text className="text-sm font-semibold text-[#2A2D34] mb-2" style={{ fontFamily: 'Roboto' }}>
          {label}
        </Text>
      )}
      <View className={`bg-white rounded-xl border ${error ? 'border-[#EF4444]' : 'border-[#E5E7EB]'} px-4 py-3`}>
        <TextInput
          className={`text-base text-[#2A2D34] ${className}`}
          style={{ fontFamily: 'Roboto' }}
          placeholderTextColor="#9CA3AF"
          {...props}
        />
      </View>
      {error && (
        <Text className="text-sm text-[#EF4444] mt-1" style={{ fontFamily: 'Roboto' }}>
          {error}
        </Text>
      )}
    </View>
  );
}
