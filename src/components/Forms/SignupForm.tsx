import React, { useState } from 'react';
import { View } from 'react-native';

import Button from '../UI/Button';
import Input from '../UI/Input';

interface Props {
  onSubmit: (name: string, email: string, password: string) => Promise<void>;
  loading?: boolean;
}

const SignupForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const [name, setName] = useState('Jordan Miles');
  const [email, setEmail] = useState('patient@senseguard.dev');
  const [password, setPassword] = useState('password123');

  const handleSubmit = () => {
    onSubmit(name, email, password);
  };

  return (
    <View>
      <Input label="Full name" value={name} onChangeText={setName} />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Create account" onPress={handleSubmit} loading={loading} />
    </View>
  );
};

export default SignupForm;

