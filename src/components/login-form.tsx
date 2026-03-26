
import { useRouter } from 'expo-router';
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import PrimaryButton from './ui/button';

// Zod schema
const loginFormSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(4, "Password must be atleast 6 characters"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

type Props = {
  label: string,
  onCall: (data: LoginFormData) => void
}

export default function LoginForm({label, onCall}: Props) {

    const router = useRouter();
    const {control, handleSubmit, formState:{errors},} = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema),
    }) 
    
    // const onSubmit = (data: LoginFormData) => {
    //     console.log("Form Data:", data);
    // };

    return (
    <View style={styles.container}>
      
      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons name='mail' size={24} color={"#C5C5C5"} />
              <TextInput
              placeholder="Email"
              value={value}
              autoCapitalize='none'
              onChangeText={onChange}
              style={styles.input}
            />
            </View>
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}
          </>
        )}
      />

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
          <View style={styles.passLabelContainer}>
            <Text style={styles.label}>Password</Text>
            <Pressable
                onPress={() => router.navigate('/forgot-passwd')}
                style={({ pressed }) => [pressed && {opacity: 0.5}]}
            >
                <Text style={[styles.label, styles.linkText]} >Forgot Password?</Text>
            </Pressable>
          </View>
          <View style={styles.inputContainer}>
              <Ionicons name='lock-closed' size={24} color={"#C5C5C5"} />
            <TextInput
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              style={styles.input}
            />
            </View>
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </>
        )}
      />

      <PrimaryButton label={label} onCall={handleSubmit(onCall)} icon="arrow-forward-outline" size={20}/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label:{
    paddingLeft: 4,
    paddingVertical: 12,
    fontWeight: 600
  },
  inputContainer:{
    borderWidth:1.5,
    borderColor: "#ccc",
    borderRadius: 8,
    flexDirection: 'row',
    padding: 12,
    marginBottom: 5
  },
  input: {
   marginLeft: 8,
   width: '90%',
  },
  passLabelContainer:{
    flexDirection: "row",
    justifyContent: "space-between"
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  linkText: {
    color: "#2563EB"
  }
});


