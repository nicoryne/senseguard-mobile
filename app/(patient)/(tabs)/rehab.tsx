import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SessionCard from '../../../components/cards/SessionCard';
import RehabSessionForm from '../../../components/forms/RehabSessionForm';
import VPTTestingPanel from '../../../components/widgets/VPTTestingPanel';
import RehabVibrationControl from '../../../components/widgets/RehabVibrationControl';
import TopHeader from '../../../components/headers/TopHeader';
import { mockRehabSessions } from '../../../lib/mock-data';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';
import { RehabSession } from '../../../types/sensor';

export default function RehabilitationScreen() {
  const [sessions, setSessions] = useState<RehabSession[]>(mockRehabSessions);
  const [vibrationActive, setVibrationActive] = useState(false);
  const [vibrationIntensity, setVibrationIntensity] = useState(50);
  const [vibrationFrequency, setVibrationFrequency] = useState(50);

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

  const handleVPTTest = () => {
    // Handle VPT test
    console.log('VPT test initiated');
  };

  const handleStartSession = () => {
    setVibrationActive(!vibrationActive);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Non-scrollable Header */}
      <TopHeader
        title="Rehabilitation"
        subtitle="Guided exercises & nerve health"
        showLogo={true}
        backgroundType="light"
      />

      {/* Scrollable Body */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {/* VPT Testing Panel */}
        <View style={styles.section}>
          <VPTTestingPanel
            currentVPT={12.5}
            lastTestDate={new Date()}
            nerveHealthScore={75}
            onTestPress={handleVPTTest}
          />
        </View>

        {/* Rehabilitative Vibration Control */}
        <View style={styles.section}>
          <RehabVibrationControl
            intensity={vibrationIntensity}
            frequency={vibrationFrequency}
            onIntensityChange={setVibrationIntensity}
            onFrequencyChange={setVibrationFrequency}
            onStartSession={handleStartSession}
            isActive={vibrationActive}
          />
        </View>

        {/* Rehabilitation Sessions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rehabilitation Plan</Text>
          <Text style={styles.sectionSubtitle}>
            Guided exercises curated by your care team
          </Text>
          <View style={styles.sessionsContainer}>
            {sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </View>
        </View>

        {/* Add Quick Session */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Quick Session</Text>
          <RehabSessionForm onSchedule={addSession} />
        </View>

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.neutral.lighter,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral.lighter,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginBottom: 8,
  },
  sectionSubtitle: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    marginBottom: 16,
  },
  sessionsContainer: {
    gap: 12,
  },
  bottomPadding: {
    height: 20,
  },
});



