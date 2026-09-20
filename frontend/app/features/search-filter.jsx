import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SearchFilterScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');

  // Same built-in mock teams for live filtering demonstration on this screen
  const mockTeams = [
    { id: '1', name: 'Frontend Squad', commits: 14 },
    { id: '2', name: 'AI Backend Engine', commits: 8 },
    { id: '3', name: 'Mobile App Core', commits: 19 },
  ];

  const filteredTeams = mockTeams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase());
    const isLow = team.commits >= 10;
    if (riskFilter === 'LOW') return matchesSearch && isLow;
    if (riskFilter === 'HIGH') return matchesSearch && !isLow;
    return matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search & Filter Teams</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Search repository or team..."
          placeholderTextColor="#8A99AD"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <Text style={styles.label}>Filter by Risk Status:</Text>
        <View style={styles.chipRow}>
          {['ALL', 'LOW', 'HIGH'].map((type) => (
            <TouchableOpacity 
              key={type} 
              style={[styles.chip, riskFilter === type && styles.chipActive]}
              onPress={() => setRiskFilter(type)}
            >
              <Text style={[styles.chipText, riskFilter === type && styles.chipTextActive]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { marginTop: 15 }]}>Results ({filteredTeams.length}):</Text>
        {filteredTeams.map(team => {
          const isLow = team.commits >= 10;
          return (
            <View key={team.id} style={styles.resultCard}>
              <MaterialCommunityIcons name="source-branch" size={20} color="#00E5FF" />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.teamName}>{team.name}</Text>
                <Text style={styles.teamCommits}>{team.commits} Commits</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: isLow ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 61, 0, 0.1)' }]}>
                <Text style={{ color: isLow ? '#00E676' : '#FF3D00', fontSize: 10, fontWeight: '700' }}>
                  {isLow ? 'Low Risk' : 'High Risk'}
                </Text>
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
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  backButton: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#131C2E', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  content: { padding: 20 },
  input: { backgroundColor: '#131C2E', height: 48, borderRadius: 12, paddingHorizontal: 15, color: '#FFFFFF', fontSize: 14, marginBottom: 15, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  label: { fontSize: 13, color: '#8A99AD', fontWeight: '700', marginBottom: 10, textTransform: 'uppercase' },
  chipRow: { flexDirection: 'row', marginBottom: 10 },
  chip: { flex: 1, paddingVertical: 10, backgroundColor: '#131C2E', borderRadius: 10, alignItems: 'center', marginHorizontal: 4, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)' },
  chipActive: { backgroundColor: 'rgba(0, 229, 255, 0.15)', borderColor: '#00E5FF' },
  chipText: { fontSize: 12, color: '#8A99AD', fontWeight: '600' },
  chipTextActive: { color: '#00E5FF' },
  resultCard: { backgroundColor: '#131C2E', borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  teamName: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  teamCommits: { fontSize: 12, color: '#8A99AD', marginTop: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }
});