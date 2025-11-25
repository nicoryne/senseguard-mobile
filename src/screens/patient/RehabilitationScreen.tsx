import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import SessionCard from '../../components/Cards/SessionCard';
import RehabSessionForm from '../../components/Forms/RehabSessionForm';
import { mockRehabSessions } from '../../data/mockData';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';
import { RehabSession } from '../../types/sensor';

const RehabilitationScreen = () => {
  const [sessions, setSessions] = useState<RehabSession[]>(mockRehabSessions);

  const addSession = (title: string, duration: number) => {
    setSessions((prev) => [
      ...prev,
      {
        id: `rehab-${prev.length + 1}`,
        title,
        duration,
        completed: false,
        focusArea: 'Custom',
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rehabilitation plan</Text>
      <Text style={styles.subtitle}>
        Guided exercises curated by your care team
      </Text>
      <View style={{ marginVertical: 16 }}>
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </View>
      <Text style={styles.sectionTitle}>Add quick session</Text>
      <RehabSessionForm onSchedule={addSession} />
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
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.neutral.medium,
    marginBottom: 16,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginBottom: 12,
  },
});

export default RehabilitationScreen;

