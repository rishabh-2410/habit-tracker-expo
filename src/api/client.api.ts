import axios from "axios";
import { getToken } from "../storage/tokenStorage";


// create an axios instance
export const api = axios.create({
    baseURL: "http://localhost:8080"
})


// Intercept outgoing requests and add token to header if present
api.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } 
    return config
});