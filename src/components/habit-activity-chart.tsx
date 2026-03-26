import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { ContributionGraph } from 'react-native-chart-kit'

const SCREEN_WIDTH = Dimensions.get('window').width
const NUM_DAYS = 105 // 15 weeks

type Props = {
  completedDates: string[],
  totalDays: number,
}

function buildContribValues(completedDates: string[], totalDays:number) {
  const values: { date: string; count: number }[] = []
  const today = new Date()

  // Convert to Set for O(1) lookup
  const completedSet = new Set(completedDates)

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)

    const dateStr = d.toISOString().split("T")[0]

    values.push({
      date: dateStr,
      count: completedSet.has(dateStr) ? 2 : 0, // 2 = completed, 0 = not
    })
  }

  return values.reverse() // optional: oldest → newest
}

// ContributionGraph maps count → opacity (opacity = count / maxCount).
// With count=2 for completed and count=1 for missed:
//   - completed → opacity 1.0  → green
//   - missed    → opacity 0.5  → red
// Edge case: if only missed exist, maxCount=1 so missed opacity=1.0.
// We detect that and return red at full opacity instead.
function makeColorFn(onlyMissed: boolean) {
  return (opacity: number) => {
    if (opacity === 0) return '#f1f5f9' // empty cell
    if (onlyMissed || opacity < 0.8) return `rgba(248, 113, 113, ${Math.max(opacity, 0.6)})` // missed
    return `rgba(34, 197, 94, ${opacity})` // completed
  }
}

export default function HabitActivityChart({ completedDates, totalDays }: Props) {
  const values = buildContribValues(completedDates, totalDays)
  const onlyMissed = completedDates.length === 0

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity</Text>
      <Text style={styles.subtitle}>Last 15 weeks</Text>

      <ContributionGraph
        values={values}
        endDate={new Date()}
        numDays={NUM_DAYS}
        width={SCREEN_WIDTH - 32}
        height={200}
        squareSize={14}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: makeColorFn(onlyMissed),
          labelColor: () => '#94a3b8',
          paddingRight: 0,
        }}
        style={styles.chart}
        tooltipDataAttrs={() => ({})}    
        />

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#f1f5f9' }]} />
          <Text style={styles.legendLabel}>No data</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#22c55e' }]} />
          <Text style={styles.legendLabel}>Completed</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#f87171' }]} />
          <Text style={styles.legendLabel}>Missed</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 12,
  },
  chart: {
    borderRadius: 8,
    marginHorizontal: -16,
  },
  legend: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 11,
    height: 11,
    borderRadius: 2,
  },
  legendLabel: {
    fontSize: 11,
    color: '#64748b',
  },
})
