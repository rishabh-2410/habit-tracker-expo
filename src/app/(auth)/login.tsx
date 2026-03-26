import { loginUser } from "@/api/auth.api";
import CreateAccount from "@/components/create-account";
import LoginForm, { LoginFormData } from "@/components/login-form";
import SocialButton from "@/components/socials/socialButton";
import "@/global.css";
import { saveToken } from "@/storage/tokenStorage";
import { useAuthStore } from "@/store/auth.store";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
    // Get `SetToken` function from store to here 
    const setToken = useAuthStore((s) => s.setToken)


    const handleLogin = async (data: LoginFormData) => {
        const email = data?.email
        const password = data?.password

        console.log("Email:", email)

        try {
            const res = await loginUser({ email, password });

            console.log("Res", res)
            await saveToken(res.token)
            setToken(res.token)
            router.navigate("/habits")
        } catch(error){
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
                    <Text style={styles.heading}>Welcome Back</Text>
                    <Text style={styles.subHeading}>Track your habits, transform your life</Text>
                </View>
                <LoginForm label="Sign In" onCall={handleLogin} />
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
                    <Text style={{ fontSize: 16, color: '#64748B' }}>Don't have an account?</Text>
                    <CreateAccount label={"Create account"} route={"register"}/>
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
        marginTop: '10%'
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
        alignItems: 'center'
    },
    heading: {
        fontSize: 40,
        marginVertical: 8,
        fontWeight: 600
    },
    subHeading: {
        fontSize: 20,
        color: '#64748B'
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