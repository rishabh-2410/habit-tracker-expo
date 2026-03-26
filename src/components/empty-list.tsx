import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    onAddPress: () => void
}

export default function EmptyHabitList ({ onAddPress }: Props) {
  return (
    <View style={styles.card}>
      {/* Icon Circle */}
      <View style={styles.iconCircle}>
        <Ionicons name='sparkles' size={32} color="#3b82f6" />
      </View>

      {/* Content */}
      <Text style={styles.title}>No habits yet</Text>
      <Text style={styles.description}>
        Start building better habits by adding your first one.
      </Text>

      {/* Action Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={onAddPress}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={18} color="#ffffff" />
        <Text style={styles.buttonText}>Add your first habit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20, // rounded-2xl
    borderWidth: 1,
    borderColor: '#e2e8f0', // border-border
    padding: 32,
    alignItems: 'center', // text-center
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2, // Android shadow
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(59, 130, 246, 0.1)', // bg-primary/10
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a', // text-foreground
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#64748b', // text-muted-foreground
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6', // bg-primary
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12, // rounded-xl
    gap: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});

