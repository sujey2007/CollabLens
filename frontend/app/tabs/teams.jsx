import React from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import TeamCard from '../../components/TeamCard';

export default function TeamsScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Development Teams</Text>
        <Text style={styles.screenSubtitle}>Manage repositories and risk assessments</Text>

        <TeamCard teamName="Core Backend" repo="FastAPI & ML Service" risk="Low" onPress={() => router.push('/team/core-backend')} />
        <TeamCard teamName="Mobile Frontend" repo="React Native & Expo" risk="Low" onPress={() => router.push('/team/mobile-app')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19' },
  scrollContent: { padding: 20 },
  screenTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  screenSubtitle: { fontSize: 13, color: '#8A99AD', marginBottom: 24 },
});