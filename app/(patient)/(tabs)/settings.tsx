import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import Button from '../../../components/ui/Button';
import Logo from '../../../components/ui/Logo';
import { useAuth } from '../../../context/auth-context';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';
import { DESIGN_TOKENS } from '../../../lib/design-tokens';

export default function PatientSettingsScreen() {
  const { currentUser, logOut } = useAuth();
  const router = useRouter();

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          icon: 'person-outline' as const,
          label: 'Profile',
          value: currentUser?.name ?? 'Jordan Miles',
          onPress: () => router.push('/(patient)/(tabs)/settings/profile'),
        },
        {
          icon: 'mail-outline' as const,
          label: 'Email',
          value: currentUser?.email ?? 'patient@senseguard.dev',
          onPress: () => router.push('/(patient)/(tabs)/settings/profile'),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: 'notifications-outline' as const,
          label: 'Notifications',
          value: 'Manage alerts',
          onPress: () => router.push('/(patient)/(tabs)/settings/notifications'),
        },
        {
          icon: 'language-outline' as const,
          label: 'Language',
          value: 'English',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          icon: 'information-circle-outline' as const,
          label: 'About',
          value: 'App version & info',
          onPress: () => router.push('/(patient)/(tabs)/settings/about'),
        },
        {
          icon: 'help-circle-outline' as const,
          label: 'Help & Support',
          value: 'Get assistance',
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Modern Header with Gradient */}
      <LinearGradient
        colors={DESIGN_TOKENS.colors.primary.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <Logo size={44} variant="transparent" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Settings</Text>
              <Text style={styles.headerSubtitle}>Manage your account</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Scrollable Body */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {settingsSections.map((section, sectionIdx) => (
          <View key={sectionIdx} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, itemIdx) => (
                <Pressable
                  key={itemIdx}
                  onPress={item.onPress}
                  style={({ pressed }) => [
                    styles.settingItem,
                    pressed && styles.settingItemPressed,
                    itemIdx < section.items.length - 1 && styles.settingItemBorder,
                  ]}
                >
                  <View style={styles.settingItemLeft}>
                    <View style={styles.iconContainer}>
                      <Ionicons name={item.icon} size={22} color={COLORS.primary} />
                    </View>
                    <View style={styles.settingItemContent}>
                      <Text style={styles.settingItemLabel}>{item.label}</Text>
                      <Text style={styles.settingItemValue}>{item.value}</Text>
                    </View>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={COLORS.neutral.medium}
                  />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Section */}
        <View style={styles.section}>
          <Button
            title="Log Out"
            onPress={logOut}
            variant="danger"
            icon={<Ionicons name="log-out-outline" size={20} color={COLORS.neutral.lightest} />}
          />
        </View>

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.neutral.lighter,
  },
  header: {
    paddingTop: DESIGN_TOKENS.spacing.xl,
    paddingBottom: DESIGN_TOKENS.spacing['2xl'],
    paddingHorizontal: DESIGN_TOKENS.spacing.base,
    ...DESIGN_TOKENS.shadows.lg,
  },
  headerContent: {
    gap: DESIGN_TOKENS.spacing.base,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.md,
  },
  logoContainer: {
    width: 52,
    height: 52,
    borderRadius: DESIGN_TOKENS.radius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...DESIGN_TOKENS.typography.h2,
    color: COLORS.neutral.lightest,
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  headerSubtitle: {
    ...DESIGN_TOKENS.typography.body,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral.lighter,
  },
  scrollContent: {
    paddingBottom: DESIGN_TOKENS.spacing['2xl'],
  },
  section: {
    paddingHorizontal: DESIGN_TOKENS.spacing.base,
    paddingTop: DESIGN_TOKENS.spacing.xl,
  },
  sectionTitle: {
    ...DESIGN_TOKENS.typography.smallBold,
    color: COLORS.neutral.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: DESIGN_TOKENS.spacing.md,
    paddingHorizontal: DESIGN_TOKENS.spacing.sm,
  },
  sectionCard: {
    backgroundColor: COLORS.surface.background,
    borderRadius: DESIGN_TOKENS.radius.xl,
    overflow: 'hidden',
    ...DESIGN_TOKENS.shadows.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: DESIGN_TOKENS.spacing.base,
    backgroundColor: COLORS.surface.background,
  },
  settingItemPressed: {
    backgroundColor: COLORS.surface.secondary,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface.tertiary,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.md,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: DESIGN_TOKENS.radius.md,
    backgroundColor: `${COLORS.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingItemContent: {
    flex: 1,
  },
  settingItemLabel: {
    ...DESIGN_TOKENS.typography.bodyBold,
    color: COLORS.neutral.dark,
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  settingItemValue: {
    ...DESIGN_TOKENS.typography.small,
    color: COLORS.neutral.medium,
  },
  bottomPadding: {
    height: DESIGN_TOKENS.spacing['2xl'],
  },
});
