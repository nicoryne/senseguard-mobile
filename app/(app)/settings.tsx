import React from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import Button from '@/components/ui/Button'
import RoleSwitcher from '@/components/ui/RoleSwitcher'
import { useAuth } from '@/context/auth-context'
import { COLORS } from '@/lib/colors'
import { FONTS } from '@/lib/fonts'

export default function SettingsScreen() {
  const { currentUser, logOut } = useAuth()
  const router = useRouter()

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

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
        >
          <Text style={styles.menuText}>Profile</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/(app)/settings/notifications')}
        >
          <Text style={styles.menuText}>Notifications</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/(app)/settings/about')}
        >
          <Text style={styles.menuText}>About</Text>
          <Text style={styles.menuArrow}>›</Text>
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
    gap: 12,
  },
  label: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
  value: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
    marginBottom: 8,
  },
  section: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface.tertiary,
  },
  menuText: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
  },
  menuArrow: {
    ...FONTS.h2,
    color: COLORS.neutral.medium,
  },
})

