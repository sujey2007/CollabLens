import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { generateReportHtml } from './reportTemplate'; // Adjust path based on where you placed the file

export default function DashboardScreen() {
  const router = useRouter();

  const handleSafeBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  const [teams, setTeams] = useState([
    { 
      id: '1', 
      name: 'Neural Nexus', 
      commits: 14, 
      weeklyData: [10, 24, 18, 42, 35, 55, 48],
      peakDay: 'Sat (55)',
      dailyAverage: '33.1'
    },
    { 
      id: '2', 
      name: 'Quantum Core', 
      commits: 8, 
      weeklyData: [5, 12, 10, 28, 22, 38, 30],
      peakDay: 'Sat (38)',
      dailyAverage: '20.7'
    },
    { 
      id: '3', 
      name: 'Cyber Synthetics', 
      commits: 19, 
      weeklyData: [15, 30, 25, 50, 42, 65, 60],
      peakDay: 'Sat (65)',
      dailyAverage: '41.0'
    },
  ]);

  const [teamNameInput, setTeamNameInput] = useState('');
  const [commitInput, setCommitInput] = useState('');

  const handleAddTeam = () => {
    if (!teamNameInput.trim()) return;
    const initialCommits = parseInt(commitInput, 10) || 0;
    
    const base = Math.max(5, initialCommits);
    const weeklyData = [
      Math.round(base * 0.6),
      Math.round(base * 1.1),
      Math.round(base * 0.9),
      Math.round(base * 1.8),
      Math.round(base * 1.5),
      Math.round(base * 2.2),
      Math.round(base * 2.0),
    ];
    const peakVal = Math.max(...weeklyData);
    const sum = weeklyData.reduce((a, b) => a + b, 0);
    const avg = (sum / 7).toFixed(1);

    const newTeam = {
      id: Date.now().toString(),
      name: teamNameInput.trim(),
      commits: initialCommits,
      weeklyData,
      peakDay: `Sat (${peakVal})`,
      dailyAverage: avg,
    };

    setTeams([...teams, newTeam]);
    setTeamNameInput('');
    setCommitInput('');
  };

  const handleUpdateCommits = (id, delta) => {
    setTeams(teams.map(team => {
      if (team.id === id) {
        const updatedCommits = Math.max(0, team.commits + delta);
        const updatedWeekly = [...team.weeklyData];
        updatedWeekly[6] = Math.max(0, updatedWeekly[6] + delta);
        const peakVal = Math.max(...updatedWeekly);
        const sum = updatedWeekly.reduce((a, b) => a + b, 0);
        const avg = (sum / 7).toFixed(1);

        return { 
          ...team, 
          commits: updatedCommits,
          weeklyData: updatedWeekly,
          peakDay: `Sat (${peakVal})`,
          dailyAverage: avg,
        };
      }
      return team;
    }));
  };

  const handleDeleteTeam = (id) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  const lowRiskCount = teams.filter(t => t.commits >= 10).length;
  const highRiskCount = teams.length - lowRiskCount;
  const globalHealthScore = teams.length > 0 ? Math.round((lowRiskCount / teams.length) * 100) : 100;

  // Clean PDF generation utilizing the isolated template file
  const handleDownloadPDFReport = async () => {
    try {
      const htmlContent = generateReportHtml(teams, 'H Sujey');
      const file = await Print.printToFileAsync({ html: htmlContent });
      
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(file.uri, { mimeType: 'application/pdf', dialogTitle: 'Download CollabLens Report' });
          return;
        }
      }
      await Print.printAsync({ html: htmlContent });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backBtn} onPress={handleSafeBack} activeOpacity={0.8}>
              <Ionicons name="arrow-back" size={20} color="#00E5FF" />
            </TouchableOpacity>
            <View>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.username}>H Sujey</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationBtn} activeOpacity={0.8}>
            <Ionicons name="notifications-outline" size={22} color="#00E5FF" />
          </TouchableOpacity>
        </View>

        <View style={styles.bannerCard}>
          <View style={styles.bannerHeader}>
            <MaterialCommunityIcons name="shield-check" size={24} color="#00E5FF" />
            <Text style={styles.bannerBadge}>System Status: Optimal</Text>
          </View>
          <Text style={styles.bannerTitle}>CollabLens Intelligence</Text>
          <Text style={styles.bannerSubtitle}>Monitor team daily contributions and real-time ML risk factors.</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{teams.length}</Text>
            <Text style={styles.statLabel}>Monitored Teams</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: '#00E676' }]}>{lowRiskCount}</Text>
            <Text style={styles.statLabel}>Low Risk Teams</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: highRiskCount > 0 ? '#FF3D00' : '#8A99AD' }]}>{highRiskCount}</Text>
            <Text style={styles.statLabel}>High Risk Teams</Text>
          </View>
        </View>

        <View style={styles.calculatorCard}>
          <View style={styles.calcHeader}>
            <MaterialCommunityIcons name="account-group-outline" size={20} color="#00E5FF" />
            <Text style={styles.calcTitle}>Register & Track New Team</Text>
          </View>
          <Text style={styles.calcSub}>Add team name and initial commit count to monitor:</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Team Name (e.g. Apex Squad)"
            placeholderTextColor="#8A99AD"
            value={teamNameInput}
            onChangeText={setTeamNameInput}
          />
          <TextInput
            style={styles.input}
            placeholder="Initial Commits (e.g. 12)"
            placeholderTextColor="#8A99AD"
            keyboardType="numeric"
            value={commitInput}
            onChangeText={setCommitInput}
          />

          <TouchableOpacity style={styles.addButton} onPress={handleAddTeam} activeOpacity={0.85}>
            <Text style={styles.addButtonText}>Add Monitored Team</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Teams & Sprint Velocity</Text>
          <TouchableOpacity onPress={handleDownloadPDFReport}>
            <Text style={styles.seeAllText}>Download PDF Report 📄</Text>
          </TouchableOpacity>
        </View>

        {teams.map((team) => {
          const isLowRisk = team.commits >= 10;
          const riskLabel = isLowRisk ? 'Low Risk' : 'High Risk';
          const riskColor = isLowRisk ? '#00E676' : '#FF3D00';
          const riskBg = isLowRisk ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 61, 0, 0.1)';
          const progressPercent = Math.min(100, (team.commits / 20) * 100);

          return (
            <View key={team.id} style={styles.teamCard}>
              <View style={styles.teamHeaderRow}>
                <View style={styles.teamIconContainer}>
                  <MaterialCommunityIcons name="source-branch" size={22} color="#00E5FF" />
                </View>
                <View style={styles.teamInfo}>
                  <Text style={styles.teamName}>{team.name}</Text>
                  <Text style={styles.teamRepo}>Total Commits: <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>{team.commits}</Text></Text>
                </View>
                <View style={styles.cardHeaderRight}>
                  <View style={[styles.riskBadge, { backgroundColor: riskBg }]}>
                    <Text style={[styles.riskText, { color: riskColor }]}>{riskLabel}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDeleteTeam(team.id)} style={styles.deleteBtn}>
                    <Ionicons name="trash-outline" size={16} color="#FF3D00" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.progressSection}>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressTitle}>Weekly Target Progress (20 commits)</Text>
                  <Text style={styles.progressPercentText}>{Math.round(progressPercent)}%</Text>
                </View>
                <View style={styles.progressBarTrack}>
                  <View style={[styles.progressBarFill, { width: `${progressPercent}%`, backgroundColor: riskColor }]} />
                </View>
              </View>

              <View style={styles.actionRow}>
                <Text style={styles.updateLabel}>Sprint Counter:</Text>
                <View style={styles.buttonGroup}>
                  <TouchableOpacity style={styles.counterBtn} onPress={() => handleUpdateCommits(team.id, -1)} activeOpacity={0.7}>
                    <Text style={styles.counterBtnText}>-1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.counterBtn} onPress={() => handleUpdateCommits(team.id, 1)} activeOpacity={0.7}>
                    <Text style={styles.counterBtnText}>+1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.counterBtnPlus5} onPress={() => handleUpdateCommits(team.id, 5)} activeOpacity={0.7}>
                    <Text style={styles.counterBtnText}>+5 Daily</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
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
  notificationBtn: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#131C2E', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)' },
  bannerCard: { backgroundColor: '#131C2E', borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(0, 229, 255, 0.2)' },
  bannerHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  bannerBadge: { color: '#00E5FF', fontSize: 12, fontWeight: '600', marginLeft: 8 },
  bannerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 6 },
  bannerSubtitle: { fontSize: 13, color: '#8A99AD', lineHeight: 18 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: '#131C2E', borderRadius: 16, padding: 14, marginRight: 8, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)', alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  statLabel: { fontSize: 11, color: '#8A99AD', textAlign: 'center' },
  calculatorCard: { backgroundColor: '#131C2E', borderRadius: 20, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(0, 229, 255, 0.3)' },
  calcHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  calcTitle: { fontSize: 15, fontWeight: '700', color: '#FFFFFF', marginLeft: 8 },
  calcSub: { fontSize: 12, color: '#8A99AD', marginBottom: 14 },
  input: { backgroundColor: '#0B0F19', height: 46, borderRadius: 10, paddingHorizontal: 14, color: '#FFFFFF', fontSize: 14, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  addButton: { backgroundColor: '#00E5FF', height: 46, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 4 },
  addButtonText: { color: '#0B0F19', fontSize: 14, fontWeight: '700' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  seeAllText: { fontSize: 12, color: '#00E5FF', fontWeight: '600' },
  teamCard: { backgroundColor: '#131C2E', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)' },
  teamHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  teamIconContainer: { width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(0, 229, 255, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  teamInfo: { flex: 1 },
  teamName: { fontSize: 15, fontWeight: '600', color: '#FFFFFF', marginBottom: 3 },
  teamRepo: { fontSize: 12, color: '#8A99AD' },
  cardHeaderRight: { alignItems: 'flex-end' },
  riskBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 6 },
  riskText: { fontSize: 10, fontWeight: '700' },
  deleteBtn: { padding: 4 },
  progressSection: { backgroundColor: '#0B0F19', padding: 10, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressTitle: { fontSize: 11, color: '#8A99AD' },
  progressPercentText: { fontSize: 11, color: '#FFFFFF', fontWeight: '700' },
  progressBarTrack: { height: 6, backgroundColor: '#131C2E', borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 3 },
  actionRow: { borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.06)', paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  updateLabel: { fontSize: 11, color: '#8A99AD' },
  buttonGroup: { flexDirection: 'row', alignItems: 'center' },
  counterBtn: { backgroundColor: '#0B0F19', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, marginRight: 6, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  counterBtnPlus5: { backgroundColor: 'rgba(0, 229, 255, 0.15)', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(0, 229, 255, 0.3)' },
  counterBtnText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
});