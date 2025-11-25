import React, { useState } from 'react';
import { View } from 'react-native';

import { useAuth } from '../../context/auth-context';
import Button from '../ui/Button';
import Input from '../ui/Input';

const LoginForm = () => {
  const { logIn, loading } = useAuth();
  const [email, setEmail] = useState('patient@senseguard.dev');
  const [password, setPassword] = useState('password123');

  const handleSubmit = () => {
    logIn(email, password);
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



