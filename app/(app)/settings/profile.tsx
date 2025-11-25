import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '@/context/auth-context'
import { COLORS } from '@/lib/colors'
import { FONTS } from '@/lib/fonts'

export default function ProfileScreen() {
  const { currentUser, userData } = useAuth()

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>
          {userData?.firstName && userData?.lastName
            ? `${userData.firstName} ${userData.lastName}`
            : currentUser?.displayName || 'Not set'}
        </Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{currentUser?.email || 'No email'}</Text>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>
          {userData?.phone || 'Not set'}
        </Text>
        <Text style={styles.label}>Role</Text>
        <Text style={styles.value}>
          {userData?.role || 'Not set'}
        </Text>
      </View>
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
})

