import HabitList from '@/components/habit-list';
import { useHabits } from '@/hooks/user-habits';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HabitHome() {

  const { data: habits, isLoading } = useHabits();

  if (isLoading) return <ActivityIndicator />

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 32 }}>👋</Text>
        <View>
          <Text>Welcome back </Text>
          <Text>Nikolai</Text>
        </View>
      </View>
      <HabitList habits={habits} isLoading={isLoading} />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  rootContainer: {
    padding: 14
  },
  headerContainer: { 
    flexDirection: 'row', 
    gap: 8,
    marginVertical: 12
  }
})