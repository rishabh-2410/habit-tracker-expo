import { api } from "@/api/client.api";
import { Habit } from "@/interfaces/habit";

export const getHabits = async(): Promise<Habit[]> => {
    const res = await api.get("/api/v1/user/habits");
    return res.data;
}

export const postHabit = async(name: string) => {
    const res = await api.post("/api/v1/user/habits", {name});
    return res.data;
}

export const getHabitStats = async(id: number) => {
    const res = await api.get(`/api/v1/user/habit/${id}/stats`);
    return res.data;
}


export const getHabitHistory = async(id: number) => {
    const res = await api.get(`/api/v1/user/habit/${id}/history`)
    return res.data;
}

export const markHabitDone = async(id: number) => {
    const res = await api.post(`/api/v1/user/habit/${id}/mark-done`)
    console.log(res.data)
    return res.data;
}