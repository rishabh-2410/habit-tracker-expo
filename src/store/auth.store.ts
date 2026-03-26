import { create } from "zustand";


// Create type of the store
// Elements and their type the store holds
type AuthState = {
    user: any | null;
    token: string | null;
    setToken: (token: string | null) => void;
    setUser: (user:any) => void;
}


// Create a store with desired type.
// Here type is AuthState
export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,

    setUser: (user) => set({user}),
    setToken: (token) => set({token}),

}))