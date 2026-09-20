import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>CollabLens Analytics</Text>
            <Text style={styles.username}>Team Dynamics & Risk Engine</Text>
          </View>
        </View>

        {/* Navigation Card to Contributor Risk Matrix */}
        <TouchableOpacity 
          style={styles.navCard} 
          onPress={() => router.push('/contributor-risk')}
          activeOpacity={0.8}
        >
          <View style={styles.navCardContent}>
            <View style={styles.iconBox}>
              <Ionicons name="shield-checkmark" size={22} color="#00E5FF" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.navCardTitle}>Contributor Risk Matrix</Text>
              <Text style={styles.navCardSub}>View Random Forest ML predictions & contributor metrics</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#8A99AD" />
          </View>
        </TouchableOpacity>

        {/* Other existing dashboard overview components can go here */}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 24 },
  greeting: { fontSize: 13, color: '#8A99AD', marginBottom: 2 },
  username: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  navCard: { backgroundColor: '#131C2E', borderRadius: 20, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(0, 229, 255, 0.3)' },
  navCardContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(0, 229, 255, 0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(0, 229, 255, 0.3)' },
  navCardTitle: { fontSize: 15, fontWeight: '700', color: '#FFFFFF', marginBottom: 3 },
  navCardSub: { fontSize: 11, color: '#8A99AD', lineHeight: 15 },
});