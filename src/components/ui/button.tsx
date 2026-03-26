// components/PrimaryButton.tsx
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

type Props = {
  label: string
  onCall: () => void
  icon: keyof typeof Ionicons.glyphMap
  size: number | undefined
}

export default function PrimaryButton({ label, onCall, icon, size }: Props) {
  return (
    <View style={styles.button}>
        <Pressable
      onPress={onCall}
      style={({ pressed }) => [
        pressed && styles.pressed
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
    <Ionicons name={icon} size={size} color="#ffffff" />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 14,
    flexDirection: 'row',
    gap: 12
  },
  pressed: {
    opacity: 0.85
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  }
})