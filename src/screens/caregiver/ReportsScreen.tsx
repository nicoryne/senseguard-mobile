import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useCaregiverData } from '../../hooks/useCaregiver';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

const ReportsScreen = () => {
  const { reports } = useCaregiverData();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Reports</Text>
      {reports.map((report) => (
        <View key={report.id} style={styles.card}>
          <Text style={styles.cardTitle}>{report.title}</Text>
          <Text style={styles.cardMeta}>{report.createdAt}</Text>
          <Text style={styles.cardBody}>{report.summary}</Text>
        </View>
      ))}
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
    marginBottom: 16,
  },
  cardTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginBottom: 4,
  },
  cardMeta: {
    ...FONTS.caption,
    color: COLORS.neutral.medium,
    marginBottom: 8,
  },
  cardBody: {
    ...FONTS.body,
    color: COLORS.neutral.medium,
  },
});

export default ReportsScreen;

