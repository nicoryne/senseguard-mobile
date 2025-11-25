import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import Button from '../../components/ui/Button';
import Logo from '../../components/ui/Logo';
import { useAuth } from '../../context/auth-context';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

const RoleSelectionScreen = () => {
  const router = useRouter();
  const { selectRole } = useAuth();

  const handleSelect = (role: 'patient' | 'caregiver') => {
    selectRole(role);
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo size={70} />
        <Text style={styles.title}>Choose your role</Text>
        <Text style={styles.subtitle}>
          Select how you'll use GabAI Sense Guard
        </Text>
      </View>
      <View style={styles.cardGrid}>
        <TouchableOpacity 
          style={[styles.card, styles.patientCard]} 
          onPress={() => handleSelect('patient')}
          activeOpacity={0.8}
        >
          <View style={[styles.iconContainer, { backgroundColor: COLORS.primary + '15' }]}>
            <Ionicons name="walk" size={32} color={COLORS.primary} />
          </View>
          <Text style={styles.cardTitle}>Patient</Text>
          <Text style={styles.cardBody}>
            Monitor plantar pressure, follow rehab plans, and stay on top of alerts.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.card, styles.caregiverCard]} 
          onPress={() => handleSelect('caregiver')}
          activeOpacity={0.8}
        >
          <View style={[styles.iconContainer, { backgroundColor: COLORS.secondary + '15' }]}>
            <Ionicons name="medkit" size={32} color={COLORS.secondary} />
          </View>
          <Text style={styles.cardTitle}>Caregiver</Text>
          <Text style={styles.cardBody}>
            Track your patients, review reports, and respond to risk alerts.
          </Text>
        </TouchableOpacity>
      </View>
      <Button title="Back to onboarding" variant="outline" onPress={() => router.back()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.neutral.lighter,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.neutral.dark,
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    textAlign: 'center',
  },
  cardGrid: {
    gap: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: COLORS.surface.tertiary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  patientCard: {
    borderColor: COLORS.primary + '30',
  },
  caregiverCard: {
    borderColor: COLORS.secondary + '30',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginBottom: 8,
  },
  cardBody: {
    ...FONTS.body,
    color: COLORS.neutral.medium,
    lineHeight: 22,
  },
});

export default RoleSelectionScreen;



