import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import RiskGauge from '../../components/RiskGauge';

export default function TeamDetailScreen() {
  const { teamId } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Team: {teamId}</Text>
      </View>

      <View style={styles.content}>
        <RiskGauge riskLevel="Low" score="12%" />
        <View style={styles.card}>
          <Text style={styles.cardHeader}>ML Risk Analysis</Text>
          <Text style={styles.cardDesc}>This repository exhibits stable contribution patterns. No anomaly detected by the local risk model.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.08)' },
  backBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#131C2E', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  content: { padding: 20 },
  card: { backgroundColor: '#131C2E', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: 'rgba(0, 229, 255, 0.2)' },
  cardHeader: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 10 },
  cardDesc: { fontSize: 13, color: '#8A99AD', lineHeight: 20 },
});