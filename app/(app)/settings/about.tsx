import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '@/lib/colors'
import { FONTS } from '@/lib/fonts'
import { APP_NAME } from '@/utils/constants'

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About</Text>
      <View style={styles.card}>
        <Text style={styles.appName}>{APP_NAME}</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
        <Text style={styles.description}>
          GabAI Sense Guard is a comprehensive mobile health platform for
          managing diabetic neuropathy through AI-powered plantar pressure
          analysis, gait monitoring, and caregiver integration.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Privacy Policy</Text>
        <Text style={styles.link}>View Privacy Policy</Text>
        <Text style={styles.sectionTitle}>Terms of Service</Text>
        <Text style={styles.link}>View Terms of Service</Text>
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
    marginBottom: 16,
    gap: 8,
  },
  appName: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
  },
  version: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    marginBottom: 12,
  },
  description: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
    lineHeight: 22,
  },
  sectionTitle: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  link: {
    ...FONTS.body,
    color: COLORS.primary,
  },
})

