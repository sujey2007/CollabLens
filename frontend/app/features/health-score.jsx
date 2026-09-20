import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HealthScoreScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Global Health Analytics</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.healthCircle}>
          <Text style={styles.healthCircleValue}>67%</Text>
          <Text style={styles.healthCircleLabel}>Efficiency Score</Text>
        </View>

        <Text style={styles.sectionTitle}>System Diagnostics</Text>
        
        <View style={styles.metricCard}>
          <MaterialCommunityIcons name="check-circle" size={22} color="#00E676" />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.metricTitle}>Optimal Velocity Squads</Text>
            <Text style={styles.metricSub}>2 out of 3 teams met the 10+ commit benchmark.</Text>
          </View>
        </View>

        <View style={styles.metricCard}>
          <MaterialCommunityIcons name="alert-octagon" size={22} color="#FF3D00" />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.metricTitle}>Attention Required</Text>
            <Text style={styles.metricSub}>AI Backend Engine is currently below sprint target.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  backButton: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#131C2E', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  content: { padding: 20, alignItems: 'center' },
  healthCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(0, 230, 118, 0.1)', borderWidth: 3, borderColor: '#00E676', justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
  healthCircleValue: { fontSize: 28, fontWeight: '700', color: '#00E676' },
  healthCircleLabel: { fontSize: 11, color: '#8A99AD', marginTop: 2 },
  sectionTitle: { alignSelf: 'flex-start', fontSize: 14, fontWeight: '700', color: '#8A99AD', marginBottom: 12, textTransform: 'uppercase' },
  metricCard: { width: '100%', backgroundColor: '#131C2E', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  metricTitle: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  metricSub: { fontSize: 12, color: '#8A99AD', marginTop: 3 }
});