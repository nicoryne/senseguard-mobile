import React, { useState } from 'react';
import { View } from 'react-native';

import Button from '../UI/Button';
import Input from '../UI/Input';

interface Props {
  onSubmit: (caregiverEmail: string, note: string) => void;
}

const ConnectionForm: React.FC<Props> = ({ onSubmit }) => {
  const [email, setEmail] = useState('caregiver@senseguard.dev');
  const [note, setNote] = useState('Looking forward to collaborating.');

  const handleSubmit = () => {
    onSubmit(email, note);
  };

  return (
    <View>
      <Input
        label="Caregiver email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Input
        label="Message"
        value={note}
        onChangeText={setNote}
        multiline
        numberOfLines={3}
        style={{ height: 96, textAlignVertical: 'top' }}
      />
      <Button title="Send request" onPress={handleSubmit} />
    </View>
  );
};

export default ConnectionForm;

