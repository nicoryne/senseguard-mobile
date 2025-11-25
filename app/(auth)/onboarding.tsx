import { Image, StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';

import Button from '../../components/ui/Button';
import { APP_NAME } from '../../lib/constants';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

const OnboardingScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>AI-powered foot health</Text>
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.subtitle}>
          Track plantar pressure, gait balance, and collaborate with caregivers
          to prevent diabetic neuropathy.
        </Text>
      </View>
      <Image
        source={{ uri: 'https://placehold.co/320x200' }}
        style={styles.image}
      />
      <Button
        title="Get started"
        onPress={() => router.push('/(auth)/role-selection')}
      />
      <Link href="/(auth)/login" style={styles.link}>
        Already have an account? Sign in
      </Link>
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
    marginTop: 80,
  },
  kicker: {
    ...FONTS.bodySmall,
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.neutral.dark,
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.neutral.medium,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginVertical: 40,
    backgroundColor: COLORS.surface.secondary,
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
    ...FONTS.bodySmall,
    color: COLORS.primary,
  },
});

export default OnboardingScreen;

