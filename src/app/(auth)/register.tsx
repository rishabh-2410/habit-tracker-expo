import { registerUser } from "@/api/auth.api";
import CreateAccount from "@/components/create-account";
import RegisterForm, { RegisterFormData } from "@/components/register-form";
import SocialButton from "@/components/socials/socialButton";
import "@/global.css";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleRegister = async (data: RegisterFormData) => {
        const email = data?.email
        const password = data?.password

        try {
            await registerUser({ email, password });
            router.navigate("/login")
        } catch (error) {
            console.log("Error: " + error)
        }
        // console.log("Data: ", data )
    }


    return (
        <SafeAreaView style={styles.rootContainer}>
            <View style={styles.outerContainer}>
                <View style={styles.iconContainer}>
                    <Image source={require('../../../assets/app-images/logo-7.png')} style={{ width: 40, height: 40 }} />
                </View>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Start your journey</Text>
                    <Text style={styles.subHeading}>Join thousands of other building better habits everyday.</Text>
                </View>
                <RegisterForm label="Create account" onCall={handleRegister} />
                <View style={styles.dividerContainer}>
                    <View style={styles.line}></View>
                    <Text style={{ color: '#64748B' }}>Or continue with</Text>
                    <View style={styles.line}></View>
                </View>
                <View style={styles.socialContainer}>
                    <SocialButton icon="logo-google" label="Google" onPress={() => { console.log("Pressed social button") }} />
                    <SocialButton icon="logo-apple" label="Apple" onPress={() => { console.log("Pressed social button") }} />
                </View>
                <View style={styles.createAccContainer}>
                    <Text style={{ fontSize: 16, color: '#64748B' }}>Already have an account?</Text>
                    <CreateAccount route="login" label="Log in" />
                </View>
            </View>
        </SafeAreaView>
    )


}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    outerContainer: {
        padding: 8,
        width: '100%',
        marginTop: '5%'
    },
    iconContainer: {
        alignSelf: 'center',
        borderRadius: 12,
        backgroundColor: "#e7eff9",
        justifyContent: "center",
        alignItems: 'center',
        height: 80,
        width: 80,
        marginVertical: 12
    },
    headingContainer: {
       paddingHorizontal: 20
    },
    heading: {
        fontSize: 36,
        marginVertical: 16,
        fontWeight: 600,
    },
    subHeading: {
        fontSize: 18,
        color: '#64748B',
    },
    line: {
        height: 2,
        width: '20%',
        backgroundColor: '#e5e7eb',
        marginHorizontal: 8
    },
    dividerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        backgroundColor: "#1E6FD9",
        padding: 8,
        borderRadius: 20,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 18
    },
    createAccContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginVertical: 8
    }
})