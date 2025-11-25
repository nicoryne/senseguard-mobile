import React, { useState } from 'react';
import { View } from 'react-native';

import { useAuth } from '../../context/auth-context';
import Button from '../ui/Button';
import Input from '../ui/Input';

const SignupForm = () => {
  const { signUp, userRole, loading } = useAuth();
  const [name, setName] = useState('Jordan Miles');
  const [email, setEmail] = useState('patient@senseguard.dev');
  const [password, setPassword] = useState('password123');

  const handleSubmit = () => {
    signUp(email, password, userRole ?? 'patient', { name });
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



