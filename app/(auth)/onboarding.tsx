import { StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';

import Button from '../../components/ui/Button';
import Logo from '../../components/ui/Logo';
import { APP_NAME } from '../../lib/constants';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

const OnboardingScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.logoContainer}>
          <Logo size={100} />
        </View>
        <Text style={styles.kicker}>AI-powered foot health</Text>
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.subtitle}>
          Track plantar pressure, gait balance, and collaborate with caregivers
          to prevent diabetic neuropathy.
        </Text>
      </View>
      <View style={styles.actions}>
        <Button
          title="Get started"
          onPress={() => router.push('/(auth)/role-selection')}
        />
        <Link href="/(auth)/sign-in" style={styles.link}>
          <Text style={styles.linkText}>Already have an account? Sign in</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    backgroundColor: COLORS.neutral.lighter,
  },
  hero: {
    marginTop: 60,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kicker: {
    ...FONTS.bodySmall,
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.neutral.dark,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.neutral.medium,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  actions: {
    width: '100%',
    marginBottom: 32,
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    ...FONTS.bodySmall,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default OnboardingScreen;

