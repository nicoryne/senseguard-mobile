import { useState } from 'react';
import { ScrollView, View, Text, Platform, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { mockPatients, caregiverProfile } from '@/lib/mock-data';
import CaregiverRow from '@/components/connections/CaregiverRow';
import PatientRow from '@/components/connections/PatientRow';
import CaregiverDetail from '@/components/connections/CaregiverDetail';
import PatientDetail from '@/components/connections/PatientDetail';
import AddConnectionModal from '@/components/connections/AddConnectionModal';
import { CaregiverProfile, PatientSummary } from '@/types/user';
import FAB from '@/components/ui/FAB';
import PageHeader from '@/components/ui/PageHeader';

export default function ConnectionsScreen() {
  const [selectedCaregiver, setSelectedCaregiver] = useState<CaregiverProfile | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<PatientSummary | null>(null);
  const [caregiverModalVisible, setCaregiverModalVisible] = useState(false);
  const [patientModalVisible, setPatientModalVisible] = useState(false);
  const [addCaregiverModalVisible, setAddCaregiverModalVisible] = useState(false);
  const [addPatientModalVisible, setAddPatientModalVisible] = useState(false);
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

  const handleAddCaregiver = () => {
    setAddCaregiverModalVisible(true);
  };

  const handleAddPatient = () => {
    setAddPatientModalVisible(true);
  };

  const handleCaregiverAdded = (data: { name: string; email: string; phone: string; notes?: string }) => {
    // TODO: Implement actual API call to add caregiver
    console.log('Adding caregiver:', data);
    // For now, just close the modal
  };

  const handlePatientAdded = (data: { name: string; email: string; phone: string; notes?: string }) => {
    // TODO: Implement actual API call to add patient
    console.log('Adding patient:', data);
    // For now, just close the modal
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
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-[#2A2D34]" style={{ fontFamily: 'Inter' }}>
              Caregivers
            </Text>
            <TouchableOpacity
              onPress={handleAddCaregiver}
              className="w-10 h-10 rounded-full bg-[#4982BB] items-center justify-center"
              activeOpacity={0.8}
            >
              <Feather name="user-plus" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          {caregivers.length > 0 ? (
            caregivers.map((caregiver) => (
              <CaregiverRow
                key={caregiver.id}
                caregiver={caregiver}
                onPress={() => handleCaregiverPress(caregiver)}
              />
            ))
          ) : (
            <View className="bg-white rounded-xl p-6 items-center mb-3">
              <Text className="text-sm text-[#6B7280]" style={{ fontFamily: 'Roboto' }}>
                No caregivers connected
              </Text>
            </View>
          )}
        </View>

        {/* Patients Section */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-[#2A2D34]" style={{ fontFamily: 'Inter' }}>
              Patients
            </Text>
            <TouchableOpacity
              onPress={handleAddPatient}
              className="w-10 h-10 rounded-full bg-[#4982BB] items-center justify-center"
              activeOpacity={0.8}
            >
              <Feather name="user-plus" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          {mockPatients.length > 0 ? (
            mockPatients.map((patient) => (
              <PatientRow
                key={patient.id}
                patient={patient}
                onPress={() => handlePatientPress(patient)}
              />
            ))
          ) : (
            <View className="bg-white rounded-xl p-6 items-center mb-3">
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
      <AddConnectionModal
        visible={addCaregiverModalVisible}
        onClose={() => setAddCaregiverModalVisible(false)}
        type="caregiver"
        onAdd={handleCaregiverAdded}
      />
      <AddConnectionModal
        visible={addPatientModalVisible}
        onClose={() => setAddPatientModalVisible(false)}
        type="patient"
        onAdd={handlePatientAdded}
      />

      {/* Emergency FAB */}
      <FAB caregiverPhone="+1234567890" />
    </View>
  );
}

