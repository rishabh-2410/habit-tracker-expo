import { Habit } from '@/interfaces/habit'
import { useRouter } from 'expo-router'
import React, { useRef } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'


type Props = {
    habit: Habit
}

export default function HabitItem({ habit }: Props) {

    const router = useRouter()

    const handlePress = () => {
        router.push({
            pathname: '/habit/[id]',
            params: { id: habit.id }
        });
    };
    // 1. Create animated value, starting at 1 for 100% scale
    const scaleValue = useRef(new Animated.Value(1)).current

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.97, //Shrink to 97%
            useNativeDriver: true, // Use native driver for 60fps performance
        }).start()
    }


    const handleSignOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true
        }).start(({ finished }) => {
            if (finished) {
                router.push({
                    pathname: '/habit/[id]',
                    params: { id: habit.id }
                })
            }
        })
    }
    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            style={({ pressed }) => [
            styles.rootContainer,
            { opacity: pressed ? 0.3 : 1} // Instantly dims when touched
      ]}
        >
            <Animated.View style={[styles.rootContainer, { transform: [{ scale: scaleValue }] }]}>
                <View>
                    <Text style={styles.habitName}>{habit?.name}</Text>
                </View>
                <View>
                    <Text>🔥 {habit.currentStreak}</Text>
                </View>
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderColor: "#eee",
        borderWidth: 2,
        shadowColor: "#eee",
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,       // REQUIRED for iOS: 0 to 1
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 8,
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: '#ffffff',

    },
    habitName: {
        fontSize: 16,
        fontWeight: 600
    }
})