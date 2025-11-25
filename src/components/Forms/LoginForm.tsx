import React, { useState } from 'react';
import { View } from 'react-native';

import Button from '../UI/Button';
import Input from '../UI/Input';

interface Props {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading?: boolean;
}

const LoginForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState('patient@senseguard.dev');
  const [password, setPassword] = useState('password123');

  const handleSubmit = () => {
    onSubmit(email, password);
  };

  return (
    <View>
      <Input
        label="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign in" onPress={handleSubmit} loading={loading} />
    </View>
  );
};

export default LoginForm;

