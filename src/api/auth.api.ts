import { api } from "@/api/client.api";

// Login Request structure
export type LoginRequest = {
    email: string,
    password: string,
}

// Register Request structure
export type RegisterRequest = {
    email: string,
    password: string,
}

export const loginUser = async(data: LoginRequest) => {
    const res = await api.post("/auth/api/v1/login", data);
    console.log("Res", res)
    return res.data;
}


export const registerUser = async(data: RegisterRequest) => {
    const res = await api.post("/auth/api/v1/register", data);
    return res.data;
}