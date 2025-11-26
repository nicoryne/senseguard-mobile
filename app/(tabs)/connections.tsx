import { useState } from 'react';
import { ScrollView, View, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mockPatients, caregiverProfile } from '@/lib/mock-data';
import CaregiverRow from '@/components/connections/CaregiverRow';
import PatientRow from '@/components/connections/PatientRow';
import CaregiverDetail from '@/components/connections/CaregiverDetail';
import PatientDetail from '@/components/connections/PatientDetail';
import { CaregiverProfile, PatientSummary } from '@/types/user';
import FAB from '@/components/ui/FAB';
import PageHeader from '@/components/ui/PageHeader';

export default function ConnectionsScreen() {
  const [selectedCaregiver, setSelectedCaregiver] = useState<CaregiverProfile | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<PatientSummary | null>(null);
  const [caregiverModalVisible, setCaregiverModalVisible] = useState(false);
  const [patientModalVisible, setPatientModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const tabBarHeight = Platform.OS === 'ios' ? 88 : 64;
  const bottomPadding = tabBarHeight + insets.bottom + 20;

  // Mock caregivers list (in real app, this would come from API)
  const caregivers: CaregiverProfile[] = [caregiverProfile];

  const handleCaregiverPress = (caregiver: CaregiverProfile) => {
    setSelectedCaregiver(caregiver);
    setCaregiverModalVisible(true);
  };

  const handlePatientPress = (patient: PatientSummary) => {
    setSelectedPatient(patient);
    setPatientModalVisible(true);
  };

  return (
    <View className="flex-1 bg-[#F8F9FA]">
      <PageHeader 
        title="Connections" 
        subtitle="Manage your caregivers and patients" 
      />
      <ScrollView 
        className="flex-1 px-4 py-6" 
        contentContainerStyle={{ paddingBottom: bottomPadding }}
      >

        {/* Caregivers Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-[#2A2D34] mb-3" style={{ fontFamily: 'Inter' }}>
            Caregivers
          </Text>
          {caregivers.length > 0 ? (
            caregivers.map((caregiver) => (
              <CaregiverRow
                key={caregiver.id}
                caregiver={caregiver}
                onPress={() => handleCaregiverPress(caregiver)}
              />
            ))
          ) : (
            <View className="bg-white rounded-xl p-6 items-center">
              <Text className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                No caregivers connected
              </Text>
            </View>
          )}
        </View>

        {/* Patients Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-[#2A2D34] mb-3" style={{ fontFamily: 'Inter' }}>
            Patients
          </Text>
          {mockPatients.length > 0 ? (
            mockPatients.map((patient) => (
              <PatientRow
                key={patient.id}
                patient={patient}
                onPress={() => handlePatientPress(patient)}
              />
            ))
          ) : (
            <View className="bg-white rounded-xl p-6 items-center">
              <Text className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                No patients connected
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modals */}
      <CaregiverDetail
        caregiver={selectedCaregiver}
        visible={caregiverModalVisible}
        onClose={() => {
          setCaregiverModalVisible(false);
          setSelectedCaregiver(null);
        }}
      />
      <PatientDetail
        patient={selectedPatient}
        visible={patientModalVisible}
        onClose={() => {
          setPatientModalVisible(false);
          setSelectedPatient(null);
        }}
      />

      {/* Emergency FAB */}
      <FAB caregiverPhone="+1234567890" />
    </View>
  );
}

