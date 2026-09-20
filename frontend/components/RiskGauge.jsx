import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RiskGauge({ riskLevel = 'Low', score = '12%' }) {
  const isLow = riskLevel.toLowerCase() === 'low';
  const badgeColor = isLow ? '#00E676' : '#FF3D00';

  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name="shield-alert-outline" size={20} color={badgeColor} />
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>ML Risk Assessment</Text>
        <Text style={[styles.status, { color: badgeColor }]}>{riskLevel} Risk ({score} anomaly index)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#131C2E', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)', marginBottom: 16 },
  iconBox: { width: 38, height: 38, borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 0.03)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  info: { flex: 1 },
  label: { fontSize: 12, color: '#8A99AD', marginBottom: 2 },
  status: { fontSize: 14, fontWeight: '700' },
});