import { getHabitHistory, getHabits, getHabitStats, markHabitDone } from "@/api/habits.api"
import { Habit } from "@/interfaces/habit"
import { HabitStats } from "@/interfaces/habitStats"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Alert } from "react-native"

export const useHabits = () => {
    return useQuery<Habit[]>({
        queryKey: ["habits"],
        queryFn: getHabits,
    })
}


export const useHabitStats = (id: number) => {
    return useQuery<HabitStats>({
        queryKey: ["habit", id],
        queryFn: () => getHabitStats(id),
    }) 
}

export const useHabitHistory = (id: number) => {
    return useQuery<string[]>({
        queryKey: ["habitHistory", id],
        queryFn: () => getHabitHistory(id),
    })
}


// HOOK for POST request
export const useMarkHabitDone = () => {

    // Create a query client
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: markHabitDone,
        onSuccess: (_, id) => {
            // refetch relevant queries after marking
            queryClient.invalidateQueries({queryKey:['habit', id]})
            queryClient.invalidateQueries({queryKey:['habitHistory', id]})
        },
        // Handle errors
        onError: (error: any) => {
            const message = error?.response?.data?.message 
            Alert.alert('Oops', message)
        },
    })
}
