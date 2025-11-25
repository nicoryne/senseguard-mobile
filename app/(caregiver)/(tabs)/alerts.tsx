import { ScrollView, StyleSheet, Text } from 'react-native';

import AlertCard from '../../../components/cards/AlertCard';
import { useCaregiverData } from '../../../hooks/useCaregiver';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';

export default function AlertsScreen() {
  const { alerts } = useCaregiverData();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Alerts</Text>
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </ScrollView>
  );
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
    marginBottom: 16,
  },
});



