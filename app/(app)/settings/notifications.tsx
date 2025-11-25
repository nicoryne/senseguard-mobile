import React from 'react'
import { ScrollView, StyleSheet, Text, View, Switch } from 'react-native'
import { COLORS } from '@/lib/colors'
import { FONTS } from '@/lib/fonts'

export default function NotificationsScreen() {
  const [alertsEnabled, setAlertsEnabled] = React.useState(true)
  const [reportsEnabled, setReportsEnabled] = React.useState(true)
  const [remindersEnabled, setRemindersEnabled] = React.useState(false)

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.card}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Critical Alerts</Text>
            <Text style={styles.settingDescription}>
              Receive notifications for critical pressure alerts
            </Text>
          </View>
          <Switch
            value={alertsEnabled}
            onValueChange={setAlertsEnabled}
            trackColor={{ false: COLORS.surface.tertiary, true: COLORS.primary }}
          />
        </View>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Weekly Reports</Text>
            <Text style={styles.settingDescription}>
              Get weekly summary reports
            </Text>
          </View>
          <Switch
            value={reportsEnabled}
            onValueChange={setReportsEnabled}
            trackColor={{ false: COLORS.surface.tertiary, true: COLORS.primary }}
          />
        </View>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Reminders</Text>
            <Text style={styles.settingDescription}>
              Daily reminders for rehab sessions
            </Text>
          </View>
          <Switch
            value={remindersEnabled}
            onValueChange={setRemindersEnabled}
            trackColor={{ false: COLORS.surface.tertiary, true: COLORS.primary }}
          />
        </View>
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
    gap: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
    marginBottom: 4,
    fontWeight: '600',
  },
  settingDescription: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
})

