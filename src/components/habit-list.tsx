import { Habit } from '@/interfaces/habit'
import React from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import EmptyHabitList from './empty-list'
import HabitItem from './habit-item'


type Props = {
    habits: Habit[] | undefined
    isLoading: boolean
}
export default function HabitList({ habits, isLoading }: Props) {
    if (isLoading) return <ActivityIndicator />

    if (habits?.length === 0 ) return <EmptyHabitList onAddPress={() => {console.log('add-habits')}} />

    return (
        <FlatList
            data={habits}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 6, paddingVertical: 10 }}
            renderItem={({ item }) => (
                <HabitItem habit={item} />
            )}

        />
    )
}