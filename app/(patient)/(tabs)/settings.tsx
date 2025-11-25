import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';

export default function PatientSettingsScreen() {
  const { currentUser, logOut } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{currentUser?.name ?? 'Jordan Miles'}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>
          {currentUser?.email ?? 'patient@senseguard.dev'}
        </Text>
      </View>
      <Button title="Log out" onPress={logOut} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.neutral.lighter,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.neutral.dark,
    marginBottom: 24,
  },
  card: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    gap: 8,
  },
  label: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
  value: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
  },
});



