import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useAuth } from '@/context/auth-context'
import { COLORS } from '@/lib/colors'
import { FONTS } from '@/lib/fonts'

export default function RoleSwitcher() {
  const { selectedRole, switchRole, userRole } = useAuth()

  const handleSwitch = async (role: 'patient' | 'caregiver') => {
    if (role !== selectedRole) {
      await switchRole(role)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>View Mode</Text>
      <View style={styles.switcher}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedRole === 'patient' && styles.optionActive,
          ]}
          onPress={() => handleSwitch('patient')}
        >
          <Text
            style={[
              styles.optionText,
              selectedRole === 'patient' && styles.optionTextActive,
            ]}
          >
            Patient
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            selectedRole === 'caregiver' && styles.optionActive,
          ]}
          onPress={() => handleSwitch('caregiver')}
        >
          <Text
            style={[
              styles.optionText,
              selectedRole === 'caregiver' && styles.optionTextActive,
            ]}
          >
            Caregiver
          </Text>
        </TouchableOpacity>
      </View>
      {selectedRole !== userRole && (
        <Text style={styles.note}>
          You are viewing as {selectedRole}. Your account role is {userRole}.
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
    marginBottom: 8,
    fontWeight: '600',
  },
  switcher: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface.secondary,
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  optionActive: {
    backgroundColor: COLORS.primary,
  },
  optionText: {
    ...FONTS.body,
    color: COLORS.neutral.medium,
    fontWeight: '600',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  note: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    marginTop: 8,
    fontStyle: 'italic',
  },
})

