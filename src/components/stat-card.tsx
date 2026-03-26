import { StyleSheet, Text, View } from "react-native"

type StatCardProps = {
  label: string
  value: number
  icon: string
  accentColor: string
  bgColor: string
}

export default function StatCard({ label, value, icon, accentColor, bgColor }: StatCardProps) {
  return (
    <View style={[styles.card, { flex: 1 }]}>
      <View style={[styles.cardIcon, { backgroundColor: bgColor }]}>
        <Text style={{ fontSize: 20 }}>{icon}</Text>
      </View>
      <Text style={[styles.cardValue, { color: accentColor }]}>{value}</Text>
      <Text style={styles.cardLabel}>{label}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    card: {
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
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
})