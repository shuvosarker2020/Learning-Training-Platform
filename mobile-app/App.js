import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Brand colors
const COLORS = {
  bg: '#030712',
  card: '#0f172a',
  border: '#1e293b',
  cyan: '#00F2FE',
  blue: '#38bdf8',
  white: '#ffffff',
  slate: '#94a3b8'
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>N</Text>
          </View>
          <View>
            <Text style={styles.title}>NEXT GENERATION NETWORK</Text>
            <Text style={styles.subtitle}>TRAINING CENTRE • MOBILE</Text>
          </View>
        </View>
        <View style={styles.liveIndicator}>
          <View style={styles.pulseDot} />
          <Text style={styles.liveText}>1.04M Live</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTag}>ZERO-TRUST VERIFIED</Text>
          <Text style={styles.welcomeTitle}>Alex Rahman</Text>
          <Text style={styles.welcomeRole}>ID: NGN-9842-SEC • Senior Systems Trainee</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>78%</Text>
              <Text style={styles.statLabel}>Avg Progress</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>4 Tracks</Text>
              <Text style={styles.statLabel}>Enrolled</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>3 Certs</Text>
              <Text style={styles.statLabel}>Attested</Text>
            </View>
          </View>
        </View>

        {/* Live Session Alert Banner */}
        <TouchableOpacity style={styles.liveBanner}>
          <Text style={styles.liveBannerTag}>🔴 LIVE CLASS IN 45M</Text>
          <Text style={styles.liveBannerTitle}>Real-time LLM Telemetry Stream Ingestion</Text>
          <Text style={styles.liveBannerInstructor}>Dr. Elena Rostova • 482 Registered</Text>
          <View style={styles.joinBtn}>
            <Text style={styles.joinBtnText}>Join WebRTC Mobile Stream</Text>
          </View>
        </TouchableOpacity>

        {/* Technology Tracks */}
        <Text style={styles.sectionHeader}>Active Course Tracks</Text>

        <View style={styles.courseCard}>
          <Text style={styles.courseCode}>NET-401 • NETWORKING</Text>
          <Text style={styles.courseTitle}>Next-Gen Software-Defined Networking &amp; 5G/6G Core</Text>
          <Text style={styles.courseProgress}>92% Completed • Lab Ready</Text>
        </View>

        <View style={styles.courseCard}>
          <Text style={styles.courseCode}>AI-301 • ARTIFICIAL INTELLIGENCE</Text>
          <Text style={styles.courseTitle}>Enterprise AI &amp; Autonomous Network Intelligence</Text>
          <Text style={styles.courseProgress}>74% Completed • Capstone In-Progress</Text>
        </View>
      </ScrollView>

      {/* Bottom Mobile Tab Bar */}
      <View style={styles.tabBar}>
        {['Home', 'Courses', 'Live', 'Exams', 'Profile'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={styles.tabItem}
          >
            <Text style={[styles.tabLabel, activeTab === tab && styles.tabLabelActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#0f172a',
    borderWidth: 1.5,
    borderColor: COLORS.cyan,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: { color: COLORS.cyan, fontWeight: '900', fontSize: 18 },
  title: { color: COLORS.white, fontWeight: '800', fontSize: 13 },
  subtitle: { color: COLORS.slate, fontSize: 9, letterSpacing: 1 },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#022c22',
    borderWidth: 1,
    borderColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  pulseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981' },
  liveText: { color: '#34d399', fontSize: 10, fontWeight: '700' },
  content: { padding: 16, gap: 16 },
  welcomeCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  welcomeTag: { color: COLORS.cyan, fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  welcomeTitle: { color: COLORS.white, fontSize: 20, fontWeight: '800', marginTop: 4 },
  welcomeRole: { color: COLORS.slate, fontSize: 12, marginTop: 2 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 10 },
  statBox: { alignItems: 'center' },
  statVal: { color: COLORS.white, fontWeight: '700', fontSize: 15 },
  statLabel: { color: COLORS.slate, fontSize: 10 },
  liveBanner: {
    backgroundColor: '#1e1b4b',
    borderWidth: 1,
    borderColor: '#4338ca',
    borderRadius: 16,
    padding: 16
  },
  liveBannerTag: { color: '#f43f5e', fontSize: 11, fontWeight: '800' },
  liveBannerTitle: { color: COLORS.white, fontSize: 15, fontWeight: '700', marginTop: 4 },
  liveBannerInstructor: { color: COLORS.slate, fontSize: 12, marginTop: 2 },
  joinBtn: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 12
  },
  joinBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 12 },
  sectionHeader: { color: COLORS.white, fontSize: 14, fontWeight: '700', marginTop: 4 },
  courseCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14
  },
  courseCode: { color: COLORS.cyan, fontSize: 10, fontWeight: '700' },
  courseTitle: { color: COLORS.white, fontSize: 14, fontWeight: '600', marginTop: 3 },
  courseProgress: { color: COLORS.slate, fontSize: 11, marginTop: 6 },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: '#020617',
    paddingVertical: 10
  },
  tabItem: { flex: 1, alignItems: 'center' },
  tabLabel: { color: COLORS.slate, fontSize: 11, fontWeight: '600' },
  tabLabelActive: { color: COLORS.cyan, fontWeight: '800' }
});
