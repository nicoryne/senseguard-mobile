import React from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import RoleSwitcher from '@/components/ui/RoleSwitcher'
import { useAuth } from '@/context/auth-context'
import { COLORS } from '@/lib/colors'
import { FONTS } from '@/lib/fonts'

export default function SettingsScreen() {
  const { currentUser, logOut } = useAuth()
  const router = useRouter()

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Logo size={50} />
        <Text style={styles.title}>Settings</Text>
      </View>

      <RoleSwitcher />

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>
          {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
        </Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>
          {currentUser?.email || 'No email'}
        </Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/(app)/settings/profile')}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name="person" size={20} color={COLORS.primary} />
            <Text style={styles.menuText}>Profile</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.neutral.medium} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/(app)/settings/notifications')}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name="notifications" size={20} color={COLORS.primary} />
            <Text style={styles.menuText}>Notifications</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.neutral.medium} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/(app)/settings/about')}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name="information-circle" size={20} color={COLORS.secondary} />
            <Text style={styles.menuText}>About</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.neutral.medium} />
        </TouchableOpacity>
      </View>

      <Button title="Log out" onPress={logOut} variant="outline" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.neutral.lighter,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.neutral.dark,
    flex: 1,
  },
  card: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.surface.tertiary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    fontWeight: '600',
  },
  value: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
    marginBottom: 12,
  },
  section: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.surface.tertiary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface.tertiary,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
  },
})

