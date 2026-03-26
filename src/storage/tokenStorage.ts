import * as SecureStorage from 'expo-secure-store';

const TOKEN_KEY = "auth_token"

export const saveToken = async (token: string) => {
    await SecureStorage.setItemAsync(TOKEN_KEY, token)
}


export const getToken = async() => {
    return await SecureStorage.getItemAsync(TOKEN_KEY);
}


export const removeToken = async() => {
    await SecureStorage.deleteItemAsync(TOKEN_KEY);
}