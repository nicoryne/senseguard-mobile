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
        <Text className="text-sm font-semibold text-[#1a2332] mb-2" style={{ fontFamily: 'Roboto' }}>
          {label}
        </Text>
      )}
      <View 
        className={`bg-[#f7fafc] rounded-lg border ${error ? 'border-[#EF4444]' : 'border-[#e2e8f0]'} px-4 py-3`}
      >
        <TextInput
          className={`text-base text-[#1a2332] ${className}`}
          style={{ fontFamily: 'Roboto' }}
          placeholderTextColor="#a0aec0"
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
