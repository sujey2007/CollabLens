import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LineChart } from 'react-native-gifted-charts';

export default function VelocityAnalyticsScreen() {
  const router = useRouter();

  const handleSafeBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  // Global aggregate data points for the main commit velocity curve
  const globalLineData = [
    { value: 30, label: 'Mon' },
    { value: 66, label: 'Tue' },
    { value: 53, label: 'Wed' },
    { value: 120, label: 'Thu' },
    { value: 99, label: 'Fri' },
    { value: 158, label: 'Sat' },
    { value: 138, label: 'Sun' },
  ];

  // Individual squads data with corresponding weekly point arrays
  const squadsData = [
    {
      id: '1',
      name: 'Neural Nexus',
      peakDay: 'Sat (55)',
      dailyAverage: '33.1',
      riskStatus: 'Low Risk',
      color: '#00E5FF',
      data: [
        { value: 10, label: 'Mon' },
        { value: 24, label: 'Tue' },
        { value: 18, label: 'Wed' },
        { value: 42, label: 'Thu' },
        { value: 35, label: 'Fri' },
        { value: 55, label: 'Sat' },
        { value: 48, label: 'Sun' },
      ]
    },
    {
      id: '2',
      name: 'Quantum Core',
      peakDay: 'Sat (38)',
      dailyAverage: '20.7',
      riskStatus: 'Low Risk',
      color: '#00E676',
      data: [
        { value: 5, label: 'Mon' },
        { value: 12, label: 'Tue' },
        { value: 10, label: 'Wed' },
        { value: 28, label: 'Thu' },
        { value: 22, label: 'Fri' },
        { value: 38, label: 'Sat' },
        { value: 30, label: 'Sun' },
      ]
    },
    {
      id: '3',
      name: 'Cyber Synthetics',
      peakDay: 'Sat (65)',
      dailyAverage: '41.0',
      riskStatus: 'Optimal',
      color: '#FFAB00',
      data: [
        { value: 15, label: 'Mon' },
        { value: 30, label: 'Tue' },
        { value: 25, label: 'Wed' },
        { value: 50, label: 'Thu' },
        { value: 42, label: 'Fri' },
        { value: 65, label: 'Sat' },
        { value: 60, label: 'Sun' },
      ]
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack} activeOpacity={0.8}>
              <Ionicons name="arrow-back" size={20} color="#00E5FF" />
            </TouchableOpacity>
            <View>
              <Text style={styles.greeting}>Deep Analytics</Text>
              <Text style={styles.username}>Sprint Velocity</Text>
            </View>
          </View>
        </View>

        {/* Global Analytics Card */}
        <View style={styles.card}>
          <View style={styles.curveHeaderRow}>
            <View>
              <Text style={styles.curveTitle}>Weekly Commit Velocity Curve</Text>
              <Text style={styles.curveSub}>Real-time tracking of code contribution acceleration across all registered squads.</Text>
            </View>
            <View style={styles.liveSyncBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live Sync</Text>
            </View>
          </View>

          <Text style={styles.trendLabel}>Commit Volume Trend (Total combined commits per day)</Text>

          {/* Global Chart Container */}
          <View style={styles.chartWrapper}>
            <LineChart
              data={globalLineData}
              color="#00E5FF"
              thickness={3}
              startFillColor="rgba(0, 229, 255, 0.3)"
              endFillColor="rgba(0, 229, 255, 0.0)"
              startOpacity={0.9}
              endOpacity={0.2}
              initialSpacing={15}
              noOfSections={4}
              maxValue={180}
              yAxisColor="#8A99AD"
              xAxisColor="#8A99AD"
              yAxisTextStyle={{ color: '#8A99AD', fontSize: 10 }}
              xAxisLabelTextStyle={{ color: '#8A99AD', fontSize: 10 }}
              rulesColor="rgba(255, 255, 255, 0.05)"
              hideDataPoints={false}
              dataPointsColor="#00E5FF"
              dataPointsRadius={4}
              curved
            />
          </View>

          {/* Global Metrics Footer */}
          <View style={styles.metricsRow}>
            <View style={styles.metricBoxCard}>
              <Text style={styles.metricValNumber}>Sat (158)</Text>
              <Text style={styles.metricLabelText}>Combined Peak</Text>
            </View>
            <View style={styles.metricBoxCard}>
              <Text style={[styles.metricValNumber, { color: '#00E5FF' }]}>94.8</Text>
              <Text style={styles.metricLabelText}>Combined Avg</Text>
            </View>
          </View>
        </View>

        {/* Section Title for Individual Squad Graphs */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Individual Squad Breakdown</Text>
          <Text style={styles.sectionSubtitle}>Granular velocity metrics</Text>
        </View>

        {/* Render Individual Squad Cards with Graphs */}
        {squadsData.map((squad) => (
          <View key={squad.id} style={styles.card}>
            <View style={styles.curveHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={[styles.squadDotIndicator, { backgroundColor: squad.color }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.curveTitle}>{squad.name}</Text>
                  <Text style={styles.curveSub}>Daily commit tracking & acceleration rate.</Text>
                </View>
              </View>
              <View style={[styles.squadBadge, { backgroundColor: `${squad.color}20`, borderColor: squad.color }]}>
                <Text style={[styles.squadBadgeText, { color: squad.color }]}>{squad.riskStatus}</Text>
              </View>
            </View>

            <Text style={styles.trendLabel}>Commit Distribution</Text>

            {/* Individual Squad LineChart */}
            <View style={styles.chartWrapper}>
              <LineChart
                data={squad.data}
                color={squad.color}
                thickness={2.5}
                startFillColor={`${squad.color}33`}
                endFillColor={`${squad.color}00`}
                startOpacity={0.8}
                endOpacity={0.1}
                initialSpacing={15}
                noOfSections={3}
                maxValue={80}
                yAxisColor="#8A99AD"
                xAxisColor="#8A99AD"
                yAxisTextStyle={{ color: '#8A99AD', fontSize: 9 }}
                xAxisLabelTextStyle={{ color: '#8A99AD', fontSize: 9 }}
                rulesColor="rgba(255, 255, 255, 0.04)"
                hideDataPoints={false}
                dataPointsColor={squad.color}
                dataPointsRadius={3.5}
                curved
              />
            </View>

            {/* Individual Squad Metrics Footer */}
            <View style={styles.metricsRow}>
              <View style={styles.metricBoxCard}>
                <Text style={styles.metricValNumber}>{squad.peakDay}</Text>
                <Text style={styles.metricLabelText}>Peak Output</Text>
              </View>
              <View style={styles.metricBoxCard}>
                <Text style={[styles.metricValNumber, { color: squad.color }]}>{squad.dailyAverage}</Text>
                <Text style={styles.metricLabelText}>Daily Average</Text>
              </View>
            </View>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backBtn: { width: 38, height: 38, borderRadius: 10, backgroundColor: '#131C2E', justifyContent: 'center', alignItems: 'center', marginRight: 12, borderWidth: 1, borderColor: 'rgba(0, 229, 255, 0.2)' },
  greeting: { fontSize: 13, color: '#8A99AD' },
  username: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  card: { backgroundColor: '#131C2E', borderRadius: 20, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(0, 229, 255, 0.2)' },
  curveHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  curveTitle: { fontSize: 15, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  curveSub: { fontSize: 11, color: '#8A99AD', lineHeight: 16 },
  liveSyncBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0, 230, 118, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#00E676', marginRight: 6 },
  liveText: { fontSize: 10, color: '#00E676', fontWeight: '700' },
  trendLabel: { fontSize: 11, color: '#8A99AD', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  chartWrapper: { backgroundColor: '#0B0F19', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 4, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metricBoxCard: { flex: 1, backgroundColor: '#0B0F19', borderRadius: 10, padding: 12, marginHorizontal: 4, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
  metricValNumber: { fontSize: 15, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
  metricLabelText: { fontSize: 10, color: '#8A99AD', textTransform: 'uppercase', letterSpacing: 0.5 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  sectionSubtitle: { fontSize: 12, color: '#8A99AD' },
  squadDotIndicator: { width: 8, height: 8, borderRadius: 4, marginRight: 8, marginTop: 4 },
  squadBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, marginLeft: 8 },
  squadBadgeText: { fontSize: 10, fontWeight: '700' },
});