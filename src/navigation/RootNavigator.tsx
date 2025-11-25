import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '../context/AuthContext';
import AuthNavigator from './auth/AuthNavigator';
import PatientNavigator from './patient/PatientNavigator';
import CaregiverNavigator from './caregiver/CaregiverNavigator';
import { COLORS } from '../utils/colors';

const RootNavigator = () => {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.neutral.lighter,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!currentUser ? (
        <AuthNavigator />
      ) : userRole === 'caregiver' ? (
        <CaregiverNavigator />
      ) : (
        <PatientNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;

