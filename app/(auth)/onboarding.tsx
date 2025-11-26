import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import Button from '../../components/ui/Button';
import Logo from '../../components/ui/Logo';
import { APP_NAME } from '../../lib/constants';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';
import { DESIGN_TOKENS } from '../../lib/design-tokens';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const OnboardingScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      <LinearGradient
        colors={DESIGN_TOKENS.colors.primary.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.content}>
          {/* Hero Section */}
          <View style={styles.hero}>
            <View style={styles.logoContainer}>
              <View style={styles.logoBackground}>
                <Logo size={120} variant="transparent" />
              </View>
            </View>
            <Text style={styles.kicker}>AI-POWERED FOOT HEALTH</Text>
            <Text style={styles.title}>{APP_NAME}</Text>
            <Text style={styles.subtitle}>
              Track plantar pressure, gait balance, and collaborate with caregivers
              to prevent diabetic neuropathy.
            </Text>
          </View>

          {/* Features */}
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureEmoji}>📊</Text>
              </View>
              <Text style={styles.featureText}>Real-time monitoring</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureEmoji}>🤝</Text>
              </View>
              <Text style={styles.featureText}>Caregiver collaboration</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureEmoji}>🔔</Text>
              </View>
              <Text style={styles.featureText}>Smart alerts</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Button
              title="Get Started"
              onPress={() => router.push('/(auth)/role-selection')}
              variant="secondary"
            />
            <Link href="/(auth)/sign-in" style={styles.link}>
              <Text style={styles.linkText}>Already have an account? Sign in</Text>
            </Link>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: DESIGN_TOKENS.spacing.xl,
    justifyContent: 'space-between',
  },
  hero: {
    alignItems: 'center',
    marginTop: DESIGN_TOKENS.spacing['3xl'],
  },
  logoContainer: {
    marginBottom: DESIGN_TOKENS.spacing['2xl'],
  },
  logoBackground: {
    width: 140,
    height: 140,
    borderRadius: DESIGN_TOKENS.radius['2xl'],
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    ...DESIGN_TOKENS.shadows.xl,
  },
  kicker: {
    ...DESIGN_TOKENS.typography.smallBold,
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: DESIGN_TOKENS.spacing.md,
  },
  title: {
    ...DESIGN_TOKENS.typography.h1,
    color: COLORS.neutral.lightest,
    marginBottom: DESIGN_TOKENS.spacing.base,
    textAlign: 'center',
    fontWeight: '700',
  },
  subtitle: {
    ...DESIGN_TOKENS.typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: DESIGN_TOKENS.spacing.base,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: DESIGN_TOKENS.spacing.base,
    marginVertical: DESIGN_TOKENS.spacing['2xl'],
  },
  featureItem: {
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.sm,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: DESIGN_TOKENS.radius.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureEmoji: {
    fontSize: 32,
  },
  featureText: {
    ...DESIGN_TOKENS.typography.smallBold,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    marginBottom: DESIGN_TOKENS.spacing['2xl'],
  },
  link: {
    marginTop: DESIGN_TOKENS.spacing.xl,
    alignItems: 'center',
  },
  linkText: {
    ...DESIGN_TOKENS.typography.bodyBold,
    color: COLORS.neutral.lightest,
    textDecorationLine: 'underline',
  },
});

export default OnboardingScreen;
