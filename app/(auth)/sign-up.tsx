import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import SignupForm from '../../components/forms/SignupForm';
import Logo from '../../components/ui/Logo';
import { useAuth } from '../../context/auth-context';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';
import { DESIGN_TOKENS } from '../../lib/design-tokens';

const SignUpScreen = () => {
  const { userRole } = useAuth();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      <LinearGradient
        colors={DESIGN_TOKENS.colors.accent.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoBackground}>
                <Logo size={100} variant="transparent" />
              </View>
            </View>

            {userRole && (
              <View style={styles.roleBadge}>
                <Ionicons name="person-circle" size={20} color={COLORS.neutral.lightest} />
                <Text style={styles.roleText}>
                  Signing up as {userRole}
                </Text>
              </View>
            )}

            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join GabAI Sense Guard to start your health journey
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <SignupForm />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/(auth)/sign-in" style={styles.link}>
              <Text style={styles.linkText}>Sign in</Text>
            </Link>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    padding: DESIGN_TOKENS.spacing.xl,
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: DESIGN_TOKENS.spacing['3xl'],
  },
  logoContainer: {
    marginBottom: DESIGN_TOKENS.spacing.xl,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: DESIGN_TOKENS.radius['2xl'],
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    ...DESIGN_TOKENS.shadows.xl,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingVertical: DESIGN_TOKENS.spacing.sm,
    borderRadius: DESIGN_TOKENS.radius.full,
    marginBottom: DESIGN_TOKENS.spacing.base,
    ...DESIGN_TOKENS.shadows.sm,
  },
  roleText: {
    ...DESIGN_TOKENS.typography.bodySmall,
    color: COLORS.neutral.lightest,
    fontWeight: '600',
  },
  title: {
    ...DESIGN_TOKENS.typography.h1,
    color: COLORS.neutral.lightest,
    marginBottom: DESIGN_TOKENS.spacing.md,
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
  formCard: {
    backgroundColor: COLORS.surface.background,
    borderRadius: DESIGN_TOKENS.radius['2xl'],
    padding: DESIGN_TOKENS.spacing.xl,
    ...DESIGN_TOKENS.shadows.xl,
    marginBottom: DESIGN_TOKENS.spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: DESIGN_TOKENS.spacing.base,
  },
  footerText: {
    ...DESIGN_TOKENS.typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  link: {
    marginLeft: DESIGN_TOKENS.spacing.xs,
  },
  linkText: {
    ...DESIGN_TOKENS.typography.bodyBold,
    color: COLORS.neutral.lightest,
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
