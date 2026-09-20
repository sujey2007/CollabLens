import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContributionChart({ title = "Commit Activity", data = [40, 65, 30, 85, 50, 95, 70] }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="bar-chart-outline" size={18} color="#00E5FF" />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.chartContainer}>
        {data.map((value, index) => (
          <View key={index} style={styles.barWrapper}>
            <View style={[styles.bar, { height: `${value}%` }]} />
            <Text style={styles.barLabel}>D{index + 1}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#131C2E', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 14, fontWeight: '600', color: '#FFFFFF', marginLeft: 8 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 100, paddingTop: 10 },
  barWrapper: { alignItems: 'center', flex: 1, marginHorizontal: 4 },
  bar: { width: '100%', backgroundColor: '#00E5FF', borderRadius: 4, minHeight: 10, opacity: 0.85 },
  barLabel: { fontSize: 10, color: '#8A99AD', marginTop: 6 },
});