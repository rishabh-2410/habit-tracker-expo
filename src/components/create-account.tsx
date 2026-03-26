import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

type Props ={
    route: string,
    label: string,
}
export default function CustomLinkNavigator({route, label}: Props) {
    const router = useRouter()
    return (

        <Pressable
            onPress={() => router.navigate(`/${route}` as any)}
            style={({ pressed }) => [pressed && { opacity: 0.5 }]}
        >
            <Text style={[styles.linkText]} >{label}</Text>
        </Pressable>

    )
}


const styles = StyleSheet.create({
linkText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: 600
}
})

