import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ConnectionForm from '../../components/Forms/ConnectionForm';
import { useCaregiverData } from '../../hooks/useCaregiver';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

const ConnectionRequestsScreen = () => {
  const { requests } = useCaregiverData();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Caregiver connections</Text>
      <View style={styles.card}>
        {requests.map((request) => (
          <View key={request.id} style={styles.requestRow}>
            <View>
              <Text style={styles.name}>{request.caregiverName}</Text>
              <Text style={styles.meta}>
                Status: {request.status.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.meta}>{request.patientName}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Invite caregiver</Text>
      <ConnectionForm onSubmit={() => {}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.neutral.lighter,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.neutral.dark,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    gap: 16,
  },
  requestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
  },
  meta: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginBottom: 12,
  },
});

export default ConnectionRequestsScreen;

