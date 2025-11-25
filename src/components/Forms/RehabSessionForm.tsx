import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Slider from '@react-native-community/slider';

import Button from '../UI/Button';
import Input from '../UI/Input';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface Props {
  onSchedule: (title: string, duration: number) => void;
}

const RehabSessionForm: React.FC<Props> = ({ onSchedule }) => {
  const [title, setTitle] = useState('Balance Board Session');
  const [duration, setDuration] = useState(15);

  const handleSubmit = () => {
    onSchedule(title, duration);
  };

  return (
    <View>
      <Input label="Session title" value={title} onChangeText={setTitle} />
      <View style={{ marginBottom: 16 }}>
        <Text style={{ ...FONTS.bodySmall, color: COLORS.neutral.dark }}>
          Duration: {duration} minutes
        </Text>
        <Slider
          minimumValue={5}
          maximumValue={30}
          step={1}
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor={COLORS.surface.tertiary}
          thumbTintColor={COLORS.accent}
          value={duration}
          onValueChange={(value) => setDuration(Math.round(value))}
        />
      </View>
      <Button title="Schedule session" onPress={handleSubmit} />
    </View>
  );
};

export default RehabSessionForm;

