import { View, Text } from 'react-native';
import SliderComponent from '@react-native-community/slider';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  label?: string;
  unit?: string;
  className?: string;
}

export default function Slider({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  label,
  unit = '%',
  className = '',
}: SliderProps) {
  return (
    <View className={className}>
      {label && (
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-sm font-semibold text-[#2A2D34]" style={{ fontFamily: 'Roboto' }}>
            {label}
          </Text>
          <Text className="text-base font-semibold text-[#4982BB]" style={{ fontFamily: 'Roboto' }}>
            {Math.round(value)}{unit}
          </Text>
        </View>
      )}
      <SliderComponent
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        minimumTrackTintColor="#4982BB"
        maximumTrackTintColor="#E5E7EB"
        thumbTintColor="#4982BB"
        step={1}
      />
    </View>
  );
}

