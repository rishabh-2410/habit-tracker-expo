import HabitActivityChart from '@/components/habit-activity-chart'
import StatCard from '@/components/stat-card'
import { useHabitHistory, useHabitStats, useMarkHabitDone } from '@/hooks/user-habits'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// ─── Stat card ────────────────────────────────────────────────────────────────


// ─── Screen ───────────────────────────────────────────────────────────────────
const HabitStatScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: habitStats, isLoading: isStatsLoading } = useHabitStats(Number(id));
  const { data: habitHistory, isLoading: isHistoryLoading } = useHabitHistory(Number(id));
  const { mutate: markDone, isPending } = useMarkHabitDone();




  if (isStatsLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E6FD9" />
      </SafeAreaView>
    )
  }

  const { currentStreak = 0, daysCompleted = 0, daysMissed = 0, longestStreak = 0 } = habitStats ?? {}
  const completedDates = habitHistory ?? []
  const totalDays = daysCompleted + daysMissed
  const completionRate = totalDays > 0 ? Math.round((daysCompleted / totalDays) * 100) : 0

  const handleMarkToday = () => {
    markDone(Number(id))
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.backButton}>
            <Ionicons name="arrow-back-outline" size={24} color="#1e293b" onPress={() => router.back()} />
          </View>
          <Text style={styles.headerTitle}>Statistics</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Mark habit button */}
        <View style={styles.markButton}>
          <Pressable 
            style={({ pressed }) => [pressed && { opacity: 0.85 }]}
            onPress={handleMarkToday}
            
            >
            <View style={styles.markButtonInnerContainer}>
              <Ionicons name="checkmark-circle-outline" size={22} color="#ffffff" />
              <Text style={styles.markButtonText}>Mark Done</Text>
            </View>
          </Pressable>
        </View>

        {/* Summary pill */}
        <View style={styles.summaryPill}>
          <Text style={styles.summaryText}>
            {completionRate}% completion rate · {totalDays} days tracked
          </Text>
        </View>

        {/* Stat cards — 2 × 2 grid */}
        <View style={styles.cardRow}>
          <StatCard label="Current Streak" value={currentStreak} icon="🔥" accentColor="#f97316" bgColor="#fff7ed" />
          <StatCard label="Longest Streak" value={longestStreak} icon="🏆" accentColor="#1E6FD9" bgColor="#e7eff9" />
        </View>
        <View style={styles.cardRow}>
          <StatCard label="Days Completed" value={daysCompleted} icon="✅" accentColor="#16a34a" bgColor="#f0fdf4" />
          <StatCard label="Days Missed" value={daysMissed} icon="❌" accentColor="#dc2626" bgColor="#fef2f2" />
        </View>

        {/* Activity chart */}
        {isHistoryLoading && <ActivityIndicator />}
        {!isHistoryLoading && <HabitActivityChart completedDates={completedDates} totalDays={90} />}

      </ScrollView>
    </SafeAreaView>
  )
}

export default HabitStatScreen

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  markButton: {
    backgroundColor: '#1E6FD9',
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 16,
  },
  markButtonInnerContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  markButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  summaryPill: {
    alignSelf: 'center',
    backgroundColor: '#e7eff9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 13,
    color: '#1E6FD9',
    fontWeight: '500',
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
})
